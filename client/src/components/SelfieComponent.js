'use strict';

import React from 'react';
import Relay from 'react-relay';
import CSSModules from 'react-css-modules';
import styles from 'styles/Selfie.css';
import { getAppState, updateAppState } from '../AppState';
import AddSelfieMutation from '../queries/AddSelfieMutation';

class SelfieComponent extends React.Component {

    constructor() {

        super();

        this.state = {
            currentTakenPicture: getAppState('currentTakenPicture'),
            convertingToBase64: false
        }
    }

    handleUpload() {
        this.refs.UploadInput.click();
    }

    imageChanged() {

        if (this.refs.UploadInput.files.length) {

            this.setState({
                convertingToBase64: true
            });

            let reader = new FileReader();

            reader.onloadend = ({ target }) => {

                this.setState({
                        currentTakenPicture: target.result,
                        convertingToBase64: false
                    },
                    () => {
                        updateAppState('currentTakenPicture', target.result);
                    }
                );
            };

            reader.readAsDataURL( this.refs.UploadInput.files[0] );
        }
    }

    handleCancel() {

        this.setState({
            currentTakenPicture: null
        }, () => {
            updateAppState('currentTakenPicture', null);
        });
    }

    handleSave() {

        Relay.Store.update(
            new AddSelfieMutation({
                author: getAppState('nickname'),
                src: getAppState('currentTakenPicture'),
                viewer: this.props.viewer
            })
        );
    }

    render() {

        const { currentTakenPicture, convertingToBase64 } = this.state;

        return (
            <div styleName="root">
                <div styleName="card">

                    <div styleName="content" onClick={this.handleUpload.bind(this)} style={{ height: currentTakenPicture ? 'auto' : false }}>
                        {currentTakenPicture && <img src={currentTakenPicture} styleName='selfie' ref="TakenPicture" />}
                    </div>

                    {currentTakenPicture && !convertingToBase64 &&
                        <div styleName="extra-content">
                            <div styleName="buttons">
                                <div styleName="save-button" onClick={this.handleSave.bind(this)}>Publier</div>
                                <div styleName="cancel-button" onClick={this.handleCancel.bind(this)}>Annuler</div>
                            </div>
                        </div>
                    }
                </div>


                <form>
                    <input onChange={this.imageChanged.bind(this)}
                           ref="UploadInput"
                           style={{position: 'absolute', left: '-10000px'}}
                           type="file"
                           accept="image/*"
                    />
                </form>
            </div>
        );
    }
}

SelfieComponent.displayName = 'SelfieComponent';

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