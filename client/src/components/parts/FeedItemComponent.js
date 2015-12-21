'use strict';

import React from 'react';
import CSSModules from 'react-css-modules';
import styles from 'styles/parts/FeedItem.css';
import yuna from '../../images/love.jpg';

const FeedItemComponent = () => {

    return (
        <div styleName="root">
            <div styleName="content">
                <div styleName="meta" className="right floated">14h</div>
                Elliot
            </div>
            <div styleName="selfie-img">
                <img styleName="selfie" src={yuna} />
            </div>
            <div styleName="content">
                <span className="right floated">
                  <i styleName="likes-icon"></i>
                  17 likes
                </span>
            </div>
        </div>
    );
};

FeedItemComponent.displayName = 'PartsFeedItemComponent';

export default CSSModules(FeedItemComponent, styles);
