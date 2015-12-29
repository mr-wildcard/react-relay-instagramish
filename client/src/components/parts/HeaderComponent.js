'use strict';

import React from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import styles from 'styles/parts/Header.css';
import { getAppState } from "../../AppState";
import logo from '../../images/logo.jpg';

const HeaderComponent = () => {

    return (
        <div styleName="root">
                <div styleName="menu">
                    <div styleName="first-item">
                        <img src={logo} styleName="logo" />
                        <span>Hello</span>
                        <span styleName="nickname">{getAppState('nickname')}</span>
                        <span>!</span>
                    </div>
                </div>
        </div>
    );

};

HeaderComponent.displayName = 'PartsHeaderComponent';

export default CSSModules(HeaderComponent, styles);
