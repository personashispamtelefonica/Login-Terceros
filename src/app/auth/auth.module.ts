import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
            MainComponent,
            LoginComponent,
          ],

  imports: [
            CommonModule,
            AuthRoutingModule,
            ReactiveFormsModule,

            MatIconModule
          ],
})
export class AuthModule {}
