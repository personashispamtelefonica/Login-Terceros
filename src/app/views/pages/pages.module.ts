import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { UsersQrComponent } from './users-qr/users-qr.component';
import { MatIconModule } from '@angular/material/icon';
import { NgQrScannerModule } from 'angular2-qrscanner';

@NgModule({
  declarations: [
    UsersQrComponent,
  ],

  imports: [
    CommonModule,
    PagesRoutingModule,

    MatIconModule,
    NgQrScannerModule
  ],

  exports:[
    UsersQrComponent
  ]
})
export class PagesModule { }
