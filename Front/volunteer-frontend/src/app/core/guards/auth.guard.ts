import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';  // ← добавь UrlTree в импорт
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/auth/login']);  // ← возвращай UrlTree
};

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true;
  }

  return router.createUrlTree(['/events']);  // ← возвращай UrlTree
};