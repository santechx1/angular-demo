import { Login, LoginSuccess, LoginFailure, ClearError, RefreshToken, Logout } from '../actions/auth.actions';
import * as fromAuth from './auth.reducer';
import { Credentials } from '../models';
import { User, AlertMessage } from '../../shared/models';

describe('Auth Reducer', () => {

    describe('Login', () => {
        it('should set loading to true in login state when a login request is added', () => {
            const request = { userEmail: '', userPassword: '' } as Credentials;
            const createAction = new Login(request);

            const result = fromAuth.reducer(fromAuth.initialState, createAction);

            expect(result.loading).toBe(true);
        });
    });
    describe('LoginSuccess', () => {
        it('should set a currentUser in login state when a login request is successful', () => {
            const currentUser = { userName: '', userEmail: '', token: '' } as User;
            const createAction = new LoginSuccess(currentUser);

            const result = fromAuth.reducer(fromAuth.initialState, createAction);

            expect(result.currentUser).toBe(currentUser);
        });
    });
    describe('LoginFailure', () => {
        it('should set an error message in login state when a login request fails', () => {
            const errorMessage: AlertMessage = { type: '', text: '' };
            const createAction = new LoginFailure(errorMessage);

            const result = fromAuth.reducer(fromAuth.initialState, createAction);

            expect(result.error).toBe(errorMessage);
        });
    });
    describe('ClearError', () => {
        it('should set error to null in login state when called', () => {
            const createAction = new ClearError();

            const result = fromAuth.reducer(fromAuth.initialState, createAction);

            expect(result.error).toBe(null);
        });
    });
    describe('RefreshToken', () => {
        it('should set a new token value in login state when called', () => {
            const token: string = '';
            const createAction = new RefreshToken(token);

            const result = fromAuth.reducer(fromAuth.initialState, createAction);

            expect(result.currentUser.token).toBe(token);
        });
    });
    describe('Logout', () => {
        it('should set the login state back to its initial state', () => {
            const createAction = new Logout();

            const result = fromAuth.reducer(fromAuth.initialState, createAction);

            expect(result).toBe(fromAuth.initialState);
        });
    });
});
