//Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Component
import { DashboardComponent } from './dashboard/dashboard.component';
import { TieSheetComponent } from './tie-sheet/tie-sheet.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'custom/tie-sheet',
        component: TieSheetComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomRoutingModule { }
