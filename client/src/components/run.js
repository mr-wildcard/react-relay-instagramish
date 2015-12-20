import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { RelayRouter } from 'react-router-relay';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import App from './Main';
import Login from './LoginComponent';
import Feed from './FeedComponent';
import Selfie from './SelfieComponent';
import { appState, loggedIn } from '../AppState';

ReactDOM.render((
    <Router history={createBrowserHistory()}>
        <Route path="/" component={App}>
            <Route path="feed" component={Feed} onEnter={requireAuth} />
            <Route path="selfie" component={Selfie} onEnter={requireAuth} />
        </Route>
    </Router>
), document.getElementById('app'));


function requireAuth(nextState, replaceState) {

    if (!loggedIn) {
        replaceState({ nextPathname: nextState.location.pathname }, '/');
    }
}