import React from 'react';
import CSSModules from 'react-css-modules';
import styles from 'styles/App.css';
import Login from './LoginComponent';
import Header from './parts/HeaderComponent';
import { loggedIn } from '../AppState';

class AppComponent extends React.Component {

    handleLogingIn() {
        this.props.history.pushState(null, 'feed');
    }

    get composedChildren() {
        
        return (
            <div>
                <Header />

                {this.props.children}
            </div>
        )
    }

    render() {

        return (
            <div styleName="root">

                {(loggedIn() && this.composedChildren) || <Login onLoggedInHandler={this.handleLogingIn.bind(this)} />}

            </div>
        );
    }
}

export default CSSModules(AppComponent, styles);
