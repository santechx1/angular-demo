import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { RouterStateUrl } from '../shared/utils/router-state';
import * as fromRouter from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';

import * as fromAuth from '../auth/reducers/auth.reducer';

// Root app State
export interface State {
  auth: fromAuth.State;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}
// Root app reducers
export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  router: fromRouter.routerReducer,
};

// META-REDUCERS
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: [{ auth: ['currentUser'] }], rehydrate: true })(reducer);
}
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
    return reducer(state, action);
  };
}
export const metaReducers: Array<MetaReducer<any, any>> = !environment.production
  ? [localStorageSyncReducer, logger, storeFreeze]
  : [localStorageSyncReducer];


// Root app selectors
export const getAuthState = createFeatureSelector<fromAuth.State>('auth');

export const getCredentials = createSelector(
  getAuthState,
  fromAuth.getCredentials
);
export const getCurrentUser = createSelector(
  getAuthState,
  fromAuth.getCurrentUser
);
export const getLoading = createSelector(
  getAuthState,
  fromAuth.getLoading
);
export const getError = createSelector(
  getAuthState,
  fromAuth.getError
);
