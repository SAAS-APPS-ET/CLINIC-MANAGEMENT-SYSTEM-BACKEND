import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { LabItem } from '../laboratory/lab-item.entity';
import { ClinicConfig } from './clinic-config.entity';
import { AdminCreateLabItemDto, AdminCreateUserDto, AdminUpsertClinicConfigDto, AdminUpdateLabItemDto } from './admin.dto';
export declare class AdminService {
    private readonly userRepo;
    private readonly labItemRepo;
    private readonly clinicConfigRepo;
    constructor(userRepo: Repository<User>, labItemRepo: Repository<LabItem>, clinicConfigRepo: Repository<ClinicConfig>);
    createUser(dto: AdminCreateUserDto): Promise<Pick<User, 'id' | 'email' | 'fullName' | 'role' | 'isActive' | 'createdAt'>>;
    listUsers(): Promise<Array<Pick<User, 'id' | 'email' | 'fullName' | 'role' | 'isActive' | 'createdAt'>>>;
    createLabItem(dto: AdminCreateLabItemDto): Promise<LabItem>;
    listLabItems(): Promise<LabItem[]>;
    updateLabItem(id: string, dto: AdminUpdateLabItemDto): Promise<LabItem>;
    listClinicConfig(): Promise<ClinicConfig[]>;
    upsertClinicConfig(dto: AdminUpsertClinicConfigDto): Promise<ClinicConfig>;
    deleteClinicConfig(key: string): Promise<{
        deleted: boolean;
        key: string;
    }>;
}
