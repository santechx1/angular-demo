import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login/login-page.component';
import { SessionExpiredComponent } from './components/session-expired/session-expired.component';
import { AuthGuard } from '../guards/auth.guard';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            component: LoginPageComponent,
        },
        {
            path: 'session-expired',
            canActivate: [AuthGuard],
            component: SessionExpiredComponent,
        },
        {
            path: 'logout',
            component: LogoutComponent,
        },
    ])],
    exports: [RouterModule]
})
export class LocalRoutingModule { }
