import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomRoutingModule } from './custom-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { TieSheetComponent } from './tie-sheet/tie-sheet.component'
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { WidgetsModule } from '../shared/widgets/widgets.module';
import { BlockUIModule } from 'ng-block-ui';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [DashboardComponent, TieSheetComponent],
  imports: [
    CommonModule,
    CustomRoutingModule,
    MatTableModule,
    NgbModule,
    FormsModule,
    WidgetsModule,
    BlockUIModule.forRoot(),
    NgApexchartsModule
  ],
  providers: [
    NgbActiveModal,
  ],
})
export class CustomModule { }
