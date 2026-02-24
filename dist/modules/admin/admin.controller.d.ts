import { AdminService } from './admin.service';
import { AdminCreateLabItemDto, AdminCreateUserDto, AdminUpsertClinicConfigDto, AdminUpdateLabItemDto } from './admin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    createUser(dto: AdminCreateUserDto): Promise<Pick<import("../user/user.entity").User, "email" | "id" | "fullName" | "role" | "isActive" | "createdAt">>;
    listUsers(): Promise<Pick<import("../user/user.entity").User, "email" | "id" | "fullName" | "role" | "isActive" | "createdAt">[]>;
    createLabItem(dto: AdminCreateLabItemDto): Promise<import("../laboratory/lab-item.entity").LabItem>;
    listLabItems(): Promise<import("../laboratory/lab-item.entity").LabItem[]>;
    updateLabItem(id: string, dto: AdminUpdateLabItemDto): Promise<import("../laboratory/lab-item.entity").LabItem>;
    listClinicConfig(): Promise<import("./clinic-config.entity").ClinicConfig[]>;
    upsertClinicConfig(dto: AdminUpsertClinicConfigDto): Promise<import("./clinic-config.entity").ClinicConfig>;
    deleteClinicConfig(key: string): Promise<{
        deleted: boolean;
        key: string;
    }>;
}
