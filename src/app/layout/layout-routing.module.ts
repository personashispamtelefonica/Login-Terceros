import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { CompanyListComponent } from './mantenimiento/company-list/company-list.component';
import { MainComponent } from './main/main.component';
import { UserSurveyComponent } from './user-survey/user-survey.component';
import { UsuariosListComponent } from './mantenimiento/usuarios-list/usuarios-list.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,

    children: [
      { path: 'inicio', component: MainComponent },
      { path: 'usuarios', component: UsuariosListComponent },
      { path: 'company', component: CompanyListComponent },
      { path: 'encuesta', component: UserSurveyComponent },
      { path: '**', redirectTo: 'inicio' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
