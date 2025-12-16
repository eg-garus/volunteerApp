import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';  // ← обязательно!
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
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
    MatTableModule,              // ← это главное!
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ActivitiesListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'date', 'city', 'requiredVolunteers', 'actions'];
  dataSource: Activity[] = [];
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
        this.dataSource = activities;
        this.loading = false;
      },
      error: (err) => {
        console.error('Ошибка загрузки мероприятий', err);
        this.loading = false;
      }
    });
  }

  applyForActivity(id: number) {
    alert(`Заявка на мероприятие ${id} отправлена!`);
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