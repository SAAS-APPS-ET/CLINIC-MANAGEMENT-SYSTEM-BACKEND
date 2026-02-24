import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto, UpdatePatientDto } from './patient.dto';
import { Patient } from './patient.entity';
import { Visit } from '../visit/visit.entity';
import { DoctorDiagnosis } from '../doctor/doctor-diagnosis.entity';
import { Vital } from '../vital/vital.entity';
import { LabRequest } from '../laboratory/lab-request.entity';
import { LabReport } from '../laboratory/lab-report.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
    @InjectRepository(Visit)
    private readonly visitRepo: Repository<Visit>,
    @InjectRepository(DoctorDiagnosis)
    private readonly diagnosisRepo: Repository<DoctorDiagnosis>,
    @InjectRepository(Vital)
    private readonly vitalRepo: Repository<Vital>,
    @InjectRepository(LabRequest)
    private readonly labRequestRepo: Repository<LabRequest>,
    @InjectRepository(LabReport)
    private readonly labReportRepo: Repository<LabReport>,
  ) {}

  async searchByPhone(phone: string) {
    const trimmed = (phone ?? '').trim();
    if (!/^(07|09)\d{8}$/.test(trimmed)) {
      throw new BadRequestException(
        'phone must be 10 digits and start with 07 or 09',
      );
    }

    return this.patientRepo.find({
      where: { phoneNumber: trimmed },
      order: { createdAt: 'DESC' },
      take: 20,
    });
  }

  async registerPatient(dto: CreatePatientDto) {
    if (!dto.fullName?.trim()) {
      throw new BadRequestException('fullName is required');
    }
    const phoneNumber = dto.phoneNumber?.trim();
    if (!phoneNumber) {
      throw new BadRequestException('phoneNumber is required');
    }

    const patient = this.patientRepo.create({
      fullName: dto.fullName.trim(),
      phoneNumber,
      dateOfBirth: new Date(dto.dateOfBirth),
      gender: dto.gender,
      customerCardNumber: dto.customerCardNumber?.trim(),
      region: dto.region?.trim(),
      subCity: dto.subCity?.trim(),
      wereda: dto.wereda?.trim(),
      kebela: dto.kebela?.trim(),
    });

    // Do not check for existing phone numbers; duplicates are allowed.
    return this.patientRepo.save(patient);
  }

  async updatePatient(id: string, dto: UpdatePatientDto) {
    const patient = await this.patientRepo.findOne({ where: { id } });
    if (!patient) throw new NotFoundException('Patient not found');

    if (dto.fullName !== undefined) patient.fullName = dto.fullName.trim();
    if (dto.phoneNumber !== undefined)
      patient.phoneNumber = dto.phoneNumber?.trim();
    if (dto.dateOfBirth !== undefined)
      patient.dateOfBirth = new Date(dto.dateOfBirth);
    if (dto.gender !== undefined) patient.gender = dto.gender;
    if (dto.customerCardNumber !== undefined)
      patient.customerCardNumber = dto.customerCardNumber?.trim();
    if (dto.region !== undefined) patient.region = dto.region?.trim();
    if (dto.subCity !== undefined) patient.subCity = dto.subCity?.trim();
    if (dto.wereda !== undefined) patient.wereda = dto.wereda?.trim();
    if (dto.kebela !== undefined) patient.kebela = dto.kebela?.trim();

    patient.updatedAt = new Date();
    return this.patientRepo.save(patient);
  }

  async getPatientHistory(id: string) {
    const patient = await this.patientRepo.findOne({ where: { id } });
    if (!patient) throw new NotFoundException('Patient not found');

    const visits = await this.visitRepo.find({
      where: { patientId: id },
      order: { createdAt: 'DESC' },
    });

    const visitIds = visits.map((v) => v.id);
    const diagnoses = visitIds.length
      ? await this.diagnosisRepo.find({
          where: visitIds.map((visitId) => ({ visitId })),
          relations: { category: true },
        })
      : [];

    const diagnosesByVisitId = new Map<string, DoctorDiagnosis[]>();
    for (const d of diagnoses) {
      const list = diagnosesByVisitId.get(d.visitId) ?? [];
      list.push(d);
      diagnosesByVisitId.set(d.visitId, list);
    }

    return {
      visits: visits.map((v) => ({
        ...v,
        diagnoses: diagnosesByVisitId.get(v.id) ?? [],
      })),
    };
  }

  async getCurrentDetail(patientId: string, visitId: string) {
    const pid = (patientId ?? '').trim();
    const vid = (visitId ?? '').trim();
    if (!pid) throw new BadRequestException('patientId is required');
    if (!vid) throw new BadRequestException('visitId is required');

    const patient = await this.patientRepo.findOne({ where: { id: pid } });
    if (!patient) throw new NotFoundException('Patient not found');

    const visit = await this.visitRepo.findOne({
      where: { id: vid, patientId: pid },
    });
    if (!visit) throw new NotFoundException('Visit not found');

    const diagnoses = await this.diagnosisRepo.find({
      where: { visitId: vid },
      relations: { category: true },
      order: { id: 'DESC' },
    });

    const vitals = await this.vitalRepo.find({
      where: { visitId: vid },
      order: { id: 'DESC' },
    });

    const labRequests = await this.labRequestRepo.find({
      where: { visitId: vid },
      order: { id: 'DESC' },
    });

    const labRequestIds = labRequests.map((r) => r.id);
    const labReports = labRequestIds.length
      ? await this.labReportRepo.find({
          where: labRequestIds.map((labRequestId) => ({ labRequestId })),
          order: { id: 'DESC' },
        })
      : [];

    return {
      patient,
      visit,
      diagnoses,
      vitals,
      labRequests,
      labReports,
    };
  }
}
