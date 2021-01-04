import React from 'react';
import logo from '../assets/logo.png';
import Login from './Login';
import Files from './Files';
import { observer } from 'mobx-react';

function App({ auth, user }) {
    React.useEffect(() => {
        if (!auth.token) {
            auth.setAppLoaded();
        }

        if (auth.token) {
            user.pullUser().finally(() => auth.setAppLoaded());
        }
    }, [auth, user]);

    return (
        <div>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Super Simplistic Storage Solution™ <code>{`{S4}`}</code>
            </p>
            {auth.token ? <Files /> : <Login />}
        </div>
    );
}

export default observer(App);
