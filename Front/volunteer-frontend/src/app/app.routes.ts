import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { ViewQuestionnaireComponent } from './features/questionnaire/view/view.component';

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
  path: 'questionnaire',
  loadComponent: () => import('./features/questionnaire/questionnaire-form/questionnaire-form.component').then(c => c.QuestionnaireFormComponent),
  canActivate: [authGuard]
  },
  { path: 'questionnaire/view/:userId', component: ViewQuestionnaireComponent },
  {
    path: 'events/create',
    loadComponent: () => import('./features/events/form/form.component').then(r => r.FormComponent)
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