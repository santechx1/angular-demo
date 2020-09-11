import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap, map, catchError } from 'rxjs/operators';
import { MenuLoad, MenuActionTypes, MenuLoadSuccess, MenuLoadFailure } from '../actions/menu.action';
import { MenuResource, RoleType } from '../../../shared/models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CoreEffects {
    @Effect()
    loadMenu$: Observable<Action> = this.actions$.pipe(
        ofType<MenuLoad>(MenuActionTypes.Load),
        switchMap(() => {
            return this.http.get('api/dashboard')
                .pipe(
                    map(success => {
                        const res = (<any[]>success).map(s => <MenuResource>{ name: s.name, type: s.type, entityRef: s.entityRef, roles: s.roles.map(r => RoleType[r]) });
                        return new MenuLoadSuccess(res);
                    }),
                    catchError(err => {
                        if (err instanceof HttpErrorResponse) {
                            return of(new MenuLoadFailure(err.message == null ? 'error' : err.message));
                        } else {
                            return of(new MenuLoadFailure(err));
                        }
                    })
                );

        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient
    ) { }
}
