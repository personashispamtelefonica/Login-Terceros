import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { MainComponent } from './main/main.component';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,

    children: [
      { path: 'inicio', component: MainComponent },
      { path: 'usuarios', component: UsuariosListComponent },
      { path: 'company', component: CompanyListComponent },
      { path: '**', redirectTo: 'inicio' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
