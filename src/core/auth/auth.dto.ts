import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'admin@clinic.local',
    description: 'User email address used to login.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'P@ssw0rd123',
    description: 'User password.',
  })
  @IsString()
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....',
    description: 'Refresh token previously issued by `/auth/login`.',
  })
  @IsString()
  refreshToken: string;
}

export class ForgetPasswordDto {
  @ApiProperty({
    example: 'admin@clinic.local',
    description: 'Email to send the OTP reset code to.',
  })
  @IsEmail()
  email: string;
}

export class VerifyOtpDto {
  @ApiProperty({
    example: 'admin@clinic.local',
    description: 'Account email associated with the OTP.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: '6-digit OTP code received via email.',
  })
  @IsString()
  @Length(6, 6)
  otp: string;
}

export class ChangePasswordDto {
  @ApiProperty({
    example: 'admin@clinic.local',
    description: 'Account email associated with the OTP.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: '6-digit OTP code received via email.',
  })
  @IsString()
  @Length(6, 6)
  otp: string;

  @ApiProperty({
    example: 'NewP@ssw0rd123',
    minLength: 6,
    description: 'New password to set for the account.',
  })
  @IsString()
  @MinLength(6)
  newPassword: string;
}
