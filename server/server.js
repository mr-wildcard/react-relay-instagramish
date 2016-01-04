'use strict';

import koa from 'koa';
import mount from 'koa-mount';
import cors from 'koa-cors';
import multer from 'koa-multer';
<<<<<<< HEAD
import bodyParser from 'koa-bodyparser';
import cloud from './helpers/cloudinary';
//import multerWrapper from './helpers/multer';
=======
import koaBody from 'koa-body';
import multerWrapper from './helpers/multer';
import cloud from './helpers/cloud';
>>>>>>> e9809dc8ca738f7a9d5d3fa8ade9199ff9a5fe7c
import graphqlHTTP from 'koa-graphql';
import graphQLSchema from './data/schema';

let app = koa();
<<<<<<< HEAD
//let storage = multer.memoryStorage();
=======
// let storage = multer.memoryStorage();
>>>>>>> e9809dc8ca738f7a9d5d3fa8ade9199ff9a5fe7c

app.use(cors());

// https://github.com/chentsulin/koa-graphql/blob/master/src/__tests__/http-test.js#L600
// app.use(mount('/graphql', multerWrapper({ storage }).single('file')));
<<<<<<< HEAD
app.use(mount('/graphql', cloud()));

=======
app.use(koaBody({ limit: 5000 * 1024 }));
app.use(cloud());
>>>>>>> e9809dc8ca738f7a9d5d3fa8ade9199ff9a5fe7c
app.use(
    mount('/graphql', graphqlHTTP({
        schema: graphQLSchema,
        graphiql: true,
        pretty: true
    }))
);

app.listen(3000, () => console.log('Server listening on port 3000...'));