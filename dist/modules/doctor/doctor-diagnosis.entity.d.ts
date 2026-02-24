import { Category } from '../category/category.entity';
export declare class DoctorDiagnosis {
    id: string;
    visitId: string;
    categoryId?: string;
    category?: Category;
    diagnosisText: string;
    notes?: string;
    createdBy: string;
}
