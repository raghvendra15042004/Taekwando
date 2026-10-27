import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WidetTemplateComponent } from './widet-template/widet-template.component';

import { TabModule } from './tab/tab.module';



@NgModule({
  declarations: [WidetTemplateComponent],
  imports: [
    CommonModule,
    FormsModule,
    TabModule
  ],
  exports: [
    WidetTemplateComponent,
    TabModule
  ]
})
export class WidgetsModule { }
