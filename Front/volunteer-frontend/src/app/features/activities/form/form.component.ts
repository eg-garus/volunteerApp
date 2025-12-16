import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivityService } from '../../../core/services/activity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from '../../../core/models/activity.model';

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
    MatNativeDateModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
    requiredVolunteers: [1, [Validators.required, Validators.min(1)]],
    city: ['', Validators.required],
    level: ['']
  });

  isEdit = false;
  activityId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activityId = this.route.snapshot.paramMap.get('id') ? Number(this.route.snapshot.paramMap.get('id')) : null;
    if (this.activityId) {
      this.isEdit = true;
      this.activityService.getById(this.activityId).subscribe({
        next: (activity) => {
          this.form.patchValue({
            ...activity,
            date: activity.date ? activity.date.slice(0, 16) : ''  // для datetime-local
          });
        }
      });
    }
  }

  cancel() {
  this.router.navigate(['/activities']);
  }

  onSubmit() {
    if (this.form.invalid) return;

    const formValue = this.form.value;

    const activity: Activity = {
      id: this.activityId ?? undefined,
      name: formValue.name!,             // ! — утверждаем, что не null/undefined (валидация прошла)
      description: formValue.description!,
      date: formValue.date!,
      requiredVolunteers: formValue.requiredVolunteers!,
      city: formValue.city!,
      level: formValue.level ?? undefined
    };

    const request = this.isEdit && this.activityId
      ? this.activityService.update(this.activityId, activity)
      : this.activityService.create(activity);

    request.subscribe({
      next: () => this.router.navigate(['/activities']),
      error: (err) => alert('Ошибка: ' + (err.error?.message || 'Попробуйте позже'))
    });
  }
}