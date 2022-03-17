import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalUsersComponent } from './modal-users/modal-users.component';



@NgModule({
  declarations: [
    ModalUsersComponent,
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
  ],

  entryComponents: [ModalUsersComponent],

})
export class ComponentsModule { }
