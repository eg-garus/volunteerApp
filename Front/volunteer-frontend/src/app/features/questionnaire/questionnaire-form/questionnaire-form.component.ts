import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';
import { Questionnaire } from '../../model/questionnaire.model';

@Component({
  selector: 'app-questionnaire-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './questionnaire-form.component.html',
  styleUrl: './questionnaire-form.component.scss'
})
export class QuestionnaireFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  public authService = inject(AuthService);

  form = this.fb.group({
    education: [''],
    workplaceOrStudy: [''],
    foreignLanguages: [''],
    birthYear: [null, [Validators.min(1900), Validators.max(new Date().getFullYear())]],

    hasVolunteerExperience: [false],
    volunteerOrganization: [''],
    volunteerPeriod: [''],
    volunteerResponsibilities: [''],

    motivationWhy: [''],
    motivationAttracts: [''],  // Теперь строка

    volunteerDirections: [''],  // Теперь строка

    professionalSkills: [''],
    hobbies: [''],
    computerSkills: [''],
    hasCar: [false],
    drivingLicenseCategory: [''],

    hoursPerMonth: [null, [Validators.min(0)]],
    convenientDays: [''],
    convenientTime: [''],  // Теперь строка

    responsibility: [null, [Validators.min(1), Validators.max(10)]],
    communication: [null, [Validators.min(1), Validators.max(10)]],
    stressResistance: [null, [Validators.min(1), Validators.max(10)]],
    conflictLevel: [null, [Validators.min(1), Validators.max(10)]],

    freeTime: [''],
    lifeMotto: [''],
    additionalComments: ['']
  });

  loading = true;
  saved = false;

  ngOnInit(): void {
    this.loadQuestionnaire();
  }

  loadQuestionnaire() {
    this.loading = true;
    this.http.get<Questionnaire>(`${environment.apiUrl}/questionnaires/me`).subscribe({
      next: (data) => {
        this.form.patchValue(data as any);
        this.loading = false;
      },
      error: () => {
        this.loading = false; // если анкеты нет — форма пустая
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      alert('Заполните все поля');
      return;
    }

    this.loading = true;
    this.http.post<Questionnaire>(`${environment.apiUrl}/questionnaires/me`, this.form.value, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: () => {
        this.saved = true;
        this.loading = false;
        alert('Анкета успешно сохранена!');
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        alert('Ошибка: ' + (err.error?.message || 'Неизвестная ошибка'));
      }
    });
  }
}