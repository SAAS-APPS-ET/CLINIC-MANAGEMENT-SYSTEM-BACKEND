import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  ChangePasswordDto,
  ForgetPasswordDto,
  LoginDto,
  RefreshTokenDto,
  VerifyOtpDto,
} from './auth.dto';
import { AuthService } from './auth.service';
import { Public } from '../../common/decorators/public.decorator';

class LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    fullName?: string;
    role: string;
    isActive: boolean;
    createdAt: string;
  };
}

class RefreshResponseDto {
  accessToken: string;
  refreshToken: string;
}

class MessageResponseDto {
  message: string;
}

class VerifyOtpResponseDto {
  verified: boolean;
}

class ChangePasswordResponseDto {
  changed: boolean;
}

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  @Public()
  @ApiOperation({
    summary: 'Login',
    description:
      'Validates email/password and returns access + refresh tokens.',
  })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'Tokens issued successfully.',
    type: LoginResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }

  @Post('refresh')
  @Public()
  @ApiOperation({
    summary: 'Refresh tokens',
    description:
      'Rotates refresh token and returns a new access + refresh token pair.',
  })
  @ApiBody({ type: RefreshTokenDto })
  @ApiOkResponse({
    description: 'Tokens refreshed successfully.',
    type: RefreshResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid refresh token.' })
  refresh(@Body() dto: RefreshTokenDto) {
    return this.auth.refresh(dto.refreshToken);
  }

  @Post('forget-password')
  @Public()
  @ApiOperation({
    summary: 'Request password reset OTP',
    description:
      'Sends a 6-digit OTP to the email address if the account exists.',
  })
  @ApiBody({ type: ForgetPasswordDto })
  @ApiOkResponse({
    description:
      'Always returns a generic message to avoid leaking account existence.',
    type: MessageResponseDto,
  })
  forgetPassword(@Body() dto: ForgetPasswordDto) {
    return this.auth.forgetPassword(dto.email);
  }

  @Post('verify-otp')
  @Public()
  @ApiOperation({
    summary: 'Verify OTP',
    description: 'Verifies that the provided OTP is correct and not expired.',
  })
  @ApiBody({ type: VerifyOtpDto })
  @ApiOkResponse({ description: 'OTP verified.', type: VerifyOtpResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid or expired OTP.' })
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.auth.verifyOtp(dto.email, dto.otp);
  }

  @Post('change-password')
  @Public()
  @ApiOperation({
    summary: 'Change password using OTP',
    description:
      'Changes password if OTP is valid, then clears OTP and revokes refresh tokens.',
  })
  @ApiBody({ type: ChangePasswordDto })
  @ApiOkResponse({
    description: 'Password changed.',
    type: ChangePasswordResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid or expired OTP.' })
  changePassword(@Body() dto: ChangePasswordDto) {
    return this.auth.changePassword(dto.email, dto.otp, dto.newPassword);
  }
}
