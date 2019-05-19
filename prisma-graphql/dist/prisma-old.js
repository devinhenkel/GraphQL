'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _prismaBinding = require('prisma-binding');

var _graphql = require('graphql');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var prisma = new _prismaBinding.Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
});

// prisma.query
// prisma.mutation
// prisma.subscription 
// prisma.exists

/*prisma.query.users({
    where: {
        id: 'cjum0nsys00t008485pdcgh8t'
    }}, 
    `{ 
        id 
        firstname 
        lastname 
        posts { 
            title 
            body 
        } 
    }`
    )
    .then((data) => {
        console.log(JSON.stringify(data, undefined, 2))
    })
    */

/*prisma.mutation.updatePost({
    where: {id: 'cjumqizub000i0861iwkosjo3'}, 
    data: { 
        author: {
            connect: {
                id: 'cjuowkv27009v0864m5gmubua'
            }
        },
        published: true
    }
}, 
    `{
        title 
        body 
        author {
            firstname 
            lastname
        }
    }`
    )
    .then((data) => {
        console.log(JSON.stringify(data, undefined, 2))
    })
    */

/* prisma.mutation.createPost({
    data: {
        title: "Knock, knock!",
        body: "Who's there?",
        published: false,
        author: {
            connect: {
                id: 'cjum0nsys00t008485pdcgh8t'
            }
        }
    }
}, `{ id title body }`)
.then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
}) */
/* prisma.query.posts(null, '{ id title body author { firstname lastname }}').then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
}) */

/* let postSelect = {
    id: "cjup0mm4y0059072228m4lbt3"
}

let postUpdate = {
    body: "I mean, I f@$king posted this from Node!",
    published: true
}

let graphSelect = `{
    id
    title
    body
    published
    author {
        firstname
        lastname
    }
}`


prisma.mutation.updatePost({ 
    where: postSelect,
    data: postUpdate
},
graphSelect
).then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
    return prisma.query.users(null, `{
        id
        firstname
        lastname
        posts {
            title
        }
    }`)
}).then((data) => {
    console.log('POSTS:')
    console.log(JSON.stringify(data, undefined, 2))
}) */

// using async await to run command 

var createAuthorID = "cjum0nsys00t008485pdcgh8t";
//const createAuthorID = "xxx"

var createPostInfo = {
    title: "Well I wonder wonder who",
    body: "Bedoop bedoop, who wrote the book of love.",
    published: false
};

var createPostSelectionInfo = '\n{\n    author {\n        id\n        firstname\n        lastname\n        email\n        posts {\n            id\n            title\n            published\n        }\n    }\n}\n';
/* const userSelectionInfo = `
{
    id
    firstname
    lastname
    email
    posts {
        id
        title
        published
    }
}
`
*/
var createPostForUser = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(createAuthorID, createPostInfo) {
        var userExists, post;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return prisma.exists.User({ id: createAuthorID });

                    case 2:
                        userExists = _context.sent;

                        if (userExists) {
                            _context.next = 5;
                            break;
                        }

                        throw new Error('User not found.');

                    case 5:
                        _context.next = 7;
                        return prisma.mutation.createPost({
                            data: _extends({}, createPostInfo, {
                                author: {
                                    connect: {
                                        id: createAuthorID
                                    }
                                }
                            })
                        }, createPostSelectionInfo);

                    case 7:
                        post = _context.sent;
                        return _context.abrupt('return', post.author);

                    case 9:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function createPostForUser(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/* createPostForUser(createAuthorID, createPostInfo)
.then((data) => {console.log(JSON.stringify(data, undefined, 2))})
.catch((err) => console.log(err.message))  */

var postID = 'cjumqizub000i0861iwkosjo3';

var postInfo = {
    title: "Sniff it!"
};

var postSelectionInfo = '\n{\n    id\n    author {\n        id\n        firstname\n        lastname\n        email\n        posts {\n            id\n            title\n            published\n        }\n    }\n}\n';
var userSelectionInfo = '\n{\n    id\n    firstname\n    lastname\n    email\n    posts {\n        id\n        title\n        published\n    }\n}\n';

var updatePostForUser = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(postID, postInfo) {
        var postExists, post;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return prisma.exists.Post({ id: postID });

                    case 2:
                        postExists = _context2.sent;

                        if (postExists) {
                            _context2.next = 5;
                            break;
                        }

                        throw new Error('Post not found.');

                    case 5:
                        _context2.next = 7;
                        return prisma.mutation.updatePost({
                            where: {
                                id: postID
                            },
                            data: postInfo

                        }, postSelectionInfo);

                    case 7:
                        post = _context2.sent;
                        return _context2.abrupt('return', post.author);

                    case 9:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function updatePostForUser(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

/* updatePostForUser(postID, postInfo)
    .then((data) => {
        console.log(JSON.stringify(data, undefined, 2))
    })
    .catch((err) => console.log(err)) */

/* prisma.exists.User({
    id: 'cjum0nsys00t008485pdcgh8t'
}).then((exists) => {
    console.log(exists)
}) */