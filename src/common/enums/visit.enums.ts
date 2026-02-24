export enum VisitStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum QueueStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  REMOVED = 'REMOVED',
}

export enum VisitStage {
  WAITING = 'WAITING', // only for reception only clinic
  WAITING_FOR_VITAL = 'WAITING_FOR_VITAL',
  VITAL_IN_PROGRESS = 'VITAL_IN_PROGRESS',

  WAITING_FOR_DOCTOR = 'WAITING_FOR_DOCTOR', // only for reception and doctor only clinic
  DOCTOR_IN_PROGRESS = 'DOCTOR_IN_PROGRESS',

  WAITING_FOR_LAB = 'WAITING_FOR_LAB',
  LAB_IN_PROGRESS = 'LAB_IN_PROGRESS',
  WAITING_FOR_LAB_REPORT = 'WAITING_FOR_LAB_REPORT',

  WAITING_FOR_DOCTOR_REVIEW = 'WAITING_FOR_DOCTOR_REVIEW',
  DOCTOR_REVIEW_IN_PROGRESS = 'DOCTOR_REVIEW_IN_PROGRESS',

  WAITING_FOR_PHARMACY = 'WAITING_FOR_PHARMACY',
  PHARMACY_IN_PROGRESS = 'PHARMACY_IN_PROGRESS',

  COMPLETED = 'COMPLETED',
}

// NOTE (Postgres enum migration): if your DB already has the enum type
// "visit_currentstage_enum" / "queue_item_stage_enum", you must ALTER TYPE to add
// the new values (TypeORM synchronize cannot reliably change existing enum types).
// Example (run once):
//   ALTER TYPE public.visit_currentstage_enum ADD VALUE IF NOT EXISTS 'WAITING_FOR_VITAL';
//   ... repeat for each new enum value ...
// Same for: public.queue_item_stage_enum
