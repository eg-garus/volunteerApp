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

interface MyApplication {
  id: number;
  activityName: string;
  comment?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submissionDate: string;
}

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    StatusTranslatePipe
  ],
  templateUrl: './my-applications.component.html',
  styleUrl: './my-applications.component.scss'
})
export class MyApplicationsComponent implements OnInit {
  @ViewChild('dataTable') tableElement!: ElementRef;

  dataSource: MyApplication[] = [];
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
    this.loadMyApplications();
  }

  loadMyApplications() {
    this.loading = true;
    this.http.get<MyApplication[]>(`${environment.apiUrl}/applications/my`).subscribe({
      next: (apps) => {
        this.dataSource = apps;
        this.loading = false;
        setTimeout(() => this.initDataTable(), 100);
      },
      error: (err) => {
        console.error('Ошибка загрузки:', err);
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
      // Отключаем встроенную пагинацию, info, lengthMenu и т.д.
      paging: false,          // отключаем пагинацию DataTables
      searching: true,       // отключаем поиск (если не нужен)
      info: false,            // отключаем "Записи с... из..."
      lengthChange: true,    // отключаем "Показать _MENU_ записей"
      ordering: true,         // сортировка остаётся
      dom: 'Bfrtip',
      language: {
        url: 'assets/i18n/ru.json'
      },        // только кнопки экспорта (B), фильтр (f), таблица (t), info (i), пагинация (p)
      buttons: [
        { extend: 'copy', text: 'Копировать' },
        { extend: 'csv', text: 'CSV' },
        { extend: 'excel', text: 'Excel' },
        { extend: 'pdf', text: 'PDF' },
        { extend: 'print', text: 'Печать' }
      ]
    });
  }

  delete(id: number) {
    if (confirm('Отозвать заявку?')) {
      this.http.delete(`${environment.apiUrl}/applications/${id}`).subscribe({
        next: () => {
          alert('Заявка отозвана');
          this.loadMyApplications();
        },
        error: () => alert('Ошибка при отзыве')
      });
    }
  }
}