import { uploader } from 'cloudinary';
import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLID
} from 'graphql';

import {
    nodeDefinitions,
    connectionArgs,
    fromGlobalId,
    globalIdField,
    connectionFromArray,
    connectionDefinitions,
    mutationWithClientMutationId,
    cursorForObjectInConnection
} from 'graphql-relay';

import db from './db';

const { nodeInterface, nodeField } = nodeDefinitions(
    (globalId) => {

        var idInfo = fromGlobalId(globalId);

        switch (idInfo.type) {

            case 'Selfie' : return db.getSelfie(idInfo.id);
            case 'User': return db.getUser();

            default: return null;
                break;
        }
    },
    (obj) => {

        switch (true) {

            case obj instanceof db.Selfie : return selfieType;
            case obj instanceof db.User: return userType;

            default: return null;
                break;
        }
    }
);

const selfieType = new GraphQLObjectType({

    name: 'Selfie',
    description: 'A selfie',

    isTypeOf: (obj) => obj instanceof db.Selfie,

    fields: {
        id: globalIdField('Selfie'),
        author: {
            type: GraphQLString,
            description: 'Author (nickname) of the selfie',
            resolve: ({ author }) => author
        },
        src: {
            type: GraphQLString,
            description: 'Src of selfie image. Can be URL or base64 representation.',
            resolve: ({ src }) => src
        },
        likesCount: {
            type: GraphQLInt,
            description: 'Total number of likes',
            resolve: ({ likesCount }) => likesCount
        },
        created_at: {
            type: GraphQLInt,
            description: 'Timestamp of selfie\'s creation',
            resolve: ({ created_at }) => created_at
        }
    },
    interfaces: [ nodeInterface ]
});

const {
        connectionType: SelfiesConnection,
        edgeType: GraphQLSelfieEdge
    } = connectionDefinitions({
    name: 'Selfie',
    nodeType: selfieType
});

const userType = new GraphQLObjectType({

    name: 'User',
    description: "Dummy (rly?) type to allow fetching array of selfies",

    isTypeOf: (obj) => obj instanceof db.User,

    fields: {
        id: globalIdField('User'),
        selfies: {
            args: {
                ...connectionArgs
            },
            type: SelfiesConnection,
            resolve: (obj, {...args}) => connectionFromArray(db.getSelfies(), args)
        },
        totalCount: {
            type: GraphQLInt,
            resolve: () => db.getSelfies().length
        }
    },
    interfaces: [ nodeInterface ]
});

var addSelfieMutation = mutationWithClientMutationId({
    name: 'AddSelfie',

    inputFields: {
        author: {
            type: new GraphQLNonNull(GraphQLString)
        },
        src: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    outputFields: {
        selfieEdge: {
            type: GraphQLSelfieEdge,
            resolve: ({ localSelfieId }) => {

                var selfie = db.getSelfie(localSelfieId);

                return {
                    cursor: cursorForObjectInConnection(db.getSelfies(), selfie),
                    node: selfie
                };
            }
        },
        viewer: {
            type: userType,
            resolve: () => db.getUser()
        }
    },
    mutateAndGetPayload: ({ author, src }) => {

        return new Promise(resolve => {

            uploader.upload(
                src,
                ({ url: src }) => {
                    resolve({
                        localSelfieId: db.addSelfie({ author, src })
                    });
                },
                {
                   folder: 'selfy'
                }
            )
        });
    }
});

var changeSelfieLikesCountMutation = mutationWithClientMutationId({
    name: 'ChangeSelfieLikesCount',
    description: 'Add or remove like',

    inputFields: {
        liked: {
            type: new GraphQLNonNull(GraphQLBoolean)
        },
        id: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    outputFields: {
        selfie: {
            type: selfieType,
            resolve: ({ localSelfieId }) => db.getSelfie(localSelfieId)
        },
        viewer: {
            type: userType,
            resolve: () => db.getUser(),
        }
    },
    mutateAndGetPayload: ({ id, liked }) => {

        var localSelfieId = fromGlobalId(id).id;

        return {
            localSelfieId: db.changeSelfieLikesCount(localSelfieId, liked).id
        }
    },
});

var Root = new GraphQLObjectType({
    name: 'Root',
    fields: () => ({
        viewer: {
            type: userType,
            resolve: () => db.getUser()
        },
        node: nodeField
    })
});

var Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addSelfie: addSelfieMutation,
        changeSelfieLikesCount: changeSelfieLikesCountMutation
    }
});

export default new GraphQLSchema({
    query: Root,
    mutation: Mutation
});
