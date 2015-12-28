import find from 'lodash.find';

var selfieNextId = 0;
var selfies = [
    {
        author: 'Leo',
        src: 'https://i.ytimg.com/vi/cHgIQYvv9kk/hqdefault.jpg',
        created_at: 1451317030544
    },
    {
        author: 'Kim',
        src: 'http://img1.closermag.fr/var/closermag/storage/images/media/images-des-contenus/actu-people/people-anglo-saxons/20150830-kim/kim-kardashian-en-vacances-a-st-barth-sur-instagram/4834046-1-fre-FR/Kim-Kardashian-en-vacances-a-St-Barth-sur-Instagram_exact1024x768_l.jpg',
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