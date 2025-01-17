import { Routes } from '@angular/router';
import {RouterUrl} from './core/enums/routes.enum';

export const routes: Routes = [
  {
    path: RouterUrl.HOME,
    loadComponent: () => import('./containers/home/home.component').then(c => c.HomeComponent),
  },
  {
    path: RouterUrl.QUIZ,
    loadComponent: () => import('./containers/quiz/quiz.component').then(c => c.QuizComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./shared/components/quiz-info/quiz-info.component').then(c => c.QuizInfoComponent),
      },
      {
        path: `${RouterUrl.QUIZ_ASK}/:category`,
        loadComponent: () => import('./shared/components/quiz-ask/quiz-ask.component').then(c => c.QuizAskComponent),
      },

    ]
  },
  {
    path: RouterUrl.NOT_FOUND,
    loadComponent: () => import('./containers/not-found/not-found.component').then(c => c.NotFoundComponent)
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];
