import Relay from 'react-relay';

export default class ChangeSelfieLikesCountMutation extends Relay.Mutation {

    static fragments = {
        selfie: () => Relay.QL`
            fragment on Selfie {
                id
            }`,
        viewer: () => Relay.QL`
            fragment on User {
                id
            }`
    };

    getMutation() {
        return Relay.QL`mutation { changeSelfieLikesCount }`;
    }

    getFatQuery() {
        return Relay.QL`
            fragment on ChangeSelfieLikesCountPayload {
                selfie {
                    likesCount
                },
                viewer {
                    selfies
                }
            }`;
    }

    getConfigs() {
        return [{
            type: 'FIELDS_CHANGE',
            fieldIDs: {
                selfie: this.props.selfie.id,
                viewer: this.props.viewer.id
            },
        }];
    }

    getVariables() {
        return {
            id: this.props.selfie.id,
            liked: this.props.liked
        };
    }

    getOptimisticResponse() {

        return {
            selfie: {
                likesCount: this.props.likesCount,
                id: this.props.selfie.id
            },
            viewer: {
                id: this.props.viewer.id
            }
        };
    }
}
