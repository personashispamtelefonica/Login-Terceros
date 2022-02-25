import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './guards/no-auth.guard';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./views/auth/auth.module').then((m) => m.AuthModule),
    canActivate:[NoAuthGuard]
  },
  {
    path:'dashboard',
    loadChildren: ()=> import('./layout/layout.module').then((m) => m.LayoutModule),
    canActivate: [ValidarTokenGuard],
  },

  {path: '**',pathMatch:'full' ,redirectTo: '/dashboard'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
