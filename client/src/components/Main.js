import React from 'react';
import CSSModules from 'react-css-modules';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
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

                <ReactCSSTransitionGroup
                    component="div"
                    className={styles['page-wrapper']}
                    transitionName={{
                      enter: styles['page-enter'],
                      enterActive: styles['page-enter-active'],
                      leave: styles['page-leave'],
                      leaveActive: styles['page-leave-active'],
                      appear: styles['page-appear'],
                      appearActive: styles['page-appear-active']
                    }}
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {React.cloneElement(this.props.children, {
                        key: this.props.location.pathname
                    })}
                </ReactCSSTransitionGroup>

                {pathname === 'feed' && <SelfieButton takeSelfieHandler={this.handleSelfieButton.bind(this)} />}

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
