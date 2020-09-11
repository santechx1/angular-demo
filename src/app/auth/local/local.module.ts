import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './components/login/login-page.component';
import { LoginFormComponent } from './forms/login-form.component';
import { LocalRoutingModule } from './local-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material';
import { SessionExpiredComponent } from './components/session-expired/session-expired.component';
import { SharedModule } from '../../shared';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    LocalRoutingModule,
    SharedModule
  ],
  declarations: [
    LoginPageComponent,
    LoginFormComponent,
    SessionExpiredComponent,
    LogoutComponent
  ]
})
export class LocalModule { }
