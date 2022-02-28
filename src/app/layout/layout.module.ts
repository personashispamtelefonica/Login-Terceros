import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { BaseComponent } from './base/base.component';
import { FooterComponent } from './footer/footer.component';
import { AsideComponent } from './aside/aside.component';

import { UserSectionComponent } from './header/user-section/user-section.component';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { PagesModule } from '../views/pages/pages.module';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    BaseComponent,
    FooterComponent,
    AsideComponent,
    UserSectionComponent,
  ],

  exports: [
    BaseComponent,
    FooterComponent,
    AsideComponent,
    UserSectionComponent,
  ],

  imports: [
    CommonModule,
    LayoutRoutingModule,

    PagesModule,
    NgQrScannerModule,
    MatMenuModule,
    MaterialModule,

  ],
})
export class LayoutModule {}
