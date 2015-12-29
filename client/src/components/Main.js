import React from 'react';
import CSSModules from 'react-css-modules';
import styles from 'styles/App.css';
import Login from './LoginComponent';
import Header from './parts/HeaderComponent';
import SelfieButton from './parts/SelfieButtonComponent';
import HiddenForm from './parts/HiddenFormComponent';
import { loggedIn, getAppState, updateAppState } from '../AppState';

class AppComponent extends React.Component {

    handleLogin() {
        this.context.history.pushState(null, 'feed');
    }

    handleSelfieButton() {
        this.refs.HiddenForm.emulateClick();
    }

    handleImageChanged() {
        this.context.history.pushState({
            imageData: this.refs.HiddenForm.getFile()
        }, 'selfie');
    }

    get composedChildren() {

        const { location: { pathname } } = this.props;

        return (
            <div styleName="main-wrapper">

                <Header />

                <div styleName="page-wrapper">
                    {this.props.children}

                    {pathname === 'feed' && <SelfieButton takeSelfieHandler={this.handleSelfieButton.bind(this)} />}
                </div>

            </div>
        )
    }

    render() {

        const _loggedIn = loggedIn();

        return (
            <div styleName="root">

                {(_loggedIn && this.composedChildren) || <Login loginHandler={this.handleLogin.bind(this)} />}

                {_loggedIn &&
                    <HiddenForm ref="HiddenForm" handleImageChanged={this.handleImageChanged.bind(this)} />
                }

            </div>
        );
    }
}

AppComponent.contextTypes = {
    history: React.PropTypes.object
};

export default CSSModules(AppComponent, styles);
