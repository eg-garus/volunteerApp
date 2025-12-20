import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';  // ← для ngModel
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Event } from '../../../core/models/event.model';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule  // ← обязательно добавь
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];

  searchText = '';
  selectedCity = '';
  selectedType = '';
  selectedKind = '';

  uniqueCities: string[] = [];
  uniqueTypes: string[] = [];
  uniqueKinds: string[] = [];

  loading = true;

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.loading = true;
    this.http.get<Event[]>(`${environment.apiUrl}/events`).subscribe({
      next: (events) => {
        this.events = events;
        this.filteredEvents = events;

        // Уникальные значения для фильтров
        this.uniqueCities = [...new Set(events
          .map(e => e.city)
          .filter((c): c is string => !!c)  // ← тип-гвард, убирает undefined/null/пустые
        )].sort();

        this.uniqueTypes = [...new Set(events
          .map(e => e.type)
          .filter((t): t is string => t != null && t.trim() !== '')  // убирает null, undefined, пустые строки
        )].sort();

        this.uniqueKinds = [...new Set(events
          .map(e => e.kind)
          .filter((k): k is string => k != null && k.trim() !== '')
        )].sort();

        this.loading = false;
      },
      error: (err) => {
        console.error('Ошибка загрузки событий', err);
        this.loading = false;
      }
    });
  }

  applyFilter() {
    let filtered = this.events;

    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = filtered.filter(e => e.name.toLowerCase().includes(search));
    }

    if (this.selectedCity) {
      filtered = filtered.filter(e => e.city === this.selectedCity);
    }

    if (this.selectedType) {
      filtered = filtered.filter(e => e.type === this.selectedType);
    }

    if (this.selectedKind) {
      filtered = filtered.filter(e => e.kind === this.selectedKind);
    }

    this.filteredEvents = filtered;
  }

  clearFilters() {
    this.searchText = '';
    this.selectedCity = '';
    this.selectedType = '';
    this.selectedKind = '';
    this.applyFilter();
  }

  hasFilters(): boolean {
    return !!this.searchText || !!this.selectedCity || !!this.selectedType || !!this.selectedKind;
  }

  goToEvent(id: number) {
    this.router.navigate(['/events', id]);
  }

  goToCreate() {
    this.router.navigate(['events', 'create']);
  }
}