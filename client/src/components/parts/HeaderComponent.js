'use strict';

import React from 'react';
import CSSModules from 'react-css-modules';
import styles from 'styles/parts/Header.css';
import { appState } from '../../AppState';

const HeaderComponent = () => {

    return (
        <div styleName="root">
            <div styleName="menu">
                <div styleName="first-item">Hello&nbsp;{appState.get('nickname')} !</div>
                <a styleName="item">Feed</a>
                <a styleName="item">Take a selfie !</a>
            </div>
        </div>
    );

};

HeaderComponent.displayName = 'PartsHeaderComponent';

export default CSSModules(HeaderComponent, styles);
