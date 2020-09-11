import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DomainConfig } from '../shared/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthConfigService {
  public static domainConfig: DomainConfig = null;

  constructor(private http: HttpClient) { }
  static getConfig(): DomainConfig {
    if (AuthConfigService.domainConfig !== null) {
      return AuthConfigService.domainConfig;
    } else {
      const config = localStorage.getItem('domain-config');
      if (config) {
        return JSON.parse(config) as DomainConfig;
      } else {
        console.log('Domain configuration not found!');
      }
    }
  }
  fetchConfig(): Observable<DomainConfig> {
    return this.http
      .get<any>(`/api/auth/login`)
      .pipe(
        map((res: Response) => {
          const config: any = res;
          if (!config || !config.authType) {
            throw new Error('Domain configuration missing!');
          }
          if (config.authType === 'Azure' && config.clientID && config.authority && config.serverScope) {
            const domainConfig: DomainConfig = {
              aadConfig: {
                clientID: config.clientID,
                authority: config.authority
              },
              serverScope: config.serverScope,
              authType: config.authType
            };
            localStorage.setItem('domain-config', JSON.stringify(domainConfig));
            AuthConfigService.domainConfig = domainConfig;
            return domainConfig;
          }
          if (config.authType === 'Local') {
            const domainConfig: DomainConfig = {
              aadConfig: null,
              authType: config.authType,
              serverScope: null
            };
            localStorage.setItem('domain-config', JSON.stringify(domainConfig));
            AuthConfigService.domainConfig = domainConfig;
            return domainConfig;
          }
          throw new Error('Invalid configuration!');
        })
      );
  }
}
