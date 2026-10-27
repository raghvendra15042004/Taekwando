import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base/base.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AsideComponent } from './aside/aside.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [BaseComponent, HeaderComponent, FooterComponent, AsideComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BaseComponent
  ]
})
export class ThemeModule { }
