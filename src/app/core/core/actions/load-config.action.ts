import { Action } from '@ngrx/store';
import { AlertMessage, Config } from 'src/app/shared/models';

export enum LoadConfigActionTypes {
    Load = '[Application] Config Load',
    LoadSucces = '[Application] Config LoadSucces',
    LoadFailure = '[Application] Config LoadFailure',
    ClearAlert = '[Application] Config Clear Alert'
}
export class Load implements Action {
    readonly type = LoadConfigActionTypes.Load;
    constructor(public resourceRef: string) { }
}

export class LoadSucces implements Action {
    readonly type = LoadConfigActionTypes.LoadSucces;
    constructor(public payload: Config) { }
}

export class LoadFailure implements Action {
    readonly type = LoadConfigActionTypes.LoadFailure;
    constructor(public payload: AlertMessage) { }
}

export class ClearAlert implements Action {
    readonly type = LoadConfigActionTypes.ClearAlert;
    constructor() { }
}

export type LoadConfigActions =
    | Load
    | LoadFailure
    | LoadSucces
    | ClearAlert;
