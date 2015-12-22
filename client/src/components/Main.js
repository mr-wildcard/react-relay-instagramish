import React from 'react';
import CSSModules from 'react-css-modules';
import styles from 'styles/App.css';
import Login from './LoginComponent';
import Header from './parts/HeaderComponent';
import { loggedIn } from '../AppState';

class AppComponent extends React.Component {

    handleLogingIn() {
        this.context.history.pushState(null, 'feed');
    }

    get composedChildren() {

        const { location } = this.props;

        return (
            <div styleName="wrapper">
                <Header pathname={location.pathname} />

                <div styleName="page-wrapper">
                    {this.props.children}
                </div>
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

AppComponent.contextTypes = {
    history: React.PropTypes.object
};

export default CSSModules(AppComponent, styles);
