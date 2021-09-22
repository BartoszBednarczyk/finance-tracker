import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsSignedInGuard } from './shared/guards/is-signed-in.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [IsSignedInGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
