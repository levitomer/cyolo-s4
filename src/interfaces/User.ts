export interface UserInterface {
    currentUser: any;
    loadingUser: boolean;
    updatingUser: boolean;
    updatingUserErrors: any;
    pullUser();
    logout(): void;
}
