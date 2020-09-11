import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../shared/models';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as auth from '../actions/auth.actions';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: Observable<User>;

  constructor(private store: Store<fromRoot.State>) {
    this.user = store.pipe(select(fromRoot.getCurrentUser));
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.user.pipe(
      map(s => {
        const res = s ? true : false;
        if (!res) {
          this.store.dispatch(new auth.LoginRedirect());
        }
        return res;
      })
    );
  }
}
