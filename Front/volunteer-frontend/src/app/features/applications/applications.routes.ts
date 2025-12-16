import { Routes } from '@angular/router';
import { adminGuard, authGuard } from '../../core/guards/auth.guard';

export const applicationsRoutes: Routes = [
  {
    path: 'my',
    loadComponent: () => import('./my-applications/my-applications.component').then(c => c.MyApplicationsComponent),
    canActivate: [authGuard]  // только авторизованным
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin-applications/admin-applications.component').then(c => c.AdminApplicationsComponent),
    canActivate: [adminGuard]  // только админам
  },
  {
    path: '',
    redirectTo: 'my',
    pathMatch: 'full'
  }
];