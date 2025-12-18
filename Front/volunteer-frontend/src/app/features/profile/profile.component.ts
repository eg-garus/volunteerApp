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

interface UserProfile {
  id: number;
  login: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone?: string;
  birthYear?: number;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
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
    birthYear: [null as number | null]
    });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

    loadProfile() {
    this.http.get<UserProfile>(`${environment.apiUrl}/profile`).subscribe({
        next: (user) => {
        this.profileForm.patchValue({
            ...user,
            birthYear: user.birthYear ?? null  // ← на всякий случай
        });
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