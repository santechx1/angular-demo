import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { tap, switchMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
    AuthActionTypes,
    Login,
    LoginFailure,
    LoginSuccess,
    LoginRedirect,
    SessionExpiredRedirect,
    LoadClaims,
    LoadClaimsSuccess,
    LoadClaimsFailure,
    AzureLogout,
    LocalLogout,
    DashboardRedirect
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
    @Effect()
    login$: Observable<Action> = this.actions$.pipe(
        ofType<Login>(AuthActionTypes.Login),
        switchMap(action => {
            return this._authService.authenticate(action.payload).pipe(
                map(success => new LoginSuccess(success)),
                catchError(err => {
                    if (err instanceof HttpErrorResponse) {
                        return of(new LoginFailure({ type: 'danger', text: err.error }));
                    } else {
                        return of(new LoginFailure({ type: 'danger', text: err }));
                    }
                })
            );
        })
    );
    @Effect({ dispatch: false })
    loginSuccess$: Observable<Action> = this.actions$.pipe(
        ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
        tap(() => this.router.navigate(['/c/dashboard']))
    );
    @Effect({ dispatch: false })
    loginRedirect$: Observable<Action> = this.actions$.pipe(
        ofType<LoginRedirect>(AuthActionTypes.LoginRedirect),
        tap(() => {
            this.router.navigate(['/']);
        })
    );
    @Effect({ dispatch: false })
    dashboardRedirect$: Observable<Action> = this.actions$.pipe(
        ofType<DashboardRedirect>(AuthActionTypes.DashboardRedirect),
        tap(() => {
            this.router.navigate(['/c/dashboard']);
        })
    );
    @Effect({ dispatch: false })
    sessionExpiredRedirect$: Observable<Action> = this.actions$.pipe(
        ofType<SessionExpiredRedirect>(AuthActionTypes.SessionExpiredRedirect),
        tap(() => this.router.navigate(['/login/session-expired']))
    );
    @Effect()
    loadClaims$: Observable<Action> = this.actions$.pipe(
        ofType<LoadClaims>(AuthActionTypes.LoadClaims),
        switchMap(action => {
            return this._authService.getClaims().pipe(
                map(success => {
                    return new LoadClaimsSuccess(success);
                }),
                catchError(err => {
                    if (err instanceof HttpErrorResponse) {
                        return of(new LoadClaimsFailure());
                    } else {
                        return of(new LoadClaimsFailure());
                    }
                })
            );
        })
    );
    @Effect({ dispatch: false })
    loadClaimsSuccess$: Observable<Action> = this.actions$.pipe(
        ofType<LoadClaimsSuccess>(AuthActionTypes.LoadClaimsSuccess),
        tap(() => this.router.navigate(['/c/dashboard']))
    );
    @Effect({ dispatch: false })
    loadClaimsFailure$: Observable<Action> = this.actions$.pipe(
        ofType<LoadClaimsFailure>(AuthActionTypes.LoadClaimsFailure),
        tap(() => {
            localStorage.removeItem('azureLoggedIn');
            localStorage.removeItem('id_token');
            this.router.navigate(['/']);
        })
    );
    @Effect({ dispatch: false })
    localLogout$: Observable<Action> = this.actions$.pipe(
        ofType<LocalLogout>(AuthActionTypes.LocalLogout),
        tap(() => {
            this.router.navigate(['/login/logout']);
        })
    );
    @Effect({ dispatch: false })
    azureLogout$: Observable<Action> = this.actions$.pipe(
        ofType<AzureLogout>(AuthActionTypes.AzureLogout),
        tap(() => {
            this.router.navigate(['/login-ad/logout']);
        })
    );

    constructor(
        private actions$: Actions,
        private router: Router,
        private _authService: AuthService
    ) { }
}
