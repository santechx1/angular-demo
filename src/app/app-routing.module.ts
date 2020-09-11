import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { AuthComponent } from './auth/auth/auth.component';
const appRoutes: Routes = [
  {
    path: 'c',
    canActivate: [AuthGuard],
    loadChildren: './core/core/core.module#CoreModule'
  },
  {
    path: 'login',
    loadChildren: './auth/local/local.module#LocalModule'
  },
  {
    path: 'login-ad',
    loadChildren: './auth/azure/azure.module#AzureModule'
  },
  {
    path: '',
    component: AuthComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
