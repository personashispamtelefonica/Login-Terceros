import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { BaseComponent } from './base/base.component';
import { FooterComponent } from './footer/footer.component';
import { AsideComponent } from './aside/aside.component';
import { HeaderComponent } from './header/header.component';

import { UserSectionComponent } from './header/user-section/user-section.component';
import { MatIconModule } from '@angular/material/icon';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { PagesModule } from '../views/pages/pages.module';
import { MatMenuModule } from '@angular/material/menu';
import { MenuMobileComponent } from './header/menu-mobile/menu-mobile.component';

@NgModule({
  declarations: [
    BaseComponent,
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    UserSectionComponent,
    MenuMobileComponent,
  ],

  exports: [
    BaseComponent,
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    UserSectionComponent,
  ],

  imports: [
    CommonModule,
    LayoutRoutingModule,

    PagesModule,

    NgQrScannerModule,

    MatIconModule,
    MatMenuModule,
  ],
})
export class LayoutModule {}
