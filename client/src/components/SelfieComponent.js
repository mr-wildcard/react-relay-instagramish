'use strict';

import React from 'react';
import Relay from 'react-relay';
import CSSModules from 'react-css-modules';
import styles from 'styles/Selfie.css';
import HiddenForm from './parts/HiddenFormComponent';
import { encode } from '../utils/base64';
import { getAppState, updateAppState } from '../AppState';
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

    replaceSelfie(base64result) {
        this.setState({
            selfieBase64encoded: base64result
        });
    }

    handleImageChanged() {

        const imageData = this.refs.HiddenForm.getFile();

        if (imageData) {
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
        this.context.history.pushState(null, 'feed');
    }

    render() {

        const { selfieBase64encoded } = this.state;

        return (
            <div styleName="root">

                <div styleName="card">

                    <div styleName="content" style={{ height: !selfieBase64encoded ? 300 : 'auto' }}>

                        {!selfieBase64encoded &&
                            <div styleName="loader-wrapper">
                                <div styleName="loader"></div>
                            </div>
                        }

                        {selfieBase64encoded &&
                            <img src={selfieBase64encoded} styleName='selfie'/>
                        }
                    </div>

                    <div styleName="extra-content">
                        <div styleName="buttons">
                            <div styleName="save-button" onClick={this.handleSave.bind(this)}>Publier</div>
                            <div styleName="retry-button" onClick={this.handleRetry.bind(this)}>Réessayer</div>
                            <div styleName="cancel-button" onClick={this.handleCancel.bind(this)}>Annuler</div>
                        </div>
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