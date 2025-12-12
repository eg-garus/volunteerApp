import { Routes } from '@angular/router';

export const applicationsRoutes: Routes = [
  {
    path: 'my',
    loadComponent: () => import('./my-applications/my-applications.component').then(c => c.MyApplicationsComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin-applications/admin-applications.component').then(c => c.AdminApplicationsComponent)
  }
];