import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as auth from '../../../actions/auth.actions';
import * as fromRoot from '../../../../reducers';
import * as fromAuth from '../../../reducers/auth.reducer';
import { LoginFormComponent } from '../../forms/login-form.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let store: Store<fromAuth.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          auth: combineReducers(fromAuth.reducer),
        })],
      declarations: [LoginPageComponent, LoginFormComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
