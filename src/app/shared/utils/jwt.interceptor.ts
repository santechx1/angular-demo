import {
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as auth from '../../auth/actions/auth.actions';
import { User } from '../models';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    user: Observable<User>;
    subscription: Subscription;
    token: string = null;
    helper = new JwtHelperService();

    constructor(private store: Store<fromRoot.State>) {
        this.user = store.pipe(select(fromRoot.getCurrentUser));
        this.subscription = this.user.subscribe(u => this.token = u ? u.token : null);
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url === 'api/auth/claims') {
            const id_token = localStorage.getItem('id_token');
            if (id_token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${id_token}`
                    }
                });
            }

        } else {
            let skip = false;
            if (request.url.startsWith('http')) {
                const url = new URL(request.url);
                if (url.hostname === '127.0.0.1') {
                    skip = true;
                }
            }
            if (!skip && this.token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
            }
        }
        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                const refreshToken = event.headers.get('RefreshToken');
                if (refreshToken) {
                    if (this.token && refreshToken) {
                        this.store.dispatch(new auth.RefreshToken(refreshToken));
                    }
                }
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    if (this.token) {
                        const expDate: Date = this.helper.getTokenExpirationDate(this.token);
                        const limit = expDate.getTime() + 3600000;
                        if (limit < Date.now()) {
                            this.store.dispatch(new auth.LoginRedirect());
                        } else {
                            this.store.dispatch(new auth.SessionExpiredRedirect());
                        }
                    } else {
                        this.store.dispatch(new auth.LoginRedirect());
                    }
                }
            }
        }));
    }
}

export const JwtInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true,
};
