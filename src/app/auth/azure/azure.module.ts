import { NgModule, ModuleWithProviders, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AzureRoutingModule } from './azure-routing.module';
import { LoginADComponent } from './components/login-ad/login-ad.component';
import { AuthConfigService } from '../../services/auth-config.service';
import { MsalModule, MsalGuard, BroadcastService } from '@azure/msal-angular';
import { LogLevel } from 'msal';
import { MSAL_CONFIG, MsalService } from '@azure/msal-angular/dist/msal.service';
import { WindowWrapper } from '@azure/msal-angular/dist/msal.module';
import { LogoutADComponent } from './components/logout-ad/logout-ad.component';

export function loggerCallback(logLevel, message, piiEnabled) {
}

export const AADCONFIG = {
  ...AuthConfigService.getConfig().aadConfig,
  validateAuthority: true,
  piiLoggingEnabled: false,
  logger: loggerCallback,
  level: LogLevel.Info,
  navigateToLoginRequestUrl: false,
  redirectUri: window.location.origin + '/login-ad',
  cacheLocation: 'localStorage',
  consentScopes: ['user.read', AuthConfigService.getConfig().serverScope]
};

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [MsalGuard, BroadcastService],
})
export class MsalModule2 {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MsalModule,
      providers: [
        { provide: MSAL_CONFIG, useValue: AADCONFIG }, MsalService, { provide: WindowWrapper, useValue: window }
      ]
    };
  }
}

@NgModule({
  imports: [
    CommonModule,
    AzureRoutingModule,
    MsalModule2.forRoot()
  ],
  declarations: [
    LoginADComponent,
    LogoutADComponent
  ]
})
export class AzureModule {
  constructor() { }
}
