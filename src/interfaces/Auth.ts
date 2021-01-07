export interface AuthInterface {
    inProgress: boolean;
    errors: any;
    setUsername(username: string): void;
    setEmail(email: string): void;
    setPassword(password: string): void;
    reset(): void;
    login();
    register();
    logout();
}
