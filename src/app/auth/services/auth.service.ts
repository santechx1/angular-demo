import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../local/models';
import { User, DecodedJwt } from '../../shared/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as fromRoot from '../../reducers';
import * as auth from '../actions/auth.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper = new JwtHelperService();

  constructor(private http: HttpClient, private store: Store<fromRoot.State>) { }
  authenticate(model: Credentials): Observable<User> {
    return this.http
      .post<any>('api/auth/authenticate', model)
      .pipe(
        map((response: Response) => {
          const res: any = response;
          if (res && res.userToken) {
            return res.userToken;
          }
          throw new Error('User or Token missing!');
        })
      );
  }
  getClaims(): Observable<User> {
    return this.http
      .get<any>('api/auth/claims')
      .pipe(
        map((response: Response) => {
          const res: any = response;
          if (res && res.userToken) {
            return res.userToken;
          }
          throw new Error('User or Token missing!');
        })
      );
  }
  logout(): void {
    if (localStorage.getItem('azureLoggedIn')) {
      this.store.dispatch(new auth.AzureLogout());
    } else {
      this.store.dispatch(new auth.LocalLogout());
    }
  }
}
