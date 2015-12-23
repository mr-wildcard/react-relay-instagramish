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

        console.log(idInfo.type);

        if (idInfo.type == 'Selfie') {
            return db.getSelfie(idInfo.id);
        }

        return null;
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
            description: 'Author (nickname) of the selfie'
        },
        src: {
            type: GraphQLString,
            description: 'Src of selfie image. Can be URL or base64 representation.'
        },
        likesCount: {
            type: GraphQLInt,
            description: 'Total number of likes'
        }
    },
    interfaces: [ nodeInterface ]
});

const {
    connectionType: SelfieConnection,
    edgeType: GraphQLSelfieEdge
} = connectionDefinitions({
    name: 'Selfie',
    nodeType: selfieType
});

export default new GraphQLSchema({

    query: new GraphQLObjectType({
        name: 'SelfieQuery',
        fields: {
            id: globalIdField('Selfie'),
            node: nodeField,
            selfies: {
                type: new GraphQLList(selfieType),
                resolve: () => db.selfies
            }
        }
    })
});