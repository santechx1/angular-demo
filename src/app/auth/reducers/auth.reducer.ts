import { AuthActions, AuthActionTypes } from '../actions/auth.actions';
import { Credentials } from '../local/models';
import { User } from '../../shared/models';
import { AlertMessage } from '../../shared/models';

export interface State {
    credentials: Credentials;
    currentUser: User;
    loading: boolean;
    error: AlertMessage;
}

export const initialState: State = {
    credentials: null,
    currentUser: null,
    loading: false,
    error: null,
};

export function reducer(state = initialState, action: AuthActions): State {
    switch (action.type) {
        case AuthActionTypes.Login: {
            return {
                ...state,
                loading: true,
                error: null,
                credentials: action.payload,
                currentUser: null
            };
        }
        case AuthActionTypes.LoginSuccess: {
            return {
                ...state,
                loading: false,
                error: null,
                credentials: null,
                currentUser: action.payload
            };
        }
        case AuthActionTypes.LoginFailure: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                credentials: null,
                currentUser: null
            };
        }
        case AuthActionTypes.LoadClaimsSuccess: {
            return {
                ...state,
                currentUser: action.payload
            };
        }
        case AuthActionTypes.RefreshToken: {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    token: action.payload
                }
            };
        }
        case AuthActionTypes.ClearError: {
            return {
                ...state,
                error: null
            };
        }
        case AuthActionTypes.ClearCurrentUser: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}

export const getCredentials = (state: State) => state.credentials;
export const getCurrentUser = (state: State) => state.currentUser;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
