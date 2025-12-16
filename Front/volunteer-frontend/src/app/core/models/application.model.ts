export interface ApplicationDto {
  id: number;
  activityName: string;
  comment?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submissionDate: string;
}