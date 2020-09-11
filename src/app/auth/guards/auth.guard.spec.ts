import { TestBed, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as auth from '../actions/auth.actions';
import * as fromRoot from '../../reducers';
import * as fromAuth from '../reducers/auth.reducer';

describe('AuthGuard', () => {
  beforeEach(() => {
    let guard: AuthGuard;
    let store: Store<fromAuth.State>;

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
        auth: combineReducers(fromAuth.reducer),
      })],
      providers: [AuthGuard]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    guard = TestBed.get(AuthGuard);

  });

  it('should compile', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
