import { Routes } from '@angular/router';
import { BaseComponent } from './domain/pages/base/base.component';

export const appRoutes: Routes = [
  {
    component: BaseComponent,
    path: '',
  },
  {
    redirectTo: '',
    path: '**',
  },
];
