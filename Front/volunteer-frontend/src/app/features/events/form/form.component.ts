import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../../../core/models/event.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    kind: [''],
    type: [''],
    city: ['', Validators.required],
    address: [''],
    organizer: [''],
    contactPhone: [''],
    contactEmail: [''],
    website: [''],
    imageUrl: ['']
  });

  isEdit = false;
  eventId: number | null = null;
  loading = false;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.eventId = idParam ? Number(idParam) : null;

    if (this.eventId) {
      this.isEdit = true;
      this.loadEvent();
    }
  }

  private loadEvent() {
    this.loading = true;
    this.http.get<Event>(`${environment.apiUrl}/events/${this.eventId}`).subscribe({
      next: (event) => {
        this.form.patchValue({
          ...event,
          startDate: event.startDate ? event.startDate.slice(0, 16) : '',
          endDate: event.endDate ? event.endDate.slice(0, 16) : ''
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Ошибка загрузки события');
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const eventData: Event = this.form.value as Event;

    const request = this.isEdit && this.eventId
      ? this.http.put<Event>(`${environment.apiUrl}/events/${this.eventId}`, eventData)
      : this.http.post<Event>(`${environment.apiUrl}/events`, eventData);

    request.subscribe({
      next: () => {
        this.loading = false;
        alert(this.isEdit ? 'Событие успешно обновлено!' : 'Событие успешно создано!');
        this.router.navigate(['/events']);
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        alert(err.error?.message || 'Ошибка при сохранении события');
      }
    });
  }

  cancel() {
    this.router.navigate(['/events']);
  }
}