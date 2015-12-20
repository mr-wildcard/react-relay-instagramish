import React from 'react';
import CSSModules from 'react-css-modules';
import styles from 'styles/App.css';
import LoginComponent from './LoginComponent';
import { loggedIn } from '../AppState';

class AppComponent extends React.Component {

    handleLogingIn() {
        this.props.history.pushState(null, 'feed');
    }

    render() {

        return (
            <div styleName="root">

                {(loggedIn() && this.props.children) || <LoginComponent onLoggedInHandler={this.handleLogingIn.bind(this)} />}

            </div>
        );
    }
}

export default CSSModules(AppComponent, styles);
