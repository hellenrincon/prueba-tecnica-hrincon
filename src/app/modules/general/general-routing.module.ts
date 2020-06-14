import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/reports/users/users.component';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { GeneralComponent } from './components/reports/general/general.component';
import { HistoryRequestComponent } from './components/reports/history-request/history-request.component';


const routes: Routes = [
  {
    path: 'reports',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'general',
        component: GeneralComponent
      },
      {
        path: 'history-request',
        component: HistoryRequestComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }
