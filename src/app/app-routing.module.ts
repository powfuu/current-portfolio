import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './domain/pages/base/base.component';

const routes: Routes = [
  {
    component: BaseComponent,
    path: '',
  },
  {
    redirectTo: '',
    path: '**',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
