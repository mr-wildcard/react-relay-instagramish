import find from 'lodash.find';

var selfieNextId = 0;
var selfies = [
    {
        author: 'Leo',
        src: 'http://res.cloudinary.com/dsubvwiw9/image/upload/c_scale,w_695/v1451833109/leo_wcs8v6.jpg',
        created_at: 1451317030544
    },
    {
        author: 'Kim',
        src: 'http://res.cloudinary.com/dsubvwiw9/image/upload/c_scale,w_695/v1451833115/kim_rbtf89.jpg',
        likesCount: 9525251,
        created_at: 1451317130544
    }
];

selfies = selfies.map(data => new Selfie(data));

function Selfie({ author, src, likesCount = 0, created_at = new Date().getTime() }) {
    this.id = `${selfieNextId++}`;
    this.author = author;
    this.src = src;
    this.likesCount = likesCount;
    this.created_at = created_at
}

function User(id) {
    this.id = id;
}

const defaultUser = new User('me');
const getUser = () => defaultUser;
const getSelfies = () => selfies;
const getSelfie = (id) => find(selfies, { id: id });
const addSelfie = (data) => {

    let newSelfie = new Selfie(data);

    selfies.unshift(newSelfie);

    return newSelfie.id;
};

export default {
    Selfie,
    User,

    getUser,
    getSelfies,
    getSelfie,
    addSelfie
}