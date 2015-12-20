'use strict';

import React from 'react';
import CSSModules from 'react-css-modules';
import styles from 'styles/parts/Header.css';

const HeaderComponent = (props) => {

    return (
        <div styleName="root">
            Please edit src/components/parts//HeaderComponent.js to update this component!
        </div>
    );

};

HeaderComponent.displayName = 'PartsHeaderComponent';

export default CSSModules(HeaderComponent, styles);
