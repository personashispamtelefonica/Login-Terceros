import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { BaseComponent } from './base/base.component';
import { FooterComponent } from './footer/footer.component';

import { UserSectionComponent } from './user-section/user-section.component';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { PagesModule } from '../views/pages/pages.module';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialModule } from '../material/material.module';
import { MainComponent } from './main/main.component';
import { PagesComponent } from './pages/pages.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  declarations: [
    BaseComponent,
    FooterComponent,
    UserSectionComponent,
    MainComponent,
    PagesComponent,
    HeaderComponent,
    SidebarComponent,
  ],

  exports: [
    BaseComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    UserSectionComponent,
    MainComponent,
  ],

  imports: [
    CommonModule,
    LayoutRoutingModule,

    PagesModule,
    NgQrScannerModule,
    MatMenuModule,
    MaterialModule,
    BlockUIModule.forRoot(),


  ],
})
export class LayoutModule {}
