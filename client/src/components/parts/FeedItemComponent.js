'use strict';

import React from 'react';
import Relay from 'react-relay';
import CSSModules from 'react-css-modules';
import styles from 'styles/parts/FeedItem.css';
import ChangeSelfieLikesCountMutation from '../../data/mutations/ChangeSelfieLikesCountMutation';

const handleLikeClick = (liked, { selfie, viewer }) => {

    Relay.Store.commitUpdate(
        new ChangeSelfieLikesCountMutation({
            liked,
            selfie,
            viewer
        })
    );
}

const FeedItemComponent = (props) => {

    const {
        author,
        src,
        likesCount
    } = props.selfie;

    return (
        <div styleName="root">
            <div styleName="content">
                <div styleName="meta" className="right floated">14h</div>
                {author}
            </div>
            <div styleName="selfie-img">
                <img styleName="selfie" src={src} />
            </div>
            <div styleName="content">
                <span className="right floated" onClick={handleLikeClick.bind(this, true, props)}>
                    <i styleName="likes-icon"></i>
                    {likesCount} likes
                </span>
            </div>
        </div>
    );
};

FeedItemComponent.displayName = 'PartsFeedItemComponent';

const CSSModulifiedComponent = CSSModules(FeedItemComponent, styles);

export default Relay.createContainer(CSSModulifiedComponent, {

    fragments: {
        selfie: () => Relay.QL`
            fragment on Selfie {
                author,
                src,
                likesCount,
                ${ChangeSelfieLikesCountMutation.getFragment('selfie')}
            }
            `,
        viewer: () => Relay.QL`
            fragment on User {
                ${ChangeSelfieLikesCountMutation.getFragment('viewer')}
            }
        `
    }
});
