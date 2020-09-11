export class AADConfig {
    clientID: string;
    authority: string;
}

export class DomainConfig {
    aadConfig: AADConfig;
    authType: string;
    serverScope: string;
}
