import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';  // ← добавь MatTableDataSource
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { Activity } from '../../../core/models/activity.model';
import { ActivityService } from '../../../core/services/activity.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activities-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ActivitiesListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'date', 'city', 'requiredVolunteers', 'actions'];
  dataSource = new MatTableDataSource<Activity>([]);  // ← вот так!
  loading = true;

  constructor(
    private activityService: ActivityService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities() {
    this.loading = true;
    this.activityService.getAll().subscribe({
      next: (activities) => {
        this.dataSource.data = activities;  // ← присваиваем data
        this.loading = false;
      },
      error: (err) => {
        console.error('Ошибка загрузки мероприятий', err);
        this.loading = false;
      }
    });
  }

goToCreate() {
  this.router.navigate(['/activities/create']);
}

applyForActivity(id: number) {
  if (!this.authService.isLoggedIn()) {
    alert('Пожалуйста, войдите в систему');
    this.router.navigate(['/auth/login']);
    return;
  }

  const comment = prompt('Комментарий к заявке (необязательно):', '');
    this.activityService.applyForActivity(id, comment || '').subscribe({
      next: (app) => {
        alert('Заявка успешно отправлена! Ожидайте одобрения.');
        // Можно обновить список
        this.loadActivities();
      },
      error: (err) => {
        const msg = err.error?.message || 'Ошибка при подаче заявки';
        alert(msg);
      }
    });
  }

  editActivity(id: number) {
    this.router.navigate(['/activities', id, 'edit']);
  }

  deleteActivity(id: number) {
    if (confirm('Удалить мероприятие?')) {
      this.activityService.delete(id).subscribe(() => {
        this.loadActivities();
      });
    }
  }
}