import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalUsersComponent } from './modal-users/modal-users.component';
import { ModalCompaniesComponent } from './modal-companies/modal-companies.component';



@NgModule({
  declarations: [
    ModalUsersComponent,
    ModalCompaniesComponent
  ],

  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
  ],

  exports:[
    ModalUsersComponent,
    ModalCompaniesComponent
  ],

  entryComponents: [ModalUsersComponent,ModalCompaniesComponent],

})
export class ComponentsModule { }
