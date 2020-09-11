import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as auth from '../../../actions/auth.actions';

@Component({
  selector: 'app-logout',
  template: ``
})
export class LogoutComponent implements OnInit {

  constructor(private store: Store<fromRoot.State>) { }
  ngOnInit() {
    this.store.dispatch(new auth.ClearCurrentUser());
    this.store.dispatch(new auth.LoginRedirect());
  }
}
