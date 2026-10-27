import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeModule } from './views/layout/theme/theme.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ThemeModule,
    BrowserAnimationsModule,
    FormsModule,
    BlockUIModule.forRoot(),
    NgApexchartsModule
  ],
  exports: [],
  //providers: [],
  providers: [
    NgbActiveModal,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
