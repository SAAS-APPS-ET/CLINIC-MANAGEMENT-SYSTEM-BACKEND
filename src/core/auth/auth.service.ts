import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
import { UserService } from '../../modules/user/user.service';
import { SmtpService } from '../../integrations/smtp/smtp.service';
import { type AppEnv } from '../config/app.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UserService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService<AppEnv, true>,
    private readonly smtp: SmtpService,
  ) {}

  private async signTokens(user: { id: string; email: string; role: string }) {
    const accessToken = await this.jwt.signAsync(
      { sub: user.id, email: user.email, role: user.role },
      {
        secret: this.config.get('JWT_ACCESS_SECRET'),
        expiresIn: this.config.get('JWT_ACCESS_EXPIRES_IN'),
      },
    );

    const refreshToken = await this.jwt.signAsync(
      { sub: user.id },
      {
        secret: this.config.get('JWT_REFRESH_SECRET'),
        expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN'),
      },
    );

    return { accessToken, refreshToken };
  }

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user || !user.isActive)
      throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    const tokens = await this.signTokens(user);
    const refreshHash = await bcrypt.hash(tokens.refreshToken, 10);
    await this.users.setRefreshTokenHash(user.id, refreshHash);

    return {
      user: this.users.toResponse(user),
      ...tokens,
    };
  }

  async refresh(refreshToken: string) {
    let payload: { sub: string };
    try {
      payload = await this.jwt.verifyAsync<{ sub: string }>(refreshToken, {
        secret: this.config.get('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const userId = payload.sub;
    const user = await this.users.findById(userId);
    if (!user.refreshTokenHash)
      throw new UnauthorizedException('Invalid refresh token');

    const ok = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    if (!ok) throw new UnauthorizedException('Invalid refresh token');

    const tokens = await this.signTokens(user);
    const refreshHash = await bcrypt.hash(tokens.refreshToken, 10);
    await this.users.setRefreshTokenHash(user.id, refreshHash);

    return { ...tokens };
  }

  async forgetPassword(email: string) {
    const user = await this.users.findByEmail(email);
    if (!user) {
      // Do not leak user existence
      return { message: 'If the account exists, OTP was sent' };
    }

    const otp = String(randomInt(100000, 999999));
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await this.users.setOtp(user.id, otpHash, expiresAt);

    await this.smtp.sendMail(
      user.email,
      'Password reset OTP',
      `Your OTP is ${otp}. It expires in 10 minutes.`,
    );

    return { message: 'If the account exists, OTP was sent' };
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.users.findByEmail(email);
    if (!user || !user.otpCodeHash || !user.otpExpiresAt) {
      throw new BadRequestException('Invalid OTP');
    }
    if (user.otpExpiresAt.getTime() < Date.now()) {
      throw new BadRequestException('OTP expired');
    }

    const ok = await bcrypt.compare(otp, user.otpCodeHash);
    if (!ok) throw new BadRequestException('Invalid OTP');

    return { verified: true };
  }

  async changePassword(email: string, otp: string, newPassword: string) {
    const user = await this.users.findByEmail(email);
    if (!user || !user.otpCodeHash || !user.otpExpiresAt) {
      throw new BadRequestException('Invalid OTP');
    }
    if (user.otpExpiresAt.getTime() < Date.now()) {
      throw new BadRequestException('OTP expired');
    }

    const ok = await bcrypt.compare(otp, user.otpCodeHash);
    if (!ok) throw new BadRequestException('Invalid OTP');

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await this.users.setPasswordHash(user.id, passwordHash);
    await this.users.setOtp(user.id, null, null);
    await this.users.setRefreshTokenHash(user.id, null);
    return { changed: true };
  }
}
