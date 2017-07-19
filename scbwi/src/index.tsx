import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import * as RoutesModule from './routes';
import { store } from 'store';
import { Provider } from 'react-redux';

let routes = RoutesModule.Routes;

const renderApp = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router children={routes} />
        </Provider>,
        document.getElementById("react-root")
    );
}

renderApp();

if (module.hot) {
    module.hot.accept('./routes', () => {
        routes = require<typeof RoutesModule>('./routes').Routes;
        renderApp();
    });
}