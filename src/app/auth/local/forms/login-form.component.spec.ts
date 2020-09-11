import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromAuth from '../reducers/auth.reducer';

describe('LoginFormComponent', () => {
    let component: LoginFormComponent;
    let fixture: ComponentFixture<LoginFormComponent>;
    let store: Store<fromAuth.State>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    ...fromRoot.reducers,
                    auth: combineReducers(fromAuth.reducer),
                })
            ],
            declarations: [LoginFormComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        store = TestBed.get(Store);
        spyOn(store, 'dispatch').and.callThrough();
        fixture = TestBed.createComponent(LoginFormComponent);
        component = fixture.componentInstance;
        component.loading = false;
        component.error = { text: '', type: '' };
        fixture.detectChanges();
    });

    it('should compile', () => {
        expect(component).toBeTruthy();
    });
});
