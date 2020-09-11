import { MenuResource } from '../../../shared/models';
import { MenuActions, MenuActionTypes } from '../actions/menu.action';

export interface State {
    menu: MenuResource[];
    loading: boolean;
    error: string;
}
export const initialState: State = {
    menu: null,
    loading: false,
    error: null
};

export function reducer(state = initialState, action: MenuActions): State {
    switch (action.type) {
        case MenuActionTypes.Load: {
            return {
                ...state,
                loading: true,
                error: null
            };
        }
        case MenuActionTypes.LoadSuccess: {
            return {
                ...state,
                loading: false,
                menu: action.payload,
                error: null
            };
        }
        case MenuActionTypes.LoadFailure: {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }
        default: {
            return state;
        }
    }
}
