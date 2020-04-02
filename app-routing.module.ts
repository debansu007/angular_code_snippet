import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { PublicGuardGuard } from './guard/public-guard.guard';

const routes: Routes = [
  {
    path: 'pages',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import('../app/pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    canActivate: [PublicGuardGuard],
    loadChildren: () => import('../app/auth/auth.module')
      .then(m => m.NgxAuthModule),
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
