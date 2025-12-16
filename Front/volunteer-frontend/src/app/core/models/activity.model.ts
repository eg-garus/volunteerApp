export interface Activity {
  id?: number;
  name: string;
  description: string;
  date: string; // ISO, например "2025-12-20T10:00:00"
  requiredVolunteers: number;
  currentVolunteers?: number;
  city: string;
  level?: string;
  type?: string;
  kind?: string;
}