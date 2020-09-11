import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreComponent } from './components/core/core.component';
import { ResourceGuard } from './guards/resource.guard';

const routes: Routes = [
    {
        path: '',
        component: CoreComponent,
        canActivateChild: [ResourceGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: '../dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'module1',
                loadChildren: '../module1/module1.module#Module1Module'
            },
            {
                path: 'module2',
                loadChildren: '../module2/module2.module#Module2Module'
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }
