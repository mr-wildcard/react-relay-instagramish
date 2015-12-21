'use strict';

import React from 'react';
import CSSModules from 'react-css-modules';
import styles from  'styles/Feed.css';
import FeedItem from './parts/FeedItemComponent';

class FeedComponent extends React.Component {

    render() {
        return (
            <div styleName="root">
                <div styleName="cards">
                    <FeedItem />
                    <FeedItem />
                    <FeedItem />
                    <FeedItem />
                </div>
            </div>
        );
    }
}

FeedComponent.displayName = 'FeedComponent';

export default CSSModules(FeedComponent, styles);
