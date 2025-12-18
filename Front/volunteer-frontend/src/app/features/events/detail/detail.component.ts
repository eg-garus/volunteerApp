import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';
import { Event } from '../../../core/models/event.model';
import { Activity } from '../../../core/models/activity.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  event: Event | null = null;
  activities: Activity[] = [];
  loading = true;

  private route = inject(ActivatedRoute);  // ← inject вместо конструктора
  private http = inject(HttpClient);
  private router = inject(Router);         // ← вот так инжектируем Router
  public authService = inject(AuthService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadEvent(id);
      this.loadActivities(id);
    }
  }

  loadEvent(id: number) {
    this.http.get<Event>(`${environment.apiUrl}/events/${id}`).subscribe({
      next: (event) => {
        this.event = event;
      }
    });
  }

    editEvent(id: number) {
    this.router.navigate(['/events', id, 'edit']);
  }

  deleteEvent(id: number) {
    if (confirm('Удалить событие? Это удалит все связанные задачи и заявки!')) {
      this.http.delete(`${environment.apiUrl}/events/${id}`).subscribe({
        next: () => {
          alert('Событие удалено');
          this.router.navigate(['/events']);
        },
        error: (err) => {
          alert('Ошибка при удалении события');
        }
      });
    }
  }

  editActivity(id: number) {
    this.router.navigate(['/events', this.event?.id, 'activities', id, 'edit']);
  }

  deleteActivity(id: number) {
    if (confirm('Удалить задачу?')) {
      this.http.delete(`${environment.apiUrl}/activities/${id}`).subscribe({
        next: () => {
          alert('Задача удалена');
          this.loadActivities(this.event!.id);
        },
        error: () => alert('Ошибка при удалении')
      });
    }
  }

  loadActivities(eventId: number) {
    this.http.get<Activity[]>(`${environment.apiUrl}/events/${eventId}/activities`).subscribe({
      next: (activities) => {
        this.activities = activities;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  applyForActivity(activityId: number) {
    if (!this.authService.isLoggedIn()) {
      alert('Войдите в систему');
      return;
    }

    const comment = prompt('Комментарий к заявке (необязательно):') || '';

    this.http.post(`${environment.apiUrl}/applications`, { activityId, comment }).subscribe({
      next: () => {
        alert('Заявка отправлена!');
      },
      error: (err) => {
        alert(err.error?.message || 'Ошибка при подаче заявки');
      }
    });
  }
}