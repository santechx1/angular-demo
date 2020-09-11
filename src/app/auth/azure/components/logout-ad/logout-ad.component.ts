import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as auth from '../../../actions/auth.actions';

@Component({
  selector: 'app-logout-ad',
  template: ``
})
export class LogoutADComponent implements OnInit {

  constructor(
    private msalService: MsalService,
    private store: Store<fromRoot.State>
  ) { }
  ngOnInit() {
    if (localStorage.getItem('azureLoggedIn')) {
      localStorage.removeItem('id_token');
      localStorage.removeItem('azureLoggedIn');
      this.store.dispatch(new auth.ClearCurrentUser());
      this.msalService.logout();
    } else {
      this.store.dispatch(new auth.LoginRedirect());
    }
  }
}
