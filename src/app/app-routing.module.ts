import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/theme/base/base.component';
import { AuthGuard } from './core/services/auth/auth.guard';


const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'auth',
  //   pathMatch: 'full'
  // },
  { 
    path: 'auth', 
    loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule) 
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'feature',
        component: BaseComponent,
        loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
      },
      {
        path: './custom/tie-sheet',
        component: BaseComponent,
        loadChildren: () => import('./custom/custom.module').then(m => m.CustomModule)
      },
      {
        path: '',
        component: BaseComponent,
        loadChildren: () => import('./custom/custom.module').then(m => m.CustomModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
