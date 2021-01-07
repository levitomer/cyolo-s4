import { observable, action } from 'mobx';
import { Auth as api } from '../api/Auth';
import { UserInterface } from '../interfaces/User';

class UserStore implements UserInterface {
    @observable currentUser: any;
    @observable updatingUserErrors: any;
    @observable loadingUser: boolean = false;
    @observable updatingUser: boolean = false;

    @action pullUser() {
        this.loadingUser = true;
        return api
            .current()
            .then(
                action(({ user }) => {
                    this.currentUser = user;
                })
            )
            .finally(
                action(() => {
                    this.loadingUser = false;
                })
            );
    }

    @action updateUser(newUser) {
        this.updatingUser = true;
        return api
            .save(newUser)
            .then(
                action(({ user }) => {
                    this.currentUser = user;
                })
            )
            .finally(
                action(() => {
                    this.updatingUser = false;
                })
            );
    }

    @action logout(): void {
        this.currentUser = undefined;
    }
}

export default new UserStore();
