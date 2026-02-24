import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../../common/enums/role.enums';

export class CreateUserDto {
  @ApiProperty({
    example: 'reception@clinic.local',
    description: 'Unique email for the new user.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Reception Desk',
    required: false,
    description: 'Optional display name for the user.',
  })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({
    example: Role.RECEPTIONIST,
    required: false,
    description: `User role. Defaults to \`${Role.RECEPTIONIST}\`.`,
    enum: Role,
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

export class UserResponseDto {
  @ApiProperty({ example: '7b6f0e1f-4e59-4d39-a06e-4f7c83a0f52a' })
  id: string;

  @ApiProperty({ example: 'reception@clinic.local' })
  email: string;

  @ApiProperty({ example: 'Reception Desk', required: false })
  fullName?: string;

  @ApiProperty({ example: 'user' })
  role: string;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '2026-02-21T08:30:00.000Z' })
  createdAt: Date;
}
