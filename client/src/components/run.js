import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { RelayRouter } from 'react-router-relay';
import { Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import App from './Main';
import Feed from './FeedComponent';
import Selfie from './SelfieComponent';
import ViewerQueries from '../queries/ViewerQueries';

Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer('http://localhost:3000/graphql')
);

ReactDOM.render((
    <RelayRouter history={createBrowserHistory()}>
        <Route path="/" component={App}>
            <Route path="feed" component={Feed} queries={ViewerQueries} />
            <Route path="selfie" component={Selfie} queries={ViewerQueries} />
        </Route>
    </RelayRouter>
), document.getElementById('app'));