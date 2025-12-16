export interface LoginRequest {
  login: string;
  password: string;
}

export interface RegisterRequest {
  login: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  role: 'VOLUNTEER' | 'ADMIN';
}

export interface CurrentUser {
  login: string;
  role: 'VOLUNTEER' | 'ADMIN';
}