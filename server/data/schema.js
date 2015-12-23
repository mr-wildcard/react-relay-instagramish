import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} from 'graphql';

import {
    nodeDefinitions,
    fromGlobalId,
    globalIdField,
    connectionFromArray,
    connectionDefinitions
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
            resolve: (obj) => obj.author
        },
        src: {
            type: GraphQLString,
            description: 'Src of selfie image. Can be URL or base64 representation.',
            resolve: (obj) => obj.src
        },
        likesCount: {
            type: GraphQLInt,
            description: 'Total number of likes',
            resolve: (obj) => obj.likesCount
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
    description: "Dummy (?) type to allow fetching array of selfies",

    isTypeOf: (obj) => obj instanceof db.User,

    fields: {
        id: globalIdField('User'),
        selfies: {
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

export default new GraphQLSchema({
    query: Root
});