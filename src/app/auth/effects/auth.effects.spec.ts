import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Router } from '@angular/router';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { AuthEffects } from './auth.effects';
import { Login, LoginSuccess, LoginFailure, LoginRedirect } from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { AppConfig } from '../../app.config';
import { Credentials } from '../models';
import { User, AlertMessage, DecodedJwt } from '../../shared/models';

describe('Auth Effects', () => {
  let effects: AuthEffects;
  let metadata: EffectsMetadata<AuthEffects>;
  let actions: Observable<any>;
  let authService: any;
  let routerService: any;

  beforeEach(async(() => {

    class MockAuthService extends AuthService {
      authenticate(model: Credentials): Observable<User> {
        return of({
          institutionId: 1,
          userName: '',
          userEmail: '',
          token: '',
          decodedToken: <DecodedJwt>{}
        });
      }
    }

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AppConfig,
        AuthEffects,
        provideMockActions(() => actions),
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy("navigate");
          },
        },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    effects = TestBed.get(AuthEffects);
    metadata = getEffectsMetadata(effects);
    authService = TestBed.get(AuthService);
    routerService = TestBed.get(Router);
  });

  describe('login$', () => {
    it('should register login$ that dispatches an action', () => {
      expect(metadata.login$).toEqual({ dispatch: true });
    });

    it('should return a LoginSuccess action with user information if login succeeds', () => {
      const credentials: Credentials = { userEmail: '', userPassword: '' };
      const user = { userName: '', userEmail: '', token: '', decodedToken: {}, institutionId: 1 } as User;
      const action = new Login(credentials);
      const completion = new LoginSuccess(user);

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });
      expect(effects.login$).toBeObservable(expected);
    });

    it('should return a LoginFailure action with an error', () => {
      const credentials: Credentials = { userEmail: null, userPassword: null };
      const message: string = 'Error';
      const error: AlertMessage = { type: 'danger', text: 'Error' };
      const action = new Login(credentials);
      const completion = new LoginFailure(error);


      actions = hot('--a-', { a: action });
      const response = cold('-#', {}, message);
      const expected = cold('---b', { b: completion });
      spyOn(authService, 'authenticate')
        .and
        .returnValue(response);
      expect(effects.login$).toBeObservable(expected);
    });
  });

  describe('loginSuccess$', () => {
    it('should register loginSuccess$ that does not dispatch an action', () => {
      expect(metadata.loginSuccess$).toEqual({ dispatch: false });
    });

    it('should dispatch a RouterNavigation action', () => {
      const user = { userName: '', userEmail: '', token: '' } as User;
      const action = new LoginSuccess(user);

      actions = hot('-a---', { a: action });

      effects.loginSuccess$.subscribe(() => {
        expect(routerService.navigate).toHaveBeenCalledWith(['/']);
      });
    });
  });

  describe('loginRedirect$', () => {
    it('should register loginRedirect$ that does not dispatch an action', () => {
      expect(metadata.loginRedirect$).toEqual({ dispatch: false });
    });

    it('should dispatch a RouterNavigation action', () => {
      const action = new LoginRedirect();

      actions = hot('-a---', { a: action });

      effects.loginRedirect$.subscribe(() => {
        expect(routerService.navigate).toHaveBeenCalledWith(['/login']);
      });
    });
  });

});