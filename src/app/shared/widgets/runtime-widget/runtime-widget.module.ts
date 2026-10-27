import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetDirective } from './widget.directive';



@NgModule({
  declarations: [
    WidgetDirective
  ],
  imports: [
    CommonModule
  ]
})
export class RuntimeWidgetModule { }
