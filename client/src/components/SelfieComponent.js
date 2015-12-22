'use strict';

import React from 'react';
import CSSModules from 'react-css-modules';
import styles from 'styles/Selfie.css';

class SelfieComponent extends React.Component {

    render() {
        return (
            <div styleName="root">
                <div styleName="card">
                    <div styleName="content"></div>
                    <div styleName="extra-content">
                        <div styleName="buttons">
                            <div styleName="save-button">Publier</div>
                            <div styleName="cancel-button">Annuler</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SelfieComponent.displayName = 'SelfieComponent';

export default CSSModules(SelfieComponent, styles);
