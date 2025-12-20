export interface Activity {
  id: number;
  name: string;
  description: string;
  date: string;  // ISO строка
  requiredVolunteers: number;
  volunteerCount?: number;  // текущие записавшиеся
  level?: string;  // Лёгкий, Средний, Сложный
  city: string;
}