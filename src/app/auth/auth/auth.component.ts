import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthConfigService } from 'src/app/services/auth-config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  template: ``,
})
export class AuthComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  constructor(private loginConfig: AuthConfigService, private router: Router) { }
  ngOnInit() {
    if (!localStorage.getItem('domain-config')) {
      this.subscriptions.push(this.loginConfig.fetchConfig().subscribe(config => {
        if (config instanceof Error) {
          console.log('Server is down!');
          return;
        }
        this.selectLoginPage(config.authType);
      }));
    } else {
      this.selectLoginPage((AuthConfigService.getConfig().authType));
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => {
      if (s) {
        s.unsubscribe();
      }
    });
  }
  selectLoginPage(authType: string) {
    switch (authType) {
      case 'Azure':
        this.router.navigate(['/login-ad']);
        break;
      case 'Local':
        this.router.navigate(['/login']);
        break;
      default:
        break;
    }
  }
}
