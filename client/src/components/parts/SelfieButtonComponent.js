'use strict';

import React from 'react';
import CSSModules from 'react-css-modules';
import styles from 'styles/parts/SelfieButton.css';

const SelfieButtonComponent = (props) => {

    return (
        <div styleName="root">
            <button styleName="button" onClick={props.takeSelfieHandler}>
                <i styleName="icon"></i>
            </button>
        </div>
    );
};

SelfieButtonComponent.displayName = 'PartsSelfieButtonComponent';
SelfieButtonComponent.propTypes = {
    takeSelfieHandler: React.PropTypes.func.isRequired
};

export default CSSModules(SelfieButtonComponent, styles);
