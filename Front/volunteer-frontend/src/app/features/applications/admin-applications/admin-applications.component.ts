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
  comment?: string;
  status: string;
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
  displayedColumns: string[] = ['userLogin', 'activityName', 'comment', 'submissionDate', 'status', 'actions'];
  dataSource: AdminApplication[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAllApplications();
  }

  loadAllApplications() {
    this.loading = true;
    this.http.get<AdminApplication[]>(`${environment.apiUrl}/applications/all`).subscribe({
      next: (apps) => {
        this.dataSource = apps;
        this.loading = false;
      },
      error: (err) => {
        console.error('Ошибка', err);
        this.loading = false;
      }
    });
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