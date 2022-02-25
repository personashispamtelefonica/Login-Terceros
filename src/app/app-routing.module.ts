import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';
import { BaseComponent } from './layout/base/base.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./views/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path:'dashboard',
    loadChildren: ()=> import('./layout/layout.module').then((m) => m.LayoutModule),
    canActivate: [ValidarTokenGuard],
  },
  {
    path:'',
    component: BaseComponent,
    children:[
      {
        path: 'user-qr',
        loadChildren: () => import('./views/pages/pages.module').then(m => m.PagesModule)

      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
