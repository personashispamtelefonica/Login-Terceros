import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,

    children: [
      { path: 'inicio', component: MainComponent },
      { path: '**', redirectTo: 'inicio' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}

