export interface Event {
  id: number;
  name: string;
  description: string;
  startDate: string;  // ISO строка, например "2026-01-01T12:00:00"
  endDate: string;
  kind?: string;      // культурное, спортивное, экологическое и т.д.
  type?: string;      // фестиваль, субботник, забег и т.д.
  city: string;
  address?: string;
  organizer?: string;
  contactPhone?: string;
  contactEmail?: string;
  website?: string;
  imageUrl?: string;  // ссылка на постер события
}