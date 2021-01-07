import { observable, action } from 'mobx';
import { Auth as api } from '../api/Auth';
import user from './User';
import app from './App';
import { AuthInterface } from 'interfaces/Auth';

class AuthStore implements AuthInterface {
    @observable inProgress = false;
    @observable errors = undefined;

    @observable values = {
        username: '',
        email: '',
        password: '',
    };

    @action setUsername(username: string) {
        this.values.username = username;
    }

    @action setEmail(email: string) {
        this.values.email = email;
    }

    @action setPassword(password: string) {
        this.values.password = password;
    }

    @action reset() {
        this.values.username = '';
        this.values.email = '';
        this.values.password = '';
    }

    @action login() {
        this.inProgress = true;
        this.errors = undefined;
        return api
            .login(this.values.email)
            .then(({ user }) => app.setToken(user.token))
            .then(() => user.pullUser())
            .catch(
                action((err) => {
                    this.errors =
                        err.response &&
                        err.response.body &&
                        err.response.body.errors;
                    throw err;
                })
            )
            .finally(
                action(() => {
                    this.inProgress = false;
                })
            );
    }

    @action register() {
        this.inProgress = true;
        this.errors = undefined;
        return api
            .register(this.values.username)
            .then(({ user }) => app.setToken(user.token))
            .then(() => user.pullUser())
            .catch(
                action((err) => {
                    this.errors =
                        err.response &&
                        err.response.body &&
                        err.response.body.errors;
                    throw err;
                })
            )
            .finally(
                action(() => {
                    this.inProgress = false;
                })
            );
    }

    @action logout() {
        app.setToken('');
        user.logout();
        return Promise.resolve();
    }
}

export default new AuthStore();
