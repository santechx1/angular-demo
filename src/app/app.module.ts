import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule, OverlayContainer } from '@angular/cdk/overlay';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from './shared/utils/router-state';
import { AppConfig } from './app.config';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { JwtInterceptorProvider } from './shared/utils/jwt.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { NotificationsModule } from './notifications/notifications.module';
import { AuthEffects } from './auth/effects/auth.effects';
import { AuthComponent } from './auth/auth/auth.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    OverlayModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers: metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    EffectsModule.forRoot([AuthEffects]),
    NotificationsModule.forRoot()
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    { provide: LOCALE_ID, useValue: 'es-ES'},
    DatePipe,
    TitleCasePipe,
    AppConfig,
    JwtInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    const overlayContainerClasses = overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add('phi-theme');
  }
}
