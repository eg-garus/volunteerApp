import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatIcon } from "@angular/material/icon";

interface UserProfile {
  id: number;
  login: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone?: string;
  birthYear?: number;
  languages?: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon
],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
    profileForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    middleName: [''],
    phone: [''],
    birthYear: [null as number | null],
    languages: ['']
    });
loading: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  private loadProfile() {
    this.loading = true;

    this.http.get<UserProfile>(`${environment.apiUrl}/profile`).subscribe({
      next: (user) => {
        this.profileForm.patchValue({
          email: user.email || '',
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          middleName: user.middleName || '',
          phone: user.phone || '',
          birthYear: user.birthYear ?? null,           // если null или undefined — null
          languages: user.languages || ''              // если null — пустая строка
        });

        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error('Ошибка загрузки профиля:', err);
        alert('Не удалось загрузить данные профиля. Попробуйте позже.');
      }
    });
  }

  onSubmit() {
    if (this.profileForm.invalid) return;

    this.http.put<UserProfile>(`${environment.apiUrl}/profile`, this.profileForm.value).subscribe({
      next: () => {
        alert('Профиль успешно обновлён!');
      },
      error: (err) => {
        alert('Ошибка при обновлении профиля');
      }
    });
  }
}