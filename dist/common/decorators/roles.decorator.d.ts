import { Role } from '../enums/role.enums';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: Array<Role | string>) => import("@nestjs/common").CustomDecorator<string>;
