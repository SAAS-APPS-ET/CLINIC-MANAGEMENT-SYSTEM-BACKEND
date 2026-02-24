import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { User } from '../user/user.entity';
import { LabItem } from '../laboratory/lab-item.entity';
import { ClinicConfig } from './clinic-config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, LabItem, ClinicConfig])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
