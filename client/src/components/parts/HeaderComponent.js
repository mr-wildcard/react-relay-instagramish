'use strict';

import React from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import styles from 'styles/parts/Header.css';
import logo from '../../images/logo.jpg';
import { appState } from '../../AppState';


const HeaderComponent = (props) => {

    const itemCSSClassname = (itemName) => `item ${itemName == props.pathname ? 'active' : ''}`;

    return (
        <div styleName="root">
                <div styleName="menu">
                    <div styleName="first-item">
                        <img src={logo} styleName="logo" />
                        {/*<span>Hello {appState.get('nickname')} !</span>*/}
                    </div>
                    <Link to="feed" styleName={itemCSSClassname('feed')}>Feed</Link>
                    <Link to="selfie" styleName={itemCSSClassname('selfie')}>Take a selfie !</Link>
                </div>
        </div>
    );

};

HeaderComponent.displayName = 'PartsHeaderComponent';
HeaderComponent.propTypes = {
    pathname: React.PropTypes.string.isRequired
};

export default CSSModules(HeaderComponent, styles, { allowMultiple: true });
