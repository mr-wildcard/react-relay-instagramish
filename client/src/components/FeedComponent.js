'use strict';

import React from 'react';
import Relay from 'react-relay';
import CSSModules from 'react-css-modules';
import styles from  'styles/Feed.css';
import FeedItem from './parts/FeedItemComponent';

class FeedComponent extends React.Component {

    render() {

        const { viewer } = this.props;

        return (
            <div styleName="root">
                <div styleName="cards">
                    {viewer.selfies.edges.map(edge =>
                        <FeedItem key={edge.node.id}
                                  selfie={edge.node}
                                  viewer={viewer}
                        />
                    )}
                </div>
            </div>
        );
    }
}

FeedComponent.displayName = 'FeedComponent';

const CSSModulifiedComponent = CSSModules(FeedComponent, styles);

export default Relay.createContainer(CSSModulifiedComponent, {

    fragments: {
        viewer: () => Relay.QL`
            fragment on User {
                selfies(first: 10) {
                    edges {
                        node {
                            id,
                            ${FeedItem.getFragment('selfie')}
                        }
                    }
                }
            }
            `
    }
});
