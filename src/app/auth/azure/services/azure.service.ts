import { Injectable } from '@angular/core';
import { AzureModule, AADCONFIG } from '../azure.module';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { Router } from '@angular/router';

@Injectable({
    providedIn: AzureModule
})
export class AzureService {

    constructor(
        private msalService: MsalService,
        private broadcastService: BroadcastService,
        private router: Router
    ) { }

    refreshAzureToken(): void {
        this.msalService.acquireTokenSilent([AADCONFIG.clientID]);
        this.broadcastService.subscribe('msal:acquireTokenSuccess', (payload) => {
            localStorage.setItem('id_token', payload._token);
        });

        this.broadcastService.subscribe('msal:acquireTokenFailure', () => {
            this.router.navigate(['/login-ad/logout']);
        });
    }
}
