import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';
import { Role } from '../../common/enums/role.enums';

function generatePassword(length = 12): string {
  const alphabet =
    'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%';
  const chars = Array.from(
    { length },
    () => alphabet[Math.floor(Math.random() * alphabet.length)],
  );
  return chars.join('');
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createWithAutoPassword(dto: CreateUserDto) {
    const email = dto.email?.trim().toLowerCase();
    if (!email) throw new BadRequestException('email is required');

    const existing = await this.userRepo.findOne({ where: { email } });
    if (existing) throw new BadRequestException('email already exists');

    const plainPassword = generatePassword();
    const passwordHash = await bcrypt.hash(plainPassword, 10);

    const user = this.userRepo.create({
      email,
      fullName: dto.fullName?.trim(),
      role: dto.role ?? Role.RECEPTIONIST,
      passwordHash,
      isActive: true,
    });

    const saved = await this.userRepo.save(user);
    return {
      user: this.toResponse(saved),
      generatedPassword: plainPassword,
    };
  }

  async findByEmail(email: string) {
    const e = email.trim().toLowerCase();
    return this.userRepo.findOne({ where: { email: e } });
  }

  async findById(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async setRefreshTokenHash(userId: string, tokenHash: string | null) {
    await this.userRepo.update(
      { id: userId },
      {
        refreshTokenHash: tokenHash ?? undefined,
        updatedAt: new Date(),
      },
    );
  }

  async setOtp(userId: string, otpHash: string | null, expiresAt: Date | null) {
    await this.userRepo.update(
      { id: userId },
      {
        otpCodeHash: otpHash ?? undefined,
        otpExpiresAt: expiresAt ?? undefined,
        updatedAt: new Date(),
      },
    );
  }

  async setPasswordHash(userId: string, passwordHash: string) {
    await this.userRepo.update(
      { id: userId },
      {
        passwordHash,
        updatedAt: new Date(),
      },
    );
  }

  toResponse(user: User) {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
    };
  }
}
