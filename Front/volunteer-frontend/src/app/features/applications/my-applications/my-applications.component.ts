import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApplicationDto } from '../../../core/models/application.model';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface MyApplication {
  id: number;
  activityName: string;  // ← название мероприятия как строка
  comment?: string;
  status: string;
  submissionDate: string;
}

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './my-applications.component.html',
  styleUrl: './my-applications.component.scss'
})
export class MyApplicationsComponent implements OnInit {
  displayedColumns: string[] = ['activityName', 'submissionDate', 'status', 'comment'];
  dataSource: ApplicationDto[] = [];
  loading = true;

  constructor(private http: HttpClient, public authService: AuthService) {}

  ngOnInit(): void {
    this.loadMyApplications();
  }


loadMyApplications() {
  this.loading = true;
  this.http.get<ApplicationDto[]>(`${environment.apiUrl}/applications/my`).subscribe({
    next: (apps) => {
      this.dataSource = apps.map(app => ({
        id: app.id,
        activityName: app.activityName || 'Неизвестно',
        comment: app.comment,
        status: app.status,
        submissionDate: app.submissionDate
      }));
      this.loading = false;
    },
    error: (err) => {
      console.error('Ошибка', err);
      this.loading = false;
    }
  });
}
}