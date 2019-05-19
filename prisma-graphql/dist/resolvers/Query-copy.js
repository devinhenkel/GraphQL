"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Query = {
    me: function me() {
        return db.PEOPLE.find(function (person) {
            return person.id === "444";
        });
    },

    // passed props (parent, args, context[state], info)
    post: function post(parent, args, _ref, info) {
        var db = _ref.db;

        return db.POSTS.find(function (post) {
            return post.id === args.id;
        });
    },
    posts: function posts(parent, args, _ref2, info) {
        var db = _ref2.db,
            prisma = _ref2.prisma;

        return prisma.query.posts(null, info);

        /* let filteredPosts = ''
        if (!args.query) {
            filteredPosts = db.POSTS
        } else {
            filteredPosts = db.POSTS.filter((post) => {
                return post.title.toLowerCase().includes(args.query.toLowerCase()) ||
                post.body.toLowerCase().includes(args.query.toLowerCase())
            })
        }
        if (!args.sort) {
            return filteredPosts
        }
         return filteredPosts.sort((a,b) => {
            if (args.sortdir === -1) {
                return (a[args.sort] < b[args.sort]) ? 1 : ((b[args.sort] < a[args.sort]) ? -1 : 0)
            } else {
                return (a[args.sort] > b[args.sort]) ? 1 : ((b[args.sort] > a[args.sort]) ? -1 : 0)
            }
            
        }) */
    },
    people: function people(parent, args, _ref3, info) {
        var db = _ref3.db,
            prisma = _ref3.prisma;

        return prisma.query.users(null, info);
        /* if (!args.query) {
            return db.PEOPLE
        } 
        
        return db.PEOPLE.filter((person) => {
            return person.lastname.toLowerCase().includes(args.query.toLowerCase()) || 
            person.firstname.toLowerCase().includes(args.query.toLowerCase()) || 
            person.email.toLowerCase().includes(args.query.toLowerCase())
         }) */
    },
    person: function person(parent, args, _ref4, info) {
        var db = _ref4.db;

        return db.PEOPLE.find(function (person) {
            return person.id === args.id;
        });
    },
    comments: function comments(parent, args, _ref5, info) {
        var db = _ref5.db,
            prisma = _ref5.prisma;

        return prisma.query.comments(null, info);
        /* return db.COMMENTS */
    },

    comment: function comment(parent, args, _ref6, info) {
        var db = _ref6.db;

        return db.COMMENTS.find(function (comment) {
            return comment.id === args.id;
        });
    },
    grades: function grades() {
        return [10, 20, 30, 40, 50, 60, 70, 80, 90];
    },

    add: function add(parent, args, context, info) {
        if (args.numbers.length === 0) {
            return 0;
        } else {
            return args.numbers.reduce(function (sum, current) {
                return sum + current;
            });
        }
    }
};

exports.default = Query;