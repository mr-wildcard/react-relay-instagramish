import getBody from 'raw-body';
import httpError from 'http-errors';
import koaBody from 'koa-body';

// https://github.com/graphql/express-graphql/blob/master/src/parseBody.js
export default function cloud() {
    return function *(next) {

        console.log(this.request.body);
        
        yield next;


        /*, function (err, body) {

            if (err) {
                return next( httpError(400, `Invalid body: ${err.message}.`) );
            }

            console.log(JSON.parse(body));


/*
            try {
                return next(null, JSON.parse(body));
            }
            catch (error) {
                return next(error);
            }
        });

        /*
        if (this.request.type == 'application/json') {


        }
        else {
            yield next;
        }
        */
    }
}