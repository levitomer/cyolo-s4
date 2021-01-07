import { observable, action, reaction } from 'mobx';
import { AppInterface } from '../interfaces/App';

class AppStore implements AppInterface {
    appName = 'Cyolo S4';
    @observable token = window.localStorage.getItem('jwt');
    @observable appLoaded = false;

    constructor() {
        reaction(
            () => this.token,
            (token) => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        );
    }

    @action setToken(token: string): void {
        this.token = token;
    }

    @action setAppLoaded(): void {
        this.appLoaded = true;
    }
}

export default new AppStore();
