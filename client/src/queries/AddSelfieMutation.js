import Relay from 'react-relay';
import RelayMutationType from 'react-relay';

class AddSelfieMutation extends Relay.Mutation {

    static fragments = {
        viewer: () => Relay.QL`
            fragment on User {
                id,
                totalCount,
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
                    selfies,
                    totalCount
                }
            }
        `;
    }

    getConfigs() {
        return [{
            type: 'RANGE_ADD',
            parentName: 'viewer',
            parentID: this.props.viewer.id,
            connectionName: 'selfies',
            edgeName: 'selfieEdge',
            rangeBehaviors: {
                '': 'append'
            }
        }];
    }

    getVariables() {
        return {
            author: this.props.author,
            src: this.props.src
        };
    }

    getOptimisticResponse() {

        return {

            selfieEdge: {
                node: {
                    author: this.props.author,
                    src: this.props.src,
                    likesCount: this.props.likesCount
                }
            },
            viewer: {
                id: this.props.viewer.id
            }
        };
    }
}

export default AddSelfieMutation;