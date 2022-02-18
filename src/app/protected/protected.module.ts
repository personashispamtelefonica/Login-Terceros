import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { QRCodeModule } from 'angular2-qrcode';
import { NgQrScannerModule } from 'angular2-qrscanner';


import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    NgQrScannerModule,

    MatIconModule,

  ]
})
export class ProtectedModule { }
