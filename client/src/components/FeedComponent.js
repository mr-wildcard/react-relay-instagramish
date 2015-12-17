'use strict';

import React from 'react';
import CSSModules from 'react-css-modules';
import styles from  'styles/Feed.css';

class FeedComponent extends React.Component {

    render() {
        return (
            <div className="root">
                Please edit src/components///FeedComponent.js to update this component!
            </div>
        );
    }
}

FeedComponent.displayName = 'FeedComponent';

// Uncomment properties you need
// FeedComponent.propTypes = {};
// FeedComponent.defaultProps = {};

export default CSSModules(FeedComponent, styles);
