export interface Activity {
  id: number;
  name: string;
  description: string;
  date: string; // ISO string, например "2025-12-25T10:00:00"
  requiredVolunteers: number;
  currentVolunteers?: number;
  city: string;
  level?: string;
  // Можно добавить type и kind, если используешь справочники
}