import { Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/auth.guard'; // если есть

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
    path: ':id/edit',
    loadComponent: () => import('./form/form.component').then(c => c.FormComponent),
    canActivate: [adminGuard]
  },
  {
    path: ':eventId/activities/create',
    loadComponent: () => import('./activity-form/activity-form.component').then(c => c.ActivityFormComponent),
    canActivate: [adminGuard]
  },
  {
    path: ':eventId/activities/:activityId/edit',
    loadComponent: () => import('./activity-form/activity-form.component').then(c => c.ActivityFormComponent),
    canActivate: [adminGuard]
  }
];