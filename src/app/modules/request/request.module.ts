import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { HomeComponent } from './components/home/home.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { QuantityComponent } from './components/quantity/quantity.component';
import { StepQuantityComponent } from './components/steppers/step-quantity/step-quantity.component';
import { StepDataUserComponent } from './components/steppers/step-data-user/step-data-user.component';
import { StepsComponent } from './components/steppers/steps/steps.component';
import { StepSummaryComponent } from './components/steppers/step-summary/step-summary.component';

@NgModule({
  declarations: [HomeComponent, QuantityComponent, StepQuantityComponent, StepDataUserComponent, StepsComponent, StepSummaryComponent],
  imports: [
    CommonModule,
    RequestRoutingModule,
    SharedModule,

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class RequestModule { }
