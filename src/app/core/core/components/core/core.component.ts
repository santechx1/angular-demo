import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as auth from '../../../../auth/actions/auth.actions';
import * as configInst from 'src/app/core/core/actions/load-config.action';
import { Observable, Subscription, timer } from 'rxjs';
import { User, MenuResource, ResourceType } from '../../../../shared/models';
import { NotificationsListener } from '../../../../notifications/notificationlistener';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuLoad } from '../../actions/menu.action';
import * as fromCore from '../../reducers';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AzureService } from 'src/app/auth/azure/services/azure.service';
import { Load } from 'src/app/core/core/actions/branches.action';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  helper = new JwtHelperService();
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  subscriptions: Subscription[] = [];
  token: string = null;
  menu$: Observable<MenuResource>;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private store: Store<fromRoot.State>,
    private notificationsService: NotificationsListener,
    private authService: AuthService,
    private azureService: AzureService
  ) {
    this.menu$ = store.pipe(select(fromCore.getMenuState),
      filter(s => !!s.menu),
      map(s => s.menu.find(x => x.type === ResourceType.Institution)));
    // Mobile Listener
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.user$ = this.store.pipe(select(fromRoot.getCurrentUser));
    this.subscriptions.push(this.user$.subscribe(u => {
      if (u) {
        this.token = u.token;
      }
    }));
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.notificationsService.stop();
    this.subscriptions.forEach(s => {
      if (s) {
        s.unsubscribe();
      }
    });
  }
  ngOnInit() {
    const state = localStorage.getItem('azureLoggedIn');
    const azureToken = localStorage.getItem('id_token');
    const authTimer = timer(1000, 1000);
    this.store.dispatch(new MenuLoad());
    this.notificationsService.start();
    this.subscriptions.push(this.menu$.subscribe(m => {
      if (m) {
        this.store.dispatch(new Load(m.entityRef));
        this.store.dispatch(new configInst.Load(m.entityRef));
      }
    }));
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.subscriptions.push(authTimer.subscribe(() => {
      if (this.token) {
        if (this.helper.isTokenExpired(this.token)) {
          this.store.dispatch(new auth.SessionExpiredRedirect());
        }
      }
      if (state === 'complete') {
        if (this.helper.isTokenExpired(azureToken)) {
          this.azureService.refreshAzureToken();
        }
      }
    }));
  }
  logout() {
    this.authService.logout();
  }
}
