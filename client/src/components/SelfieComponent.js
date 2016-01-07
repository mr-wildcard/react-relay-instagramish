'use strict';

import React from 'react';
import Relay from 'react-relay';
import CSSModules from 'react-css-modules';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import cs from 'classnames';
import styles from 'styles/Selfie.css';
import HiddenForm from './parts/HiddenFormComponent';
import processImage from '../utils/image-processing';
import { getAppState } from '../AppState';
import AddSelfieMutation from '../data/mutations/AddSelfieMutation';

class SelfieComponent extends React.Component {

    constructor() {

        super();

        this.state = {
            selfieBase64encoded: null,
            uploading: false
        }
    }

    componentDidMount() {

        // sent via router
        const { imageData } = this.props.location.state;

        if (imageData) {
            processImage(imageData, 695, 60, this.replaceSelfie.bind(this));
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

            processImage(imageData, 695, 60, this.replaceSelfie.bind(this));
        }
    }

    handleSave() {

        this.setState({
            uploading: true
        });

        Relay.Store.update(
            new AddSelfieMutation({
                author: getAppState('nickname'),
                src: this.state.selfieBase64encoded,
                width: this.refs.SelfieImg.naturalWidth,
                height: this.refs.SelfieImg.naturalHeight,
                viewer: this.props.viewer
            }),
            {
                onFailure: () => {
                    this.setState({
                        uploading: false
                    });
                },
                onSuccess: () => { this.context.history.pushState(null, 'feed') }
            }
        )
    }

    handleRetry() {
        this.refs.HiddenForm.emulateClick();
    }

    handleCancel() {
        this.context.history.goBack();
    }

    render() {

        const { selfieBase64encoded, uploading } = this.state;

        let saveButtonCSSClassnames = cs({
            'save-button': true,
            'loading-button': uploading
        });

        let retryButtonCSSClassnames = cs({
            'retry-button': true,
            'disabled-button': uploading
        });

        let cancelButtonCSSClassnames = cs({
            'cancel-button': true,
            'disabled-button': uploading
        });

        return (
            <div styleName="root">

                {!selfieBase64encoded &&
                    <div styleName="loader-wrapper">
                        <div styleName="loader"></div>
                    </div>
                }

                {selfieBase64encoded &&
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
                        <img src={selfieBase64encoded} ref="SelfieImg" styleName='selfie' />
                    </ReactCSSTransitionGroup>
                }

                <div styleName="buttons-wrapper">
                    <div styleName="buttons">
                        <div styleName={saveButtonCSSClassnames} onClick={!uploading ? this.handleSave.bind(this) : false}>Publier</div>
                        <div styleName={retryButtonCSSClassnames} onClick={!uploading ? this.handleRetry.bind(this) : false}>Réessayer</div>
                        <div styleName={cancelButtonCSSClassnames} onClick={!uploading ? this.handleCancel.bind(this) : false}>Annuler</div>
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

const CSSModulifiedComponent = CSSModules(SelfieComponent, styles, { allowMultiple: true });

export default Relay.createContainer(CSSModulifiedComponent, {

    fragments: {
        viewer: () => Relay.QL`
            fragment on User {
                ${AddSelfieMutation.getFragment('viewer')}
            }
            `
    }
});
