import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as auth from '../../../actions/auth.actions';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-session-expired',
  templateUrl: './session-expired.component.html',
  styleUrls: ['./session-expired.component.scss']
})
export class SessionExpiredComponent implements OnInit {

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }
  ngOnInit() {
    this.store.dispatch(new auth.ClearCurrentUser());
  }
  redirect() {
    this.authService.logout();
  }
}
