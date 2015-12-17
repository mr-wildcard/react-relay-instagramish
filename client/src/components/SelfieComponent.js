'use strict';

import React from 'react';
import CSSModules from 'react-css-modules';
import styles from 'styles/Selfie.css';

class SelfieComponent extends React.Component {

    render() {
        return (
            <div styleName="root">
                Please edit src/components///SelfieComponent.js to update this component!
            </div>
        );
    }
}

SelfieComponent.displayName = 'SelfieComponent';

// Uncomment properties you need
// SelfieComponent.propTypes = {};
// SelfieComponent.defaultProps = {};

export default CSSModules(SelfieComponent, styles);
