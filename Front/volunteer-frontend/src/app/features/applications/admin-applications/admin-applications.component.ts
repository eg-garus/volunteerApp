import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { StatusTranslatePipe } from "../../../pipes/status-translate.pipe";

// DataTables
import DataTable from 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons/js/buttons.html5.min.js';
import 'datatables.net-buttons/js/buttons.print.min.js';
import * as $ from 'jquery';

interface AdminApplication {
  id: number;
  userLogin: string;
  activityName: string;
  eventName: string;
  comment?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submissionDate: string;
  userId: number;
}

@Component({
  selector: 'app-admin-applications',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    StatusTranslatePipe
  ],
  templateUrl: './admin-applications.component.html',
  styleUrl: './admin-applications.component.scss'
})
export class AdminApplicationsComponent implements OnInit {
  @ViewChild('dataTable') tableElement!: ElementRef;

  dataSource: AdminApplication[] = [];
  loading = true;
  private dataTableInstance: any;

  // Ручная пагинация
  currentPage = 1;
  pageSize = 10;

  get totalPages(): number {
    return Math.ceil(this.dataSource.length / this.pageSize);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

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
        setTimeout(() => this.initDataTable(), 100);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  private initDataTable() {
    if (!this.tableElement?.nativeElement) {
      console.warn('Таблица ещё не готова');
      return;
    }

    if (this.dataTableInstance) {
      this.dataTableInstance.destroy();
      this.dataTableInstance = null;
    }

    this.dataTableInstance = new DataTable(this.tableElement.nativeElement, {
      paging: false,          // отключаем встроенную пагинацию
      searching: false,       // отключаем поиск (если не нужен)
      info: false,            // отключаем "Записи с..."
      lengthChange: false,    // отключаем выбор количества строк
      ordering: true,         // сортировка остаётся
      dom: 'Bfrtip',
      buttons: [
        { extend: 'copy', text: 'Копировать' },
        { extend: 'csv', text: 'CSV' },
        { extend: 'excel', text: 'Excel' },
        { extend: 'pdf', text: 'PDF' },
        { extend: 'print', text: 'Печать' }
      ]
    });
  }

  approve(id: number) {
    this.http.put(`${environment.apiUrl}/applications/${id}/approve`, {}).subscribe({
      next: () => this.reloadTable(),
      error: () => alert('Ошибка одобрения')
    });
  }

  reject(id: number) {
    this.http.put(`${environment.apiUrl}/applications/${id}/reject`, {}).subscribe({
      next: () => this.reloadTable(),
      error: () => alert('Ошибка отклонения')
    });
  }

  delete(id: number) {
    if (confirm('Удалить заявку? Это действие необратимо.')) {
      this.http.delete(`${environment.apiUrl}/applications/${id}`).subscribe({
        next: () => this.reloadTable(),
        error: () => alert('Ошибка удаления')
      });
    }
  }

  viewQuestionnaire(userId: number) {
    if (!userId) {
      alert('ID пользователя не найден');
      return;
    }
    const url = `/questionnaire/view/${userId}`;
    window.open(url, '_blank');
  }

  private reloadTable() {
    if (this.dataTableInstance) {
      this.dataTableInstance.destroy();
      this.dataTableInstance = null;
    }
    this.loadAllApplications();
  }
}