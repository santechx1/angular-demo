import { Action } from '@ngrx/store';
import { MenuResource } from '../../../shared/models';

export enum MenuActionTypes {
    Load = '[Core] Menu Load',
    LoadSuccess = '[Core] Menu Success',
    LoadFailure = '[Core] Menu Failure',
}
export class MenuLoad implements Action {
    readonly type = MenuActionTypes.Load;
    constructor() { }
}
export class MenuLoadSuccess implements Action {
    readonly type = MenuActionTypes.LoadSuccess;
    constructor(public payload: MenuResource[]) { }
}
export class MenuLoadFailure implements Action {
    readonly type = MenuActionTypes.LoadFailure;
    constructor(public payload: string) { }
}

export type MenuActions = MenuLoad | MenuLoadSuccess | MenuLoadFailure;
