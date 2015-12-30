import cloudinary from 'cloudinary';
import config from '../cloudinary.config';
import raw from 'raw-body';
import Promise from 'bluebird';

cloudinary.config(config);

const upload = Promise.promisify(cloudinary.uploader.upload);

export default function cloud() {

    return function *(next) {

        if (this.is('json')) {

            raw(this.req, {
                    encoding: 'utf8',
                    length: ~~this.req.headers['content-length']
                })
                .then(str => {
                    try {
                        return JSON.parse(str)
                    }
                    catch(error) {
                        throw error;
                    }
                })
                .then(({ variables: { input_0: src }}) => {
                    console.log(src);
                    return upload(src)
                })
                .then(({ url }) => console.log(url))
                .then(yield next)
                .catch(error => console.log(error));
        }
        else {
            yield next;
        }
    }
}