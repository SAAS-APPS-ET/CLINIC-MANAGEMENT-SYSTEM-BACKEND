import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(dto: CreateUserDto): Promise<{
        user: {
            id: string;
            email: string;
            fullName: string | undefined;
            role: string;
            isActive: boolean;
            createdAt: Date;
        };
        generatedPassword: string;
    }>;
}
