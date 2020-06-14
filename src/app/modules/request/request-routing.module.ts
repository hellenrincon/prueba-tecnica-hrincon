import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StepsComponent } from './components/steppers/steps/steps.component';
import { QuantityComponent } from './components/quantity/quantity.component';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'start-steps',
    component: StepsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'quantity',
    component: QuantityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
