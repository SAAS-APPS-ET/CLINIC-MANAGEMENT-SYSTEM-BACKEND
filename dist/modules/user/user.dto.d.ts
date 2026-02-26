import { Role } from '../../common/enums/role.enums';
export declare class CreateUserDto {
    email: string;
    fullName?: string;
    role?: Role;
}
export declare class UserResponseDto {
    id: string;
    email: string;
    fullName?: string;
    role: string;
    isActive: boolean;
    createdAt: Date;
}
