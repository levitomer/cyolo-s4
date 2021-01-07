import React from 'react';
import logo from '../assets/logo.png';
import Login from './Login';
import Registry from './Registry';
import { observer } from 'mobx-react';
import { registry, auth } from '../mobx';
import { AppInterface } from '../interfaces/App';
import { UserInterface } from '../interfaces/User';

interface IProps {
    app: AppInterface;
    user: UserInterface;
}

const App: React.FC<IProps> = ({ app, user }: IProps): JSX.Element => {
    React.useEffect(() => {
        if (!app.token) {
            app.setAppLoaded();
        }

        if (app.token) {
            user.pullUser().finally(() => app.setAppLoaded());
        }
    }, [app, user]);

    return (
        <div>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Super Simplistic Storage Solution™ <code>{`{S4}`}</code>
            </p>
            {app.token ? (
                <Registry registry={registry} />
            ) : (
                <Login auth={auth} />
            )}
        </div>
    );
};

export default observer(App);
