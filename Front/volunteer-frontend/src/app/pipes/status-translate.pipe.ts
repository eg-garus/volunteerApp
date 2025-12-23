import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusTranslate',
  standalone: true
})
export class StatusTranslatePipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value) return '—';

    switch (value.toUpperCase()) {
      case 'PENDING':
        return 'На рассмотрении';
      case 'APPROVED':
        return 'Одобрена';
      case 'REJECTED':
        return 'Отклонена';
      default:
        return value; // если вдруг новый статус
    }
  }
}