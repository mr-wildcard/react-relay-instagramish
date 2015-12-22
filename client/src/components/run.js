import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
//import { RelayRouter } from 'react-router-relay';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import App from './Main';
import Feed from './FeedComponent';
import Selfie from './SelfieComponent';
//import { appState, loggedIn } from '../AppState';

ReactDOM.render((
    <Router history={createBrowserHistory()}>
        <Route path="/" component={App}>
            <Route path="feed" component={Feed} />
            <Route path="selfie" component={Selfie} />
        </Route>
    </Router>
), document.getElementById('app'));