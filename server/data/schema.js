import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

import {
    nodeDefinitions,
    fromGlobalId,
    globalIdField
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

var selfieType = new GraphQLObjectType({

    name: 'Selfie',
    description: 'A selfie',

    isTypeOf(obj) { return obj instanceof db.Selfie },

    fields: {
        id: globalIdField('Selfie'),
        author: {
            type: GraphQLString,
            description: 'Author (nickname) of the selfie'
        },
        src: {
            type: GraphQLString,
            description: 'Src of selfie. Can be URL or base64 representation.'
        }
    },
    interfaces: [ nodeInterface ]
});

export default new GraphQLSchema({

    query: new GraphQLObjectType({
        name: 'Query',
        fields: {

            node: nodeField,
            selfie: {
                type: selfieType,
                resolve() {
                    return db.getSelfie(0)
                }
            }
        }
    })
});