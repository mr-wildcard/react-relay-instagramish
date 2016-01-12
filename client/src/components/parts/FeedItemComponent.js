'use strict';

import React from 'react';
import Relay from 'react-relay';
import CSSModules from 'react-css-modules';
import styles from 'styles/parts/FeedItem.css';
import ChangeSelfieLikesCountMutation from '../../data/mutations/ChangeSelfieLikesCountMutation';
import { getAppState, updateAppState } from '../../AppState';

const handleLikeClick = (liked, { selfie, viewer }) => {

    let currentIdSelfiesLiked = JSON.parse( getAppState('likedSelfiesId') );
    let selfiePosition = currentIdSelfiesLiked.indexOf(selfie.id);
    if (selfiePosition > -1) {
        currentIdSelfiesLiked.splice(selfiePosition, 1);
    }
    else {
        currentIdSelfiesLiked.push(selfie.id);
    }

    let stringifiedIds = JSON.stringify(currentIdSelfiesLiked);
    localStorage.setItem('idLiked', stringifiedIds);

    updateAppState('likedSelfiesId', stringifiedIds);

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
        id,
        author,
        src,
        likesCount
    } = props.selfie;

    const selfieLiked = JSON.parse( getAppState('likedSelfiesId') ).indexOf(id) > -1;

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
                <span className="right floated" onClick={handleLikeClick.bind(this, !selfieLiked, props)}>
                    <i styleName={selfieLiked ? 'liked-icon' : 'likes-icon'}></i>
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
                id,
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
