import { AlertMessage } from 'src/app/shared/models';
import { LoadConfigActions, LoadConfigActionTypes } from '../actions/load-config.action';
import { Config } from 'src/app/shared/models/config';

export interface State {
    config: Config;
    loading: boolean;
    alert: AlertMessage;
}

export const initialState: State = {
    config: null,
    loading: false,
    alert: null
};

export function reducer(state = initialState, action: LoadConfigActions): State {
    switch (action.type) {
        case LoadConfigActionTypes.Load: {
            return {
                ...state,
                config: null,
                loading: true,
                alert: null
            };
        }
        case LoadConfigActionTypes.LoadSucces: {
            return {
                ...state,
                config: action.payload,
                loading: false,
                alert: null
            };
        }
        case LoadConfigActionTypes.LoadFailure: {
            return {
                ...state,
                config: null,
                loading: false,
                alert: action.payload
            };
        }
        case LoadConfigActionTypes.ClearAlert: {
            return {
                ...state,
                alert: null
            };
        }
        default: {
            return state;
        }
    }
}

export const getConfig = (state: State) => state.config;
export const getLoading = (state: State) => state.loading;
export const getAlert = (state: State) => state.alert;