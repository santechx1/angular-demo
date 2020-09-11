import { Action } from '@ngrx/store';
import { Credentials } from '../local/models';
import { User } from '../../shared/models';
import { AlertMessage } from '../../shared/models';

export enum AuthActionTypes {
    Login = '[Auth] Login',
    LoginSuccess = '[Auth] Login Success',
    LoginFailure = '[Auth] Login Failure',
    RefreshToken = '[Auth] Refresh Token',
    ClearError = '[Auth] Clear Error',
    ClearCurrentUser = '[Auth] Clear Current User',
    LocalLogout = '[Auth] Local Logout',
    LoginRedirect = '[Auth] Login Redirect',
    DashboardRedirect = '[Auth] Dashboard Redirect',
    SessionExpiredRedirect = '[Auth] Session Expired Redirect',
    LoadClaims = '[Auth] Load Claims',
    LoadClaimsSuccess = '[Auth] Load Claims Success',
    LoadClaimsFailure = '[Auth] Load Claims Failure',
    AzureLogout = '[Auth] Azure Logout'
}
export class Login implements Action {
    readonly type = AuthActionTypes.Login;
    constructor(public payload: Credentials) { }
}
export class LoginSuccess implements Action {
    readonly type = AuthActionTypes.LoginSuccess;
    constructor(public payload: User) { }
}
export class LoginFailure implements Action {
    readonly type = AuthActionTypes.LoginFailure;
    constructor(public payload: AlertMessage) { }
}
export class RefreshToken implements Action {
    readonly type = AuthActionTypes.RefreshToken;
    constructor(public payload: string) { }
}
export class ClearError implements Action {
    readonly type = AuthActionTypes.ClearError;
    constructor() { }
}
export class ClearCurrentUser implements Action {
    readonly type = AuthActionTypes.ClearCurrentUser;
    constructor() { }
}
export class LoginRedirect implements Action {
    readonly type = AuthActionTypes.LoginRedirect;
}
export class DashboardRedirect implements Action {
    readonly type = AuthActionTypes.DashboardRedirect;
}
export class SessionExpiredRedirect implements Action {
    readonly type = AuthActionTypes.SessionExpiredRedirect;
}
export class LocalLogout implements Action {
    readonly type = AuthActionTypes.LocalLogout;
}
export class LoadClaims implements Action {
    readonly type = AuthActionTypes.LoadClaims;
    constructor() { }
}
export class LoadClaimsSuccess implements Action {
    readonly type = AuthActionTypes.LoadClaimsSuccess;
    constructor(public payload: User) { }
}
export class LoadClaimsFailure implements Action {
    readonly type = AuthActionTypes.LoadClaimsFailure;
    constructor() { }
}
export class AzureLogout implements Action {
    readonly type = AuthActionTypes.AzureLogout;
    constructor() { }
}

export type AuthActions =
    | Login
    | LoginSuccess
    | LoginFailure
    | RefreshToken
    | ClearError
    | ClearCurrentUser
    | LoginRedirect
    | DashboardRedirect
    | SessionExpiredRedirect
    | LocalLogout
    | LoadClaimsSuccess
    | LoadClaims
    | AzureLogout;
