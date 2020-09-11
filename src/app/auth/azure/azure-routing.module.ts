import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginADComponent } from './components/login-ad/login-ad.component';
import { LogoutADComponent } from './components/logout-ad/logout-ad.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            component: LoginADComponent,
        },
        {
            path: 'logout',
            component: LogoutADComponent,
        }
    ])],
    exports: [RouterModule]
})
export class AzureRoutingModule { }
