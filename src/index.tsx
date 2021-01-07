import React from 'react';
import ReactDOM from 'react-dom';
import App from './observers/App';
import { app, user } from './mobx';

ReactDOM.render(
    <React.StrictMode>
        <App app={app} user={user} />
    </React.StrictMode>,
    document.getElementById('root')
);
