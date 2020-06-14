import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeadComponent } from './components/head/head.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule, TranslateLoader, TranslateCompiler, TranslateParser, MissingTranslationHandler } from '@ngx-translate/core';
import { BaseComponent } from './components/base/base.component';


@NgModule({
  declarations: [HeadComponent, FooterComponent, LayoutComponent, BaseComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    TranslateModule.forRoot()
  ],exports:[
    HeadComponent, FooterComponent, LayoutComponent, BaseComponent
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LandingModule { }
