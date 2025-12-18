import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(r => r.authRoutes)
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.component').then(c => c.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'events',
    loadChildren: () => import('./features/events/events.routes').then(r => r.eventsRoutes)
  },
  {
    path: 'applications',
    loadChildren: () => import('./features/applications/applications.routes').then(r => r.applicationsRoutes)
  },
  {
    path: '**',
    redirectTo: '/events'
  }
];