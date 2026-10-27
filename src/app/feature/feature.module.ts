import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { ThreadComponent } from './thread/thread.component';
import { WidgetsModule } from '../shared/widgets/widgets.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubMenuListComponent } from '../shared/sub-menu-list/sub-menu-list.component';
import { BlockUIModule } from 'ng-block-ui';
import { FormsComponent } from './forms/forms.component';
import { GridViewComponent } from './grid-view/grid-view.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { CertificateComponent } from './certificate/certificate.component';
import { IdCardComponent } from './id-card/id-card.component';
import { IdCardPreviewComponent } from './id-card/id-card-preview/id-card-preview.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':boxId/inbox/:inboxId',
        component: InboxComponent
      },
      {
        path: ':boxId/inbox/:inboxId/newthreads',
        component: ThreadComponent
      },
      {
        path: ':boxId/inbox/:inboxId/view/:threadId',
        component: GridViewComponent,
        data: { viewOnlyStatus: true }
      },
      {
        path: ':boxId/inbox/:inboxId/edit/:threadId',
        component: ThreadComponent
      },
      {
        path: ':boxId/forms/:inboxId',
        component: FormsComponent
      },
      {
        path: 'registration-form/:threadId',
        component: RegistrationFormComponent
      },
      {
        path: 'certificate/:certificateId',
        component: CertificateComponent
      },
      {
        path: 'id-card',
        component: IdCardComponent
      },
      {
        path: 'id-card-preview/:id',
        component: IdCardPreviewComponent
      }      
    ]
  }
]

@NgModule({
  declarations: [InboxComponent, ThreadComponent, SubMenuListComponent, FormsComponent, GridViewComponent, RegistrationFormComponent, CertificateComponent, IdCardComponent, IdCardPreviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetsModule,
    FormsModule,
    NgbModule,
    BlockUIModule.forRoot(),
  ],
  exports: [RouterModule]
})
export class FeatureModule { }
