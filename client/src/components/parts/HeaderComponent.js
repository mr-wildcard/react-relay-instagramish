'use strict';

import React from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import styles from 'styles/parts/Header.css';
import logo from '../../images/logo.jpg';
import { appState } from '../../AppState';


const HeaderComponent = (props) => {

    const itemCSSClassname = (itemName) => itemName == props.pathname ? 'button-active' : 'button';

    return (
        <div styleName="root">
            <div styleName="wrapper">
                <div styleName="menu">
                    <div styleName="first-item">
                        <img src={logo} styleName="logo" />
                        <span>Hello {appState.get('nickname')} !</span>
                    </div>
                    <div styleName="item">
                        <Link to="feed" styleName={itemCSSClassname('feed')}>Feed</Link>
                    </div>
                    <div styleName="item">
                        <Link to="selfie" styleName={itemCSSClassname('selfie')}>Take a selfie !</Link>
                    </div>
                </div>
            </div>
        </div>
    );

};

HeaderComponent.displayName = 'PartsHeaderComponent';
HeaderComponent.propTypes = {
    pathname: React.PropTypes.string.isRequired
};

export default CSSModules(HeaderComponent, styles);
