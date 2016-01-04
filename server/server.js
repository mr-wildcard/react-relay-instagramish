'use strict';

import koa from 'koa';
import mount from 'koa-mount';
import cors from 'koa-cors';
import multer from 'koa-multer';
import graphqlHTTP from 'koa-graphql';
import graphQLSchema from './data/schema';
import cloudinary from 'cloudinary';
import cloudinaryConfig from './cloudinary.config';

let app = koa();

cloudinary.config(cloudinaryConfig);

app.use(cors());

app.use(
    mount('/graphql', graphqlHTTP({
        schema: graphQLSchema,
        graphiql: true,
        pretty: true
    }))
);

app.listen(3000, () => console.log('Server listening on port 3000...'));