import find from 'lodash.find';

var selfies = [
    {
        id: 0,
        author: 'Kim',
        src: 'http://img1.closermag.fr/var/closermag/storage/images/media/images-des-contenus/actu-people/people-anglo-saxons/20150830-kim/kim-kardashian-en-vacances-a-st-barth-sur-instagram/4834046-1-fre-FR/Kim-Kardashian-en-vacances-a-St-Barth-sur-Instagram_exact1024x768_l.jpg',
        likesCount: 9525251
    },
    {
        id: 1,
        author: 'Leo',
        src: 'https://i.ytimg.com/vi/cHgIQYvv9kk/hqdefault.jpg',
        likesCount: 0
    }
];

selfies = selfies.map(obj => new Selfie(obj.id, obj.author, obj.src, obj.likesCount));

function Selfie(id, author, src, likesCount) {
    this.id = id;
    this.author = author;
    this.src = src;
    this.likesCount = likesCount;
}

function User(id) {
    this.id = id;
}

const defaultUser = new User('me');

export default {
    Selfie,
    User,

    getUser: () => defaultUser,
    getSelfies: () => selfies,
    getSelfie: (id) => find(selfies, { id: id }),
    addSelfie: (author, src) => {
        
        selfies.unshift( new Selfie(
            selfies.length + 1,
            author,
            src
        ))
    }
}