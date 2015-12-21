'use strict';

import React from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import styles from 'styles/parts/Header.css';
import { appState } from '../../AppState';


const HeaderComponent = (props) => {

    const itemCSSClassname = (itemName) => itemName == props.pathname ? 'item-active' : 'item';

    return (
        <div styleName="root">
            <div styleName="menu">
                <div styleName="first-item">Hello&nbsp;{appState.get('nickname')}&nbsp;!</div>
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

export default CSSModules(HeaderComponent, styles);
