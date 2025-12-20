import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface AdminApplication {
  id: number;
  userLogin: string;
  activityName: string;
  eventName: string;
  comment?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submissionDate: string;
}

@Component({
  selector: 'app-admin-applications',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './admin-applications.component.html',
  styleUrl: './admin-applications.component.scss'
})
export class AdminApplicationsComponent implements OnInit {
  displayedColumns: string[] = ['userLogin', 'eventName', 'activityName', 'comment', 'submissionDate', 'status', 'actions'];
  dataSource: AdminApplication[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAllApplications();
  }

  loadAllApplications() {
    this.loading = true;
    this.http.get<AdminApplication[]>(`${environment.apiUrl}/applications/admin/all`).subscribe({
      next: (apps) => {
        this.dataSource = apps;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  delete(id: number) {
    if (confirm('Удалить заявку? Это действие необратимо.')) {
      this.http.delete(`${environment.apiUrl}/applications/${id}`).subscribe({
        next: () => {
          alert('Заявка удалена');
          this.loadAllApplications();
        },
        error: () => alert('Ошибка при удалении')
      });
    }
  }

  approve(id: number) {
    this.http.put(`${environment.apiUrl}/applications/${id}/approve`, {}).subscribe(() => {
      this.loadAllApplications();
    });
  }

  reject(id: number) {
    this.http.put(`${environment.apiUrl}/applications/${id}/reject`, {}).subscribe(() => {
      this.loadAllApplications();
    });
  }
}