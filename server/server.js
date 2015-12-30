'use strict';

import koa from 'koa';
import mount from 'koa-mount';
import cors from 'koa-cors';
import route from 'koa-route';
import multer from 'koa-multer';
import multerWrapper from './helpers/multer';
import graphqlHTTP from 'koa-graphql';
import graphQLSchema from './data/schema';

let app = koa();
//let storage = multer.memoryStorage();

app.use(cors());

// https://github.com/chentsulin/koa-graphql/blob/master/src/__tests__/http-test.js#L600
// app.use(mount('/graphql', multerWrapper({ storage }).single('file')));
app.use(
    mount('/graphql', graphqlHTTP({
        schema: graphQLSchema,
        graphiql: true
    }))
);

app.listen(3000, () => console.log('Server listening on port 3000...'));