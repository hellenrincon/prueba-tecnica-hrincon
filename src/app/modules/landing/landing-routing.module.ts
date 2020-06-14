import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';


const routesLanding: Routes = [
  {
    path:'landing-page', 
    component:LayoutComponent,
    children:[
      {
        path: '', loadChildren: () => import('./../request/request-routing.module').then(m => m.RequestRoutingModule)
      }
    ]
  },
  {
    path:'steppers-request', 
    component:LayoutComponent,
    children:[
      {
        path: 'steppers', loadChildren: () => import('./../request/request-routing.module').then(m => m.RequestRoutingModule)
      }
    ]
  },
  {
    path:'general', 
    component:LayoutComponent,
    canActivateChild: [AuthGuard],
    children:[
      {
        path: '', loadChildren: () => import('./../general/general.module').then(m => m.GeneralModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesLanding)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
