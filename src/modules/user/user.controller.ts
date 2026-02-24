import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Create user (auto password)',
    description:
      'Creates a new user and auto-generates a password. The generated password is returned once in the response.',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({
    description: 'User created with generated password.',
    schema: {
      example: {
        success: true,
        data: {
          user: {
            id: '7b6f0e1f-4e59-4d39-a06e-4f7c83a0f52a',
            email: 'reception@clinic.local',
            fullName: 'Reception Desk',
            role: 'RECEPTIONIST',
            isActive: true,
            createdAt: '2026-02-21T08:30:00.000Z',
          },
          generatedPassword: 'N7!pQ3z@k2Lm',
        },
      },
    },
  })
  create(@Body() dto: CreateUserDto) {
    return this.userService.createWithAutoPassword(dto);
  }
}
