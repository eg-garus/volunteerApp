import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
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
    MatSelectModule,
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

    hasVolunteerExperience: [false],
    volunteerOrganization: [''],
    volunteerPeriod: [''],
    volunteerResponsibilities: [''],

    motivationWhy: [''],
    motivationAttracts: [[] as string[]],

    volunteerDirections: [[] as string[]],

    professionalSkills: [''],
    hobbies: [''],
    computerSkills: [''],
    hasCar: [false],
    drivingLicenseCategory: [''],

    hoursPerMonth: [null, [Validators.min(0)]],
    convenientDays: [''],
    convenientTime: [[] as string[]],

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

  // Списки для множественного выбора
  motivationOptions = [
    'Получение нового опыта',
    'Встречи с новыми людьми',
    'Возможность помочь другим',
    'Вклад в общее дело',
    'Новые интересы',
    'Открытие для себя новых сфер'
  ];

  directionOptions = [
    'Помощь детям-сиротам',
    'Поддержка больных детей',
    'Работа с пожилыми людьми',
    'Помощь бездомным',
    'Поддержка людей с инвалидностью',
    'Экологические проекты',
    'Культурные и творческие инициативы',
    'Зооволонтёрство (помощь приютам для животных)'
  ];

  timeOptions = ['Утро', 'День', 'Вечер'];

  ngOnInit(): void {
    this.loadQuestionnaire();
  }

  loadQuestionnaire() {
    this.loading = true;
    this.http.get<Questionnaire>(`${environment.apiUrl}/questionnaires/me`).subscribe({
      next: (data) => {
        this.form.patchValue(data as any);  // ← вот так, игнорируем строгую типизацию
        this.loading = false;
      },
      error: () => {
        this.loading = false; // если анкеты нет — оставляем форму пустой
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      alert('Заполните обязательные поля');
      return;
    }

    this.loading = true;
    this.http.post<Questionnaire>(`${environment.apiUrl}/questionnaires/me`, this.form.value).subscribe({
      next: () => {
        this.saved = true;
        this.loading = false;
        alert('Анкета успешно сохранена!');
      },
      error: (err) => {
        this.loading = false;
        alert(err.error?.message || 'Ошибка сохранения анкеты');
      }
    });
  }

  onMotivationChange(event: any) {
    const attracts = (this.form.get('motivationAttracts')?.value || []) as string[];
    if (event.checked) {
      attracts.push(event.source.value);
    } else {
      const index = attracts.indexOf(event.source.value);
      if (index > -1) attracts.splice(index, 1);
    }
    this.form.get('motivationAttracts')?.setValue(attracts);
  }

  onDirectionChange(event: any) {
    const directions = (this.form.get('volunteerDirections')?.value || []) as string[];
    if (event.checked) {
      directions.push(event.source.value);
    } else {
      const index = directions.indexOf(event.source.value);
      if (index > -1) directions.splice(index, 1);
    }
    this.form.get('volunteerDirections')?.setValue(directions);
  }

  onTimeChange(event: any) {
    const time = (this.form.get('convenientTime')?.value || []) as string[];
    if (event.checked) {
      time.push(event.source.value);
    } else {
      const index = time.indexOf(event.source.value);
      if (index > -1) time.splice(index, 1);
    }
    this.form.get('convenientTime')?.setValue(time);
  }
}