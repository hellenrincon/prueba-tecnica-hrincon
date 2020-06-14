import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { CreateCountComponent } from './components/create-count/create-count.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { LoginLandingComponent } from './components/login-landing/login-landing.component';
import { DualRegLogComponent } from './components/dual-reg-log/dual-reg-log.component';


@NgModule({
  declarations: [CreateCountComponent, LoginComponent, LoginLandingComponent, DualRegLogComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule
  ]
})
export class AuthenticationModule { }
