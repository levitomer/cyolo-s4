export interface AppInterface {
    appName: string;
    token: any;
    appLoaded: boolean;
    setToken(token: any): void;
    setAppLoaded(): void;
}
