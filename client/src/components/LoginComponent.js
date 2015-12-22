'use strict';

import React from 'react';
import CSSModules from 'react-css-modules';
import cs from 'classnames';
import styles from 'styles/Login.css';
import { login } from '../AppState';

class LoginComponent extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            error: false
        }
    }

    handleChange() {

        let nickname = this.refs.nickname.value;

        this.setState({
            error: nickname.length == 0
        });
    }

    handleSubmit(e) {

        e.preventDefault();

        let nickname = this.refs.nickname.value;

        this.setState({
            error: nickname.length == 0
        }, () => {

            if (!this.state.error) {

                login(nickname);
                this.props.onLoggedInHandler();
            }
        });
    }

    render() {

        let inputWrapperCSSClassnames = cs({
            'input': !this.state.error,
            'input-error': this.state.error
        });

        let inputCSSClassnames = cs({
            'shake-it': this.state.error
        });

        return (
            <div styleName="root">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <h2 styleName="title">My name is...</h2>
                    <div styleName={inputWrapperCSSClassnames} >
                        <input styleName={inputCSSClassnames} ref="nickname" type="text" placeholder="Nickname..." pattern="[a-zA-Z0-9]+" onChange={this.handleChange.bind(this)} />
                    </div>
                    <input type="submit" value="Login" styleName="button" />
                </form>
            </div>
        );
    }
}

LoginComponent.displayName = 'LoginComponent';
LoginComponent.propTypes = {
    onLoggedInHandler: React.PropTypes.func.isRequired
};

export default CSSModules(LoginComponent, styles, { allowMultiple: true });
