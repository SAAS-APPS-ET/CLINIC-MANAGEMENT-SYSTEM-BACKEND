import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { LabItem } from '../laboratory/lab-item.entity';
import { ClinicConfig } from './clinic-config.entity';
import {
  AdminCreateLabItemDto,
  AdminCreateUserDto,
  AdminUpsertClinicConfigDto,
  AdminUpdateLabItemDto,
} from './admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(LabItem)
    private readonly labItemRepo: Repository<LabItem>,
    @InjectRepository(ClinicConfig)
    private readonly clinicConfigRepo: Repository<ClinicConfig>,
  ) {}

  async createUser(
    dto: AdminCreateUserDto,
  ): Promise<
    Pick<User, 'id' | 'email' | 'fullName' | 'role' | 'isActive' | 'createdAt'>
  > {
    const existing = await this.userRepo.findOne({
      where: { email: dto.email },
    });
    if (existing) throw new BadRequestException('User already exists');

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({
      email: dto.email,
      fullName: dto.fullName,
      role: dto.role,
      passwordHash,
      isActive: true,
    });
    const saved = await this.userRepo.save(user);

    return {
      id: saved.id,
      email: saved.email,
      fullName: saved.fullName,
      role: saved.role,
      isActive: saved.isActive,
      createdAt: saved.createdAt,
    };
  }

  async listUsers(): Promise<
    Array<
      Pick<
        User,
        'id' | 'email' | 'fullName' | 'role' | 'isActive' | 'createdAt'
      >
    >
  > {
    const users = await this.userRepo.find({
      where: {
        role: Not(In(['ADMIN', 'SUPER_ADMIN'])),
      },
      order: { createdAt: 'DESC' },
    });
    return users.map((u) => ({
      id: u.id,
      email: u.email,
      fullName: u.fullName,
      role: u.role,
      isActive: u.isActive,
      createdAt: u.createdAt,
    }));
  }

  async createLabItem(dto: AdminCreateLabItemDto): Promise<LabItem> {
    const item = this.labItemRepo.create({
      name: dto.name,
      price: dto.price,
      isActive: dto.isActive ?? true,
    });
    return this.labItemRepo.save(item);
  }

  async listLabItems(): Promise<LabItem[]> {
    return this.labItemRepo.find({ order: { name: 'ASC' } });
  }

  async updateLabItem(
    id: string,
    dto: AdminUpdateLabItemDto,
  ): Promise<LabItem> {
    const item = await this.labItemRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Lab item not found');
    Object.assign(item, dto);
    return this.labItemRepo.save(item);
  }

  async listClinicConfig(): Promise<ClinicConfig[]> {
    return this.clinicConfigRepo.find({ order: { key: 'ASC' } });
  }

  async upsertClinicConfig(
    dto: AdminUpsertClinicConfigDto,
  ): Promise<ClinicConfig> {
    const existing = await this.clinicConfigRepo.findOne({
      where: { key: dto.key },
    });

    const record = existing
      ? Object.assign(existing, {
          value: dto.value,
          valueType: dto.valueType ?? existing.valueType,
          isSecret: dto.isSecret ?? existing.isSecret,
        })
      : this.clinicConfigRepo.create({
          key: dto.key,
          value: dto.value,
          valueType: dto.valueType ?? 'string',
          isSecret: dto.isSecret ?? false,
        });

    return this.clinicConfigRepo.save(record);
  }

  async deleteClinicConfig(
    key: string,
  ): Promise<{ deleted: boolean; key: string }> {
    const existing = await this.clinicConfigRepo.findOne({ where: { key } });
    if (!existing) throw new NotFoundException('Config key not found');

    await this.clinicConfigRepo.remove(existing);
    return { deleted: true, key };
  }
}
