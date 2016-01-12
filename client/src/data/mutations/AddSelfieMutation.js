import Relay from 'react-relay';

class AddSelfieMutation extends Relay.Mutation {

    static fragments = {
        viewer: () => Relay.QL`
            fragment on User {
                id
            }
            `
    };

    getMutation() {
        return Relay.QL`mutation { addSelfie }`;
    }

    getFatQuery() {
        return Relay.QL`
            fragment on AddSelfiePayload {
                selfieEdge,
                viewer {
                    selfies
                }
            }
        `;
    }

    // this breaks upload
    /*
    getFiles() {
        return {
            src: this.props.src
        };
    }
    */

    getConfigs() {
        return [{
            type: 'RANGE_ADD',
            parentName: 'viewer',
            parentID: this.props.viewer.id,
            connectionName: 'selfies',
            edgeName: 'selfieEdge',
            rangeBehaviors: {
                '': 'prepend'
            }
        }];
    }

    getVariables() {
        return {
            author: this.props.author,
            src: this.props.src,
            width: this.props.width,
            height: this.props.height
        };
    }

    getOptimisticResponse() {

        return {

            selfieEdge: {
                node: {
                    author: this.props.author,
                    src: this.props.src,
                    width: this.props.width,
                    height: this.props.height
                }
            },
            viewer: {
                id: this.props.viewer.id
            }
        };
    }
}

export default AddSelfieMutation;
