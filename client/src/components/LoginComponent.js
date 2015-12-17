'use strict';

import React from 'react';
import CSSModules from 'react-css-modules';
import cs from 'classnames';
import styles from 'styles/Login.css';
import { appState } from 'AppState';
import $ from 'jquery';
import  '../../semantic/dist/semantic';

class LoginComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false
        }
    }

    handleSubmit(e) {

        e.preventDefault();

        let nickname = this.refs.nickname.value;

        if (nickname.length > 0) {
            appState.set('nickname', nickname);

            this.setState({
                error: false
            });
        }
        else {
            this.setState({
                error: true
            });
            //$('.login-form').transition('fade');
        }
    }

    render() {

        let buttonCSSClassnames = cs({
            'button': !this.state.error,
            'button-error': this.state.error
        });

        return (
            <div styleName="root">
                <form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <h2 styleName="title">My name is...</h2>
                    <div styleName="input">
                        <input ref="nickname" type="text" placeholder="Nickname..." />
                    </div>
                    <input type="submit" styleName={buttonCSSClassnames} value="Login" />
                </form>
            </div>
        );
    }
}

LoginComponent.displayName = 'LoginComponent';

// Uncomment properties you need
// LoginComponent.propTypes = {};
// LoginComponent.defaultProps = {};

export default CSSModules(LoginComponent, styles, { allowMultiple: true });
