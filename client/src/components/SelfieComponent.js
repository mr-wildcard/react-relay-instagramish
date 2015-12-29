'use strict';

import React from 'react';
import Relay from 'react-relay';
import CSSModules from 'react-css-modules';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styles from 'styles/Selfie.css';
import HiddenForm from './parts/HiddenFormComponent';
import { encode } from '../utils/base64';
import { getAppState } from '../AppState';
import AddSelfieMutation from '../data/mutations/AddSelfieMutation';

class SelfieComponent extends React.Component {

    constructor() {
        
        super();

        this.state = {
            selfieBase64encoded: null
        }
    }
    
    componentDidMount() {

        // sent via router
        const { imageData } = this.props.location.state;

        if (imageData) {
            encode(imageData, this.replaceSelfie.bind(this));
        }
    }

    clearSelfie() {

        this.setState({
            selfieBase64encoded: null
        });
    }

    replaceSelfie(base64result) {

        this.setState({
            selfieBase64encoded: base64result
        });
    }

    handleImageChanged() {

        const imageData = this.refs.HiddenForm.getFile();

        if (imageData) {

            this.clearSelfie();

            encode(imageData, this.replaceSelfie.bind(this));
        }
    }

    handleSave() {

        Relay.Store.update(
            new AddSelfieMutation({
                author: getAppState('nickname'),
                src: this.state.selfieBase64encoded,
                viewer: this.props.viewer
            })
        );

        this.context.history.pushState(null, 'feed');
    }

    handleRetry() {
        this.refs.HiddenForm.emulateClick();
    }

    handleCancel() {
        this.context.history.goBack();
    }

    render() {

        const { selfieBase64encoded } = this.state;

        return (
            <div styleName="root">

                <ReactCSSTransitionGroup
                    component="div"
                    className={styles['selfie-img-container']}
                    transitionName={{
                        enter: styles['example-enter'],
                        enterActive: styles['example-enter-active'],
                        leave: styles['example-leave'],
                        leaveActive: styles['example-leave-active'],
                        appear: styles['example-appear'],
                        appearActive: styles['example-appear-active']
                    }}
                    transitionAppear={true}
                    transitionEnterTimeout={500}
                    transitionAppearTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    <img src={selfieBase64encoded} styleName='selfie'/>
                </ReactCSSTransitionGroup>

                <div styleName="buttons-wrapper">
                    <div styleName="buttons">
                        <div styleName="save-button" onClick={this.handleSave.bind(this)}>Publier</div>
                        <div styleName="retry-button" onClick={this.handleRetry.bind(this)}>Réessayer</div>
                        <div styleName="cancel-button" onClick={this.handleCancel.bind(this)}>Annuler</div>
                    </div>
                </div>

                <HiddenForm ref="HiddenForm" handleImageChanged={this.handleImageChanged.bind(this)} />
            </div>
        );
    }
}

SelfieComponent.displayName = 'SelfieComponent';
SelfieComponent.contextTypes = {
    history: React.PropTypes.object
};

const CSSModulifiedComponent = CSSModules(SelfieComponent, styles);

export default Relay.createContainer(CSSModulifiedComponent, {

    fragments: {
        viewer: () => Relay.QL`
            fragment on User {
                ${AddSelfieMutation.getFragment('viewer')}
            }
            `
    }
});