'use strict';

import React from 'react';
import Relay from 'react-relay';
import CSSModules from 'react-css-modules';
import styles from 'styles/Selfie.css';
import { appState } from '../AppState';
import AddSelfieMutation from '../queries/AddSelfieMutation';

class SelfieComponent extends React.Component {

    constructor() {

        super();

        this.state = {
            currentTakenPicture: null
        }
    }

    handleUpload() {
        this.refs.UploadInput.click();
    }

    imageChanged() {

        if (this.refs.UploadInput.files.length) {
            this.setState({
                currentTakenPicture: window.URL.createObjectURL( this.refs.UploadInput.files[0] )
            }, () => {
                appState.set('currentTakenPicture', this.setState.currentTakenPicture);
            });
        }
    }

    handleCancel() {

        this.setState({
            currentTakenPicture: null
        }, () => {
            appState.set('currentTakenPicture', null);
        });
    }

    handleSave() {

        Relay.Store.update(
            new AddSelfieMutation({
                author: appState.get('nickname'),
                src: this.state.currentTakenPicture
            })
        );
    }

    render() {

        const { currentTakenPicture } = this.state;

        return (
            <div styleName="root">
                <div styleName="card">

                    <div styleName="content" onClick={this.handleUpload.bind(this)} style={{ height: currentTakenPicture ? 'auto' : false }}>
                        {currentTakenPicture && <img src={currentTakenPicture} styleName='selfie' ref="TakenPicture" />}
                    </div>

                    {currentTakenPicture &&
                        <div styleName="extra-content">
                            <div styleName="buttons">
                                <div styleName="save-button" onClick={this.handleSave.bind(this)}>Publier</div>
                                <div styleName="cancel-button" onClick={this.handleCancel.bind(this)}>Annuler</div>
                            </div>
                        </div>
                    }
                </div>


                <form>
                    <input onChange={this.imageChanged.bind(this)} ref="UploadInput"
                           style={{position: 'absolute', left: '-10000px'}} type="file" accept="image/*"/>
                </form>
            </div>
        );
    }
}

SelfieComponent.displayName = 'SelfieComponent';

const CSSModulifiedComponent = CSSModules(SelfieComponent, styles);

export default Relay.createContainer(CSSModulifiedComponent, {

    fragments: {
        selfie: () => Relay.QL`
            fragment on User {
                ${AddSelfieMutation.getFragment('viewer')}
            }
            `
    }
});