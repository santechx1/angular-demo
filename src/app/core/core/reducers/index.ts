import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
} from '@ngrx/store';
import * as fromMenu from './menu.reducer';
import * as fromRoot from '../../../reducers';
import * as fromLoadConfig from './load-config.reducer';

export interface CoreState {
    menu: fromMenu.State;
    loadConfig: fromLoadConfig.State;
}
export interface State extends fromRoot.State {
    core: CoreState;
}
export const reducers: ActionReducerMap<CoreState> = {
    menu: fromMenu.reducer,
    loadConfig: fromLoadConfig.reducer
};

export const getCoreState = createFeatureSelector<CoreState>('core');
/* MENU */
export const getMenuState = createSelector(
    getCoreState,
    (state: CoreState) => (!!state) ? state.menu : null
);

// Load config
export const getLoadConfigState = createSelector(
    getCoreState,
    (state: CoreState) => state.loadConfig
);

export const getLoadConfig = createSelector(
    getLoadConfigState,
    fromLoadConfig.getConfig
);
export const getLoadConfigLoading = createSelector(
    getLoadConfigState,
    fromLoadConfig.getLoading
);
export const getLoadConfigAlert = createSelector(
    getLoadConfigState,
    fromLoadConfig.getAlert
);