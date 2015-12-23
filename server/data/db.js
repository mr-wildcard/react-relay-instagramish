import find from 'lodash.find';

var selfies = [
    {
        id: 0,
        author: 'Kim',
        src: 'http://img1.closermag.fr/var/closermag/storage/images/media/images-des-contenus/actu-people/people-anglo-saxons/20150830-kim/kim-kardashian-en-vacances-a-st-barth-sur-instagram/4834046-1-fre-FR/Kim-Kardashian-en-vacances-a-St-Barth-sur-Instagram_exact1024x768_l.jpg'
    },
    {
        id: 1,
        author: 'Leo',
        src: 'https://i.ytimg.com/vi/cHgIQYvv9kk/hqdefault.jpg'
    }
];

selfies = selfies.map(obj => new Selfie(obj.id, obj.author, obj.src));

function Selfie(id, author, src) {
    this.id = id;
    this.author = author;
    this.src = src;
}

export default {

    Selfie,
    getSelfie(id) { return find(selfies, { id: id }) }
}