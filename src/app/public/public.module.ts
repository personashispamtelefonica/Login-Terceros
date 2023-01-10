import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { MaterialModule } from '../material/material.module';
import { PublicComponent } from './validate-qr/public.component';
import { LayoutModule } from '../layout/layout.module';


@NgModule({
  declarations: [
    PublicComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    LayoutModule,
    MaterialModule
  ]
})
export class PublicModule { }
