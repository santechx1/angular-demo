import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as core from '../actions/core.action';
import * as fromRoot from '../../../reducers';
import { ResourceGuard } from './resource.guard';
import { reducer, State } from '../reducers';

describe('ResourceGuard', () => {
  beforeEach(() => {
    let guard: ResourceGuard;
    let store: Store<State>;
    

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot({
          ...fromRoot.reducers,
          core: combineReducers(reducer),
        })],
      providers: [ResourceGuard]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    guard = TestBed.get(ResourceGuard);
  });

  it('should compile', inject([ResourceGuard], (guard: ResourceGuard) => {
    expect(guard).toBeTruthy();
  }));
});
