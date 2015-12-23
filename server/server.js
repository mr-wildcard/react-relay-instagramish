'use strict';

import koa from 'koa';
import mount from 'koa-mount';
import graphqlHTTP from 'koa-graphql';
import graphQLSchema from './data/schema';

let app = koa();

app.use(
    mount('/graphql', graphqlHTTP({
        schema: graphQLSchema,
        graphiql: true
    }))
);

app.listen(3000);