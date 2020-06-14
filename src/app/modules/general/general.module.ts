import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { UsersComponent } from './components/reports/users/users.component';
import { SharedModule } from '../shared/shared.module';
import { GeneralComponent } from './components/reports/general/general.component';
import { HistoryRequestComponent } from './components/reports/history-request/history-request.component';

@NgModule({
  declarations: [UsersComponent, GeneralComponent, HistoryRequestComponent],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    SharedModule
  ]
})
export class GeneralModule { }
