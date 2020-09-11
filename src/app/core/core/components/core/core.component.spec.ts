import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreComponent } from './core.component';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as auth from '../../../../auth/actions/auth.actions';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../../../material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import * as fromAuth from '../../../../auth/reducers/auth.reducer';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import * as fromCore from '../../reducers';

import { NotificationsListener } from '../../../../notifications/notificationlistener';
import * as signalR from '@aspnet/signalr';
import { User } from '../../../../shared/models';
import { of } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';

describe('CoreComponent', () => {
  let component: CoreComponent;
  let fixture: ComponentFixture<CoreComponent>;
  let store: Store<fromRoot.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          auth: combineReducers(fromAuth.reducer),
          core: combineReducers(fromCore.reducer)
        })],
      declarations: [CoreComponent, SideMenuComponent],
      providers: [
        {
          provide: NotificationsListener,
          useValue: {
            connection: new signalR.HubConnectionBuilder().withUrl("/notify", { accessTokenFactory: () => this.authToken }).configureLogging(signalR.LogLevel.Information).build(),
            authToken: null,
            subscriptions: [],
            start() {},
            stop() {}
          }
        }
      ]    
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(CoreComponent);
    component = fixture.componentInstance;

    component.user$ = of({ userName: '', userEmail: '', token: '', decodedToken: {}, institutionId: 1 } as User);
    let plataform: Platform = new Platform(); 
    let media: MediaMatcher = new MediaMatcher(plataform);
    component.mobileQuery = media.matchMedia('(max-width: 600px)');
    
    fixture.detectChanges();
  });
  
  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
