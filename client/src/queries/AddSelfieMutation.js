import Relay from 'react-relay';

export default class AddSelfieMutation extends Relay.Mutation {

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
                },
            }
        `;
    }

    getVariables() {
        return {
            text: this.props.text
        };
    }
}