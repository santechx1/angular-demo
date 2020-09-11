import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as auth from '../../../actions/auth.actions';
import * as fromRoot from '../../../../reducers';
import * as fromAuth from '../../../reducers/auth.reducer';
import { LoginFormComponent } from '../../forms/login-form.component';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let store: Store<fromAuth.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          auth: combineReducers(fromAuth.reducer),
        })],
      declarations: [LogoutComponent, LoginFormComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
