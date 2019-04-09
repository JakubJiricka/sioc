/* global window document */
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {AppContainer} from 'react-hot-loader';

import './sass/app.scss';
import './sass/core/_dropdown-menu-right.scss';

import Root from './containers/Root';
import configureStore from './store';
import App from './components/App';


const store = configureStore();

const InitialRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" name="App" component={App}/>
        </Switch>
    </BrowserRouter>
);

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Root store={store} comp={InitialRoute}/>
        </AppContainer>,
        document.getElementById('root')
    );
};

render();

if (module.hot) {
    module.hot.accept('./components/App', render);
}
