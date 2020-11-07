import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { AnonymousGuard } from './guards/anonymous/anonymous.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
        canActivate: [AnonymousGuard],
      },
      {
        path: 'login',
        component: NbLoginComponent,
        canActivate: [AnonymousGuard],
      },
      {
        path: 'register',
        component: NbRegisterComponent,
        canActivate: [AnonymousGuard],
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
        canActivate: [AnonymousGuard],
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
        canActivate: [AnonymousGuard],
      },
    ],
  },
  {
    path: 'sensing-nodes-monitoring',
    loadChildren: () => import('./sensing-nodes/sensing-nodes.module').then(m => m.SensingNodesModule),
  },
  {
    path: 'readings',
    loadChildren: () => import('./readings/readings.module').then(m => m.ReadingsModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sensing-nodes-monitoring',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
