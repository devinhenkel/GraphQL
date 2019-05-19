'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// data
var POSTS = [{
    id: '111',
    title: 'The Sun Also Rises',
    body: 'No it don\'t...',
    published: true,
    author: '444'
}, {
    id: '222',
    title: 'The Moon Also Sinks',
    body: 'Oh, yes it do.',
    published: true,
    author: '444'
}, {
    id: '333',
    title: 'Pluto is a dog planet',
    body: 'Bark, bark.',
    published: false,
    author: '666'
}];

var PEOPLE = [{
    id: '444',
    firstname: 'Devin',
    lastname: 'Henkel-Legare',
    email: 'devin@devinhenkel.com'
}, {
    id: '555',
    firstname: 'Laura',
    lastname: 'Legare',
    email: 'lauralegare@live.com'
}, {
    id: '666',
    firstname: 'Crusty',
    lastname: 'McNugget',
    email: 'crusty@mcnugget.com'
}];

var COMMENTS = [{
    id: '001',
    text: 'Looky loo!',
    author: '555',
    post: '111'
}, {
    id: '002',
    text: 'Flap-doodle!',
    author: '555',
    post: '111'
}, {
    id: '003',
    text: 'What the what?!?',
    author: '444',
    post: '333'
}];

var db = {
    PEOPLE: PEOPLE,
    POSTS: POSTS,
    COMMENTS: COMMENTS
};

exports.default = db;