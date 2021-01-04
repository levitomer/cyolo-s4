import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'mobx-react';
import App from './observers/App';
import * as stores from './mobx';

ReactDOM.render(
    <Provider {...stores}>
        <App />
    </Provider>,
    document.getElementById('root')
);
