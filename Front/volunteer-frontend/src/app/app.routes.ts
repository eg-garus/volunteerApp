import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/activities',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(r => r.authRoutes)
  },
  {
    path: 'activities',
    loadChildren: () => import('./features/activities/activities.routes').then(r => r.activitiesRoutes)
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
    redirectTo: '/activities'
  }
];