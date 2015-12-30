'use strict';

import koa from 'koa';
import mount from 'koa-mount';
import cors from 'koa-cors';
import multer from 'koa-multer';
import bodyParser from 'koa-bodyparser';
import cloud from './helpers/cloudinary';
//import multerWrapper from './helpers/multer';
import graphqlHTTP from 'koa-graphql';
import graphQLSchema from './data/schema';

let app = koa();
//let storage = multer.memoryStorage();

app.use(cors());

// https://github.com/chentsulin/koa-graphql/blob/master/src/__tests__/http-test.js#L600
// app.use(mount('/graphql', multerWrapper({ storage }).single('file')));
app.use(mount('/graphql', cloud()));

app.use(
    mount('/graphql', graphqlHTTP({
        schema: graphQLSchema,
        graphiql: true,
        pretty: true
    }))
);

app.listen(3000, () => console.log('Server listening on port 3000...'));