import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadConfigActionTypes, Load, LoadSucces, LoadFailure } from '../actions/load-config.action';
import { CoreService } from '../services/core.service';


@Injectable()
export class LoadConfigEffects {
    @Effect()
    getConfig$: Observable<Action> = this.action$.pipe(
        ofType<Load>(LoadConfigActionTypes.Load),
        switchMap(action => {
            return this.coreService
                .getConfig(action.instName).pipe(
                    map(config => new LoadSucces( config)),
                    catchError(error => {
                        if (error instanceof HttpErrorResponse) {
                            return of(new LoadFailure({ type: 'danger', text: error.error }));
                        } else {
                            return of(new LoadFailure({ type: 'danger', text: error }));
                        }
                    })
                );
        })
    );

    constructor(
        private action$: Actions,
        private coreService: CoreService
    ) { }
}
