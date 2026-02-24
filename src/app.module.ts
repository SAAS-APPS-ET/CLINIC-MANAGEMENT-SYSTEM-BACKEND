import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './core/config/config.module';
import { DatabaseModule } from './core/database/database.module';
import { LoggerModule } from './core/logger/logger.module';
import { AuthModule } from './core/auth/auth.module';
import { FeatureFlagModule } from './core/feature-flag/feature-flag.module';
import { PatientModule } from './modules/patient/patient.module';
import { UserModule } from './modules/user/user.module';
import { VisitModule } from './modules/visit/visit.module';
import { QueueModule } from './modules/queue/queue.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { VitalModule } from './modules/vital/vital.module';
import { LaboratoryModule } from './modules/laboratory/laboratory.module';
import { PharmacyModule } from './modules/pharmacy/pharmacy.module';
import { PaymentModule } from './modules/payment/payment.module';
import { AdminModule } from './modules/admin/admin.module';
import { ReportModule } from './modules/report/report.module';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { CategoryModule } from './modules/category/category.module';
import { CommandsModule } from './commands/commands.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    AppConfigModule,
    LoggerModule,
    DatabaseModule,
    FeatureFlagModule,
    AuthModule,
    PatientModule,
    UserModule,
    VisitModule,
    QueueModule,
    DoctorModule,
    VitalModule,
    LaboratoryModule,
    PharmacyModule,
    PaymentModule,
    AdminModule,
    ReportModule,
    ConfigurationModule,
    CategoryModule,
    CommandsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
