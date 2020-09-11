import { Component, OnInit, OnDestroy } from '@angular/core';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as auth from '../../../actions/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-ad',
  template: ``
})
export class LoginADComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  constructor(
    private msalService: MsalService,
    private broadcastService: BroadcastService,
    private store: Store<fromRoot.State>
  ) { }
  ngOnInit() {
    const state = localStorage.getItem('azureLoggedIn');
    if (state === 'waiting') {
      if (window.location.href.substr(window.location.href.length - 1) === '#') {
        this.subscriptions.push(this.broadcastService.subscribe('msal:loginSuccess', (payload) => {
          localStorage.setItem('id_token', payload._token);
          this.completeLogin();
        }));
        this.subscriptions.push(this.broadcastService.subscribe('msal:loginFailure', () => {
          localStorage.removeItem('azureLoggedIn');
          this.store.dispatch(new auth.LoginRedirect());
        }));
      } else {
        this.redirectToAzure();
      }
    } else if (localStorage.getItem('id_token')) {
      this.completeLogin();
    } else {
      this.redirectToAzure();
    }
  }

  completeLogin() {
    localStorage.setItem('azureLoggedIn', 'complete');
    this.store.dispatch(new auth.LoadClaims());
  }

  redirectToAzure() {
    localStorage.setItem('azureLoggedIn', 'waiting');
    this.msalService.loginRedirect();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => {
      if (s) {
        s.unsubscribe();
      }
    });
  }
}
