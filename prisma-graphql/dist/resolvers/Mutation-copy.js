'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mutation = {
    createPerson: function createPerson(parent, args, _ref, info) {
        var db = _ref.db;

        var emailTaken = db.PEOPLE.some(function (person) {
            return person.email === args.data.email;
        });
        if (emailTaken) {
            throw new Error('Email taken.');
        }

        var newUser = _extends({
            id: (0, _v2.default)()
        }, args.data);
        db.PEOPLE.push(newUser);
        return newUser;
    },
    deletePerson: function deletePerson(parent, args, _ref2, info) {
        var db = _ref2.db;

        var personIndex = db.PEOPLE.findIndex(function (person) {
            return person.id === args.id;
        });
        if (personIndex === -1) {
            throw new Error('User not found');
        }

        var deletedPerson = db.PEOPLE.splice(personIndex, 1);

        db.POSTS = db.POSTS.filter(function (post) {
            var match = post.author === args.id;

            if (match) {
                db.COMMENTS = db.COMMENTS.filter(function (comment) {
                    return comment.post !== post.id;
                });
            }

            return !match;
        });
        db.COMMENTS = db.COMMENTS.filter(function (comment) {
            return comment.author !== args.id;
        });

        return deletedPerson[0];
    },
    updatePerson: function updatePerson(parent, args, _ref3, info) {
        var db = _ref3.db;

        var personIndex = db.PEOPLE.findIndex(function (person) {
            return person.id === args.id;
        });
        if (personIndex === -1) {
            throw new Error('User not found');
        }

        if (typeof args.data.email === 'string') {
            var emailTaken = db.PEOPLE.some(function (person) {
                return person.email === args.data.email;
            });
            if (emailTaken) {
                throw new Error('Email taken');
            }
        }

        db.PEOPLE[personIndex] = Object.assign(db.PEOPLE[personIndex], args.data);

        return db.PEOPLE[personIndex];
    },
    addPost: function addPost(parent, args, _ref4, info) {
        var db = _ref4.db,
            pubsub = _ref4.pubsub;

        var userExists = db.PEOPLE.some(function (person) {
            return person.id === args.data.author;
        });
        if (!userExists) {
            throw new Error('User does not exist');
        }
        var newPost = _extends({
            id: (0, _v2.default)(),
            published: false
        }, args.data);
        db.POSTS.push(newPost);
        //pubsub.publish(`posts`, { posts: {mutation: 'CREATED', data: newPost}}) 
        return newPost;
    },
    deletePost: function deletePost(parent, args, _ref5, info) {
        var db = _ref5.db,
            pubsub = _ref5.pubsub;

        var postIndex = db.POSTS.findIndex(function (post) {
            return post.id === args.id;
        });
        if (postIndex === -1) {
            throw new Error('Post not found');
        }

        var _db$POSTS$splice = db.POSTS.splice(postIndex, 1),
            _db$POSTS$splice2 = _slicedToArray(_db$POSTS$splice, 1),
            deletedPost = _db$POSTS$splice2[0];

        db.COMMENTS = db.COMMENTS.filter(function (comment) {
            return comment.post !== args.id;
        });
        if (deletedPost.published) {
            pubsub.publish('posts', { posts: { mutation: 'DELETED', data: deletedPost } });
        }
        return deletedPost;
    },
    updatePost: function updatePost(parent, args, _ref6, info) {
        var db = _ref6.db,
            pubsub = _ref6.pubsub;

        var postIndex = db.POSTS.findIndex(function (post) {
            return post.id === args.id;
        });
        if (postIndex === -1) {
            throw new Error('Post not found');
        }

        db.POSTS[postIndex] = Object.assign(db.POSTS[postIndex], args.data);
        if (db.POSTS[postIndex].published) {
            pubsub.publish('posts', { posts: { mutation: 'UPDATED', data: db.POSTS[postIndex] } });
        }
        return db.POSTS[postIndex];
    },
    setPostStatus: function setPostStatus(parent, args, _ref7, info) {
        var db = _ref7.db;

        var tempPost = db.POSTS.find(function (post) {
            return post.id === args.id;
        });
        if (tempPost) {
            tempPost.published = args.published;
        }
        return tempPost;
    },
    addComment: function addComment(parent, args, _ref8, info) {
        var db = _ref8.db,
            pubsub = _ref8.pubsub;

        var userExists = db.PEOPLE.some(function (person) {
            return person.id === args.data.author;
        });
        var postExists = db.POSTS.some(function (post) {
            return post.id === args.data.post && post.published === true;
        });
        if (!userExists) {
            throw new Error('Person does not exist');
        }
        if (!postExists) {
            throw new Error('Post does not exist or is not published');
        }
        var newComment = _extends({
            id: (0, _v2.default)()
        }, args.data);
        db.COMMENTS.push(newComment);
        pubsub.publish('comment-' + args.data.post, {
            comments: { mutation: 'CREATED', data: newComment }
        });
        return newComment;
    },
    deleteComment: function deleteComment(parent, args, _ref9, info) {
        var db = _ref9.db,
            pubsub = _ref9.pubsub;

        var commentIndex = db.COMMENTS.findIndex(function (comment) {
            return comment.id === args.id;
        });
        if (commentIndex === -1) {
            throw new Error('Comment not found');
        }

        var _db$COMMENTS$splice = db.COMMENTS.splice(commentIndex, 1),
            _db$COMMENTS$splice2 = _slicedToArray(_db$COMMENTS$splice, 1),
            deletedComment = _db$COMMENTS$splice2[0];

        pubsub.publish('comment-' + deletedComment.post, {
            comments: { mutation: 'DELETED', data: deletedComment }
        });
        return deletedComment;
    },
    updateComment: function updateComment(parent, args, _ref10, info) {
        var db = _ref10.db,
            pubsub = _ref10.pubsub;

        var commentIndex = db.COMMENTS.findIndex(function (comment) {
            return comment.id === args.id;
        });
        if (commentIndex === -1) {
            throw new Error('Comment not found');
        }

        db.COMMENTS[commentIndex] = Object.assign(db.COMMENTS[commentIndex], args.data);

        pubsub.publish('comment-' + db.COMMENTS[commentIndex].post, {
            comments: { mutation: 'UPDATED', data: db.COMMENTS[commentIndex] }
        });
        return db.COMMENTS[commentIndex];
    }
};

exports.default = Mutation;