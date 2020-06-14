import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CreateCountComponent } from './components/create-count/create-count.component';
import { LoginLandingComponent } from './components/login-landing/login-landing.component';
import { DualRegLogComponent } from './components/dual-reg-log/dual-reg-log.component';


const routes: Routes = [
  {
    path:'',
    component: LoginLandingComponent,
    children:[
      {
        path:'login-register',
        component:DualRegLogComponent
      },
      {
        path:'log-in',
        component:LoginComponent
      },
      {
        path:'create-count',
        component:CreateCountComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
