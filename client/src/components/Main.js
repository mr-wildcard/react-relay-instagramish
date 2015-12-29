import React from 'react';
import CSSModules from 'react-css-modules';
import styles from 'styles/App.css';
import Login from './LoginComponent';
import Header from './parts/HeaderComponent';
import { loggedIn } from '../AppState';

class AppComponent extends React.Component {

    handleLogin() {
        this.context.history.pushState(null, 'feed');
    }

    get composedChildren() {

        return (
            <div styleName="wrapper">
                <Header />

                <div styleName="page-wrapper">
                    {this.props.children}
                </div>
            </div>
        )
    }

    render() {

        return (
            <div styleName="root">

                {(loggedIn() && this.composedChildren) || <Login loginHandler={this.handleLogin.bind(this)} />}

            </div>
        );
    }
}

AppComponent.contextTypes = {
    history: React.PropTypes.object
};

export default CSSModules(AppComponent, styles);
