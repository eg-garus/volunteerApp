import { Routes } from '@angular/router';

export const eventsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/list.component').then(c => c.ListComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./detail/detail.component').then(c => c.DetailComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./form/form.component').then(c => c.FormComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./form/form.component').then(c => c.FormComponent)
  }
];