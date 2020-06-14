import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatStepperModule, } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {TableModule} from 'primeng/table';
import {TreeTableModule} from 'primeng/treetable';

@NgModule({
  exports: [
    TranslateModule,
    NgbCarouselModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSliderModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatIconModule,
    TableModule,
    TreeTableModule
  ]
})
export class SharedModule { }
