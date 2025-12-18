import { Component, OnInit } from '@angular/core';
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
import { Activity } from '../../../core/models/activity.model';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-activity-form',
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
    MatIcon
],
  templateUrl: './activity-form.component.html',
  styleUrl: './activity-form.component.scss'
})
export class ActivityFormComponent implements OnInit {
  form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    date: ['', Validators.required],
    requiredVolunteers: [1, [Validators.required, Validators.min(1)]],
    level: [''],
    city: ['', Validators.required]
  });

  isEdit = false;
  eventId: number | null = null;
  activityId: number | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('eventId'));
    this.activityId = this.route.snapshot.paramMap.get('activityId') ? Number(this.route.snapshot.paramMap.get('activityId')) : null;

    if (this.activityId) {
      this.isEdit = true;
      this.loadActivity();
    }
  }

  private loadActivity() {
    this.loading = true;
    this.http.get<Activity>(`${environment.apiUrl}/activities/${this.activityId}`).subscribe({
      next: (activity) => {
        this.form.patchValue({
          ...activity,
          date: activity.date ? activity.date.slice(0, 16) : ''  // для datetime-local
        });
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        alert('Ошибка загрузки задачи');
      }
    });
  }

  onSubmit() {
    if (this.form.invalid || !this.eventId) {
      alert('Заполните все обязательные поля и укажите событие');
      return;
    }

    this.loading = true;

    const activityData = this.form.value as Activity;

    const request = this.isEdit && this.activityId
      ? this.http.put<Activity>(`${environment.apiUrl}/activities/${this.activityId}`, activityData)
      : this.http.post<Activity>(`${environment.apiUrl}/activities?eventId=${this.eventId}`, activityData);

    request.subscribe({
      next: () => {
        this.loading = false;
        alert('Задача успешно сохранена!');
        this.router.navigate(['/events', this.eventId]);
      },
      error: (err) => {
        this.loading = false;
        console.error('Ошибка сохранения задачи', err);
        alert(err.error?.message || 'Не удалось сохранить задачу. Попробуйте позже.');
      }
    });
  }

  cancel() {
    this.router.navigate(['/events', this.eventId]);
  }
}