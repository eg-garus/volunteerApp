import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
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
    FormsModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  events: Event[] = [];
  upcomingEvents: Event[] = [];
  pastEvents: Event[] = [];

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

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Ближайшие (будущие и текущие)
        this.upcomingEvents = events
          .filter(e => new Date(e.startDate) >= today)
          .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

        // Архивные (прошедшие)
        this.pastEvents = events
          .filter(e => new Date(e.startDate) < today)
          .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()); // новые сверху

        // Уникальные для фильтров (из всех событий)
        this.uniqueCities = [...new Set(events.map(e => e.city).filter(Boolean) as string[])].sort();
        this.uniqueTypes = [...new Set(events.map(e => e.type).filter(Boolean) as string[])].sort();
        this.uniqueKinds = [...new Set(events.map(e => e.kind).filter(Boolean) as string[])].sort();

        this.applyFilter(); // применяем фильтр сразу

        this.loading = false;
      },
      error: (err) => {
        console.error('Ошибка загрузки событий', err);
        this.loading = false;
      }
    });
  }

  applyFilter() {
    let upcoming = this.upcomingEvents;
    let past = this.pastEvents;

    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      upcoming = upcoming.filter(e => e.name.toLowerCase().includes(search));
      past = past.filter(e => e.name.toLowerCase().includes(search));
    }

    if (this.selectedCity) {
      upcoming = upcoming.filter(e => e.city === this.selectedCity);
      past = past.filter(e => e.city === this.selectedCity);
    }

    if (this.selectedType) {
      upcoming = upcoming.filter(e => e.type === this.selectedType);
      past = past.filter(e => e.type === this.selectedType);
    }

    if (this.selectedKind) {
      upcoming = upcoming.filter(e => e.kind === this.selectedKind);
      past = past.filter(e => e.kind === this.selectedKind);
    }

    // Обновляем отображаемые (но в шаблоне мы используем upcomingEvents и pastEvents напрямую)
    this.upcomingEvents = upcoming;
    this.pastEvents = past;
  }

  clearFilters() {
    this.searchText = '';
    this.selectedCity = '';
    this.selectedType = '';
    this.selectedKind = '';
    this.loadEvents(); // перезагружаем, чтобы сбросить фильтр
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