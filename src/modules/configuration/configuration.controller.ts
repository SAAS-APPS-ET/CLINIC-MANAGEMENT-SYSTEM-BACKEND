import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '../../common/enums/role.enums';
import { VisitStage } from '../../common/enums/visit.enums';
import { FeatureFlagService } from '../../core/feature-flag/feature-flag.service';
import {
  FeatureKeys,
  type FeatureKey,
} from '../../core/feature-flag/feature-keys';

type VisitStageCategoryKey =
  | 'Waiting'
  | 'Vitals'
  | 'Doctor'
  | 'Labratory'
  | 'Pharmacy';

type VisitStageCategory = {
  key: VisitStageCategoryKey;
  stages: VisitStage[];
};

@Controller('configuration')
@ApiTags('Configuration')
export class ConfigurationController {
  constructor(private readonly featureFlags: FeatureFlagService) {}

  @Get('roles')
  @ApiOperation({ summary: 'List available roles' })
  async listRoles() {
    const enabledMap = new Map<string, boolean>();
    const requiredFeatureByRole: Partial<Record<Role, string>> = {
      [Role.RECEPTIONIST]: FeatureKeys.ENABLE_RECEPTION_MODULE,
      [Role.DOCTOR]: FeatureKeys.ENABLE_DOCTOR_MODULE,
      [Role.VITAL_TECH]: FeatureKeys.ENABLE_VITAL_MODULE,
      [Role.LAB_TECH]: FeatureKeys.ENABLE_LAB_MODULE,
      [Role.PHARMACIST]: FeatureKeys.ENABLE_PHARMACY_MODULE,
    };

    const roles = Object.values(Role).filter(
      (role) => role !== Role.SUPER_ADMIN,
    );

    const allowed: Role[] = [];
    for (const role of roles) {
      if (role === Role.ADMIN) {
        allowed.push(role);
        continue;
      }

      const requiredFeature = requiredFeatureByRole[role];
      if (!requiredFeature) continue;

      const cached = enabledMap.get(requiredFeature);
      const enabled =
        cached ?? (await this.featureFlags.isEnabled(requiredFeature));
      enabledMap.set(requiredFeature, enabled);

      if (enabled) allowed.push(role);
    }

    return allowed;
  }

  @Get('feature-flags')
  @ApiOperation({
    summary: 'List feature flags configuration',
    description:
      'Returns all supported feature keys and their enabled/disabled value.',
  })
  async listFeatureFlags(): Promise<Record<FeatureKey, boolean>> {
    const result = {} as Record<FeatureKey, boolean>;
    const keys = Object.values(FeatureKeys) as FeatureKey[];

    for (const key of keys) {
      result[key] = await this.featureFlags.isEnabled(key);
    }

    return result;
  }

  @Get('visit-stages')
  @ApiOperation({
    summary: 'List visit stages categories',
    description:
      'Returns visit stage categories based on enabled feature flags.',
  })
  async listVisitStageCategories(): Promise<VisitStageCategory[]> {
    const enabledByKey = await this.listFeatureFlags();

    const result: VisitStageCategory[] = [];

    if (enabledByKey[FeatureKeys.ENABLE_RECEPTION_MODULE]) {
      result.push({
        key: 'Waiting',
        stages: [VisitStage.WAITING],
      });
    }

    if (enabledByKey[FeatureKeys.ENABLE_VITAL_MODULE]) {
      result.push({
        key: 'Vitals',
        stages: [VisitStage.WAITING_FOR_VITAL, VisitStage.VITAL_IN_PROGRESS],
      });
    }

    if (enabledByKey[FeatureKeys.ENABLE_DOCTOR_MODULE]) {
      result.push({
        key: 'Doctor',
        stages: [
          VisitStage.WAITING_FOR_DOCTOR,
          VisitStage.DOCTOR_IN_PROGRESS,
          VisitStage.WAITING_FOR_DOCTOR_REVIEW,
          VisitStage.DOCTOR_REVIEW_IN_PROGRESS,
        ],
      });
    }

    if (enabledByKey[FeatureKeys.ENABLE_LAB_MODULE]) {
      result.push({
        key: 'Labratory',
        stages: [
          VisitStage.WAITING_FOR_LAB,
          VisitStage.LAB_IN_PROGRESS,
          VisitStage.WAITING_FOR_LAB_REPORT,
        ],
      });
    }

    if (enabledByKey[FeatureKeys.ENABLE_PHARMACY_MODULE]) {
      result.push({
        key: 'Pharmacy',
        stages: [
          VisitStage.WAITING_FOR_PHARMACY,
          VisitStage.PHARMACY_IN_PROGRESS,
        ],
      });
    }

    return result;
  }
}
