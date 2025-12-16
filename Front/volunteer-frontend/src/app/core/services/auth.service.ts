import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse, CurrentUser, LoginRequest, RegisterRequest } from '../models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<CurrentUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly TOKEN_KEY = 'auth_token';
  private readonly ROLE_KEY = 'user_role';

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  register(user: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, user)
      .pipe(tap(response => this.setSession(response)));
  }

  login(credentials: { login: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => this.setSession(response))
      );
  }

  setSession(authResult: AuthResponse) {
    localStorage.setItem(this.TOKEN_KEY, authResult.token);
    localStorage.setItem(this.ROLE_KEY, authResult.role);

    const login = this.getLoginFromToken(authResult.token);  // ← всегда берём из токена

    this.currentUserSubject.next({
      login: login || 'Неизвестно',  // ← на всякий случай
      role: authResult.role
    });
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getRole(): 'VOLUNTEER' | 'ADMIN' | null {
    return localStorage.getItem(this.ROLE_KEY) as 'VOLUNTEER' | 'ADMIN' | null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  private loadUserFromStorage() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      const login = this.getLoginFromToken(token);
      const role = this.getRole();
      if (role) {
        this.currentUserSubject.next({ login, role });
      }
    }
  }

  // Если нужно извлечь логин из токена (опционально)
  private getLoginFromToken(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub;
    } catch {
      return '';
    }
  }
}