'use strict';

import koa from 'koa';
import mount from 'koa-mount';
import cors from 'koa-cors';
import graphqlHTTP from 'koa-graphql';
import graphQLSchema from './data/schema';

let app = koa();

app.use(cors());

app.use(
    mount('/graphql', graphqlHTTP({
        schema: graphQLSchema,
        graphiql: true
    }))
);

app.listen(3000, () => console.log('Server listening on port 3000...'));