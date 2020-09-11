import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AlertMessage, User } from '../../../../shared/models';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as auth from '../../../actions/auth.actions';
import { Credentials } from '../../models';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  error$: Observable<AlertMessage>;
  loading$: Observable<boolean>;
  user$: Observable<User>;
  user: User;
  userSub: Subscription;

  constructor(private store: Store<fromRoot.State>) {
    this.loading$ = this.store.pipe(select(fromRoot.getLoading));
    this.error$ = this.store.pipe(select(fromRoot.getError));
    this.user$ = this.store.pipe(select(fromRoot.getCurrentUser));
    this.userSub = this.user$.subscribe(u => this.user = u);
  }
  ngOnInit() {
    if (this.user) {
      this.store.dispatch(new auth.DashboardRedirect());
    }
  }
  login(credentials: Credentials) {
    this.store.dispatch(new auth.Login(credentials));
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
