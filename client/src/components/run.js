import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRoute } from 'react-router';
import { RelayRouter } from 'react-router-relay';
import createHashHistory from 'history/lib/createHashHistory';
import App from './Main';
import Login from './LoginComponent';
import Feed from './FeedComponent';
import Selfie from './SelfieComponent';
import { appState } from 'AppState';

const history = createHashHistory({queryKey: false});

ReactDOM.render((
    <RelayRouter history={history}>
        <Route path="/" component={App}>
            <IndexRoute component={Login} />
            <Route path="/feed" component={Feed} onEnter={requireAuth} />
            <Route path="/selfie" component={Selfie} onEnter={requireAuth} />
        </Route>
    </RelayRouter>
), document.getElementById('app'));


function requireAuth(nextState, replaceState) {

    if (!appState.get('nickname') > 0) {
        replaceState(null, '/');
    }
}