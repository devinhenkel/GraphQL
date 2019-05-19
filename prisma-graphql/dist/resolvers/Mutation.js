'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _getuserid = require('../utils/getuserid');

var _getuserid2 = _interopRequireDefault(_getuserid);

var _getToken = require('../utils/getToken');

var _getToken2 = _interopRequireDefault(_getToken);

var _lexer = require('graphql/language/lexer');

var _stringUtils = require('../utils/stringUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* const token = jwt.sign({ id: '123abc'}, 'mysecretkey')
console.log(token)

const decoded = jwt.decode(token)
console.log(decoded)

const verified = jwt.verify(token, 'mysecretkey')
console.log(verified) */

// JWT test code
/* const dummy = async () => {
    const username = 'devinhenkel'
    const password = 'Goofus3141'

    const hashedPassword = '$2a$10$SAdaQpXMWzOSiC/NdZA47.d5JSecw8qlJDAvMUxa3TnzceRvEL7Nm'

    const isMatch = await bcrypt.compare(password, hashedPassword)
    console.log(isMatch)
    
}
dummy() */

var Mutation = {
    createUser: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref, info) {
            var prisma = _ref.prisma,
                request = _ref.request;
            var userId, isAdmin, emailVal, password, user;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            userId = (0, _getuserid2.default)(request);
                            _context.next = 3;
                            return (0, _getuserid.getUserAdmin)(prisma, userId);

                        case 3:
                            isAdmin = _context.sent;

                            if (isAdmin) {
                                _context.next = 6;
                                break;
                            }

                            throw new Error('Must be Admin to create users.');

                        case 6:
                            emailVal = require('email-validator');

                            if (emailVal.validate(args.data.email)) {
                                _context.next = 9;
                                break;
                            }

                            throw new Error('Please enter a valid email address.');

                        case 9:
                            password = null;

                            if (!(0, _stringUtils.validatePassword)(args.data.password)) {
                                _context.next = 14;
                                break;
                            }

                            _context.next = 13;
                            return (0, _stringUtils.hashPassword)(args.data.password);

                        case 13:
                            password = _context.sent;

                        case 14:
                            _context.next = 16;
                            return prisma.mutation.createUser({
                                data: _extends({}, args.data, {
                                    password: password
                                })
                            });

                        case 16:
                            user = _context.sent;
                            return _context.abrupt('return', {
                                user: user,
                                token: (0, _getToken2.default)(user.id)
                            });

                        case 18:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function createUser(_x, _x2, _x3, _x4) {
            return _ref2.apply(this, arguments);
        }

        return createUser;
    }(),
    deleteUser: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args, _ref3, info) {
            var prisma = _ref3.prisma,
                request = _ref3.request;
            var userId, isAdmin, userExists;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            userId = (0, _getuserid2.default)(request);
                            _context2.next = 3;
                            return (0, _getuserid.getUserAdmin)(prisma, userId);

                        case 3:
                            isAdmin = _context2.sent;

                            if (isAdmin) {
                                _context2.next = 6;
                                break;
                            }

                            throw new Error('Must be Admin to delete users.');

                        case 6:
                            _context2.next = 8;
                            return prisma.exists.User({
                                id: args.id
                            });

                        case 8:
                            userExists = _context2.sent;

                            console.log('user exists:' + userExists);

                            if (userExists) {
                                _context2.next = 12;
                                break;
                            }

                            throw new Error('No user with that ID was found. Please check the ID.');

                        case 12:
                            return _context2.abrupt('return', prisma.mutation.deleteUser({
                                where: {
                                    id: args.id
                                }
                            }));

                        case 13:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function deleteUser(_x5, _x6, _x7, _x8) {
            return _ref4.apply(this, arguments);
        }

        return deleteUser;
    }(),
    updateUser: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, args, _ref5, info) {
            var prisma = _ref5.prisma,
                request = _ref5.request;
            var userId, isAdmin, currentId, password;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            userId = (0, _getuserid2.default)(request);
                            _context3.next = 3;
                            return (0, _getuserid.getUserAdmin)(prisma, userId);

                        case 3:
                            isAdmin = _context3.sent;
                            currentId = userId;

                            if (!args.where) {
                                _context3.next = 9;
                                break;
                            }

                            if (isAdmin) {
                                _context3.next = 8;
                                break;
                            }

                            throw new Error('You must be an admin to update a user');

                        case 8:
                            if (args.where.id && isAdmin) {
                                currentId = args.where.id;
                            }

                        case 9:
                            password = null;

                            if (!(0, _stringUtils.validatePassword)(args.data.password)) {
                                _context3.next = 14;
                                break;
                            }

                            _context3.next = 13;
                            return (0, _stringUtils.hashPassword)(args.data.password);

                        case 13:
                            password = _context3.sent;

                        case 14:
                            return _context3.abrupt('return', prisma.mutation.updateUser({
                                where: {
                                    id: currentId
                                },
                                data: _extends({}, args.data, {
                                    password: password
                                })
                            }, info));

                        case 15:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function updateUser(_x9, _x10, _x11, _x12) {
            return _ref6.apply(this, arguments);
        }

        return updateUser;
    }(),
    updateUserRoles: function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(parent, args, _ref7, info) {
            var prisma = _ref7.prisma,
                request = _ref7.request;
            var isAdmin;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return (0, _getuserid.getUserAdmin)(prisma, userId);

                        case 2:
                            isAdmin = _context4.sent;

                            if (isAdmin) {
                                _context4.next = 5;
                                break;
                            }

                            throw new Error('You are not authorized to perform this action.');

                        case 5:
                            return _context4.abrupt('return', prisma.mutation.updateUser({
                                where: args.where,
                                data: {
                                    roles: _extends({}, args.roles)
                                }
                            }, info));

                        case 6:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function updateUserRoles(_x13, _x14, _x15, _x16) {
            return _ref8.apply(this, arguments);
        }

        return updateUserRoles;
    }(),
    login: function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(parent, args, _ref9, info) {
            var prisma = _ref9.prisma,
                request = _ref9.request;
            var userExists, user, userAuth, userPayload;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return prisma.exists.User({
                                email: args.data.email
                            });

                        case 2:
                            userExists = _context5.sent;

                            if (userExists) {
                                _context5.next = 5;
                                break;
                            }

                            throw new Error('No user with that email address was found. Please check your email address.');

                        case 5:
                            _context5.next = 7;
                            return prisma.query.user({
                                where: {
                                    email: args.data.email
                                }
                            });

                        case 7:
                            user = _context5.sent;
                            _context5.next = 10;
                            return _bcryptjs2.default.compare(args.data.password, user.password);

                        case 10:
                            userAuth = _context5.sent;

                            if (userAuth) {
                                _context5.next = 13;
                                break;
                            }

                            throw new Error('That password is not valid. Please try again.');

                        case 13:
                            userPayload = {
                                user: user,
                                token: (0, _getToken2.default)(user.id)
                            };
                            return _context5.abrupt('return', userPayload);

                        case 15:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function login(_x17, _x18, _x19, _x20) {
            return _ref10.apply(this, arguments);
        }

        return login;
    }(),
    createPost: function () {
        var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(parent, args, _ref11, info) {
            var prisma = _ref11.prisma,
                request = _ref11.request;
            var userId, opArgs;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            userId = (0, _getuserid2.default)(request);
                            opArgs = _extends({}, args.data, {
                                author: {
                                    connect: {
                                        id: userId
                                    }
                                },
                                published: args.data.published ? args.data.published : false
                            });
                            return _context6.abrupt('return', prisma.mutation.createPost({
                                data: opArgs
                            }, info));

                        case 3:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        function createPost(_x21, _x22, _x23, _x24) {
            return _ref12.apply(this, arguments);
        }

        return createPost;
    }(),
    deletePost: function () {
        var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(parent, args, _ref13, info) {
            var prisma = _ref13.prisma,
                request = _ref13.request;
            var userId, isAdmin, postExists;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            userId = (0, _getuserid2.default)(request);
                            _context7.next = 3;
                            return (0, _getuserid.getUserAdmin)(prisma, userId);

                        case 3:
                            isAdmin = _context7.sent;
                            _context7.next = 6;
                            return prisma.exists.Post({
                                id: args.id,
                                author: {
                                    id: userId
                                }
                            });

                        case 6:
                            postExists = _context7.sent;

                            if (isAdmin) {
                                _context7.next = 10;
                                break;
                            }

                            if (postExists) {
                                _context7.next = 10;
                                break;
                            }

                            throw new Error('Post does not exist, or you are not authorized to delete this post.');

                        case 10:
                            return _context7.abrupt('return', prisma.mutation.deletePost({
                                where: {
                                    id: args.id
                                }
                            }, info));

                        case 11:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        function deletePost(_x25, _x26, _x27, _x28) {
            return _ref14.apply(this, arguments);
        }

        return deletePost;
    }(),
    updatePost: function () {
        var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(parent, args, _ref15, info) {
            var prisma = _ref15.prisma,
                request = _ref15.request;
            var userId, isAdmin, postExists;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            userId = (0, _getuserid2.default)(request);
                            _context8.next = 3;
                            return (0, _getuserid.getUserAdmin)(prisma, userId);

                        case 3:
                            isAdmin = _context8.sent;
                            _context8.next = 6;
                            return prisma.exists.Post({
                                id: args.id,
                                author: {
                                    id: userId
                                }
                            });

                        case 6:
                            postExists = _context8.sent;

                            if (isAdmin) {
                                _context8.next = 10;
                                break;
                            }

                            if (postExists) {
                                _context8.next = 10;
                                break;
                            }

                            throw new Error('Post does not exist, or you are not authorized to delete this post.');

                        case 10:
                            return _context8.abrupt('return', prisma.mutation.updatePost({
                                where: {
                                    id: args.id
                                },
                                data: args.data
                            }, info));

                        case 11:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, this);
        }));

        function updatePost(_x29, _x30, _x31, _x32) {
            return _ref16.apply(this, arguments);
        }

        return updatePost;
    }(),
    createComment: function () {
        var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(parent, args, _ref17, info) {
            var prisma = _ref17.prisma,
                request = _ref17.request;
            var userId, postExists, post, newComment;
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            userId = (0, _getuserid2.default)(request);
                            _context9.next = 3;
                            return prisma.exists.Post({ id: args.data.post });

                        case 3:
                            postExists = _context9.sent;

                            if (postExists) {
                                _context9.next = 6;
                                break;
                            }

                            throw new Error('Post does not exist');

                        case 6:
                            _context9.next = 8;
                            return prisma.query.post({ where: { id: args.data.post } });

                        case 8:
                            post = _context9.sent;

                            if (post.published) {
                                _context9.next = 11;
                                break;
                            }

                            throw new Error('Post not ready for comments');

                        case 11:
                            newComment = {};

                            newComment.text = args.data.text;
                            newComment.author = {};
                            newComment.author.connect = {};
                            newComment.author.connect.id = userId;

                            newComment.post = {};
                            newComment.post.connect = {};
                            newComment.post.connect.id = args.data.post;

                            return _context9.abrupt('return', prisma.mutation.createComment({
                                data: newComment
                            }, info));

                        case 20:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, this);
        }));

        function createComment(_x33, _x34, _x35, _x36) {
            return _ref18.apply(this, arguments);
        }

        return createComment;
    }(),
    deleteComment: function () {
        var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(parent, args, _ref19, info) {
            var prisma = _ref19.prisma,
                pubsub = _ref19.pubsub;
            return regeneratorRuntime.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            return _context10.abrupt('return', prisma.mutation.deleteComment({
                                where: {
                                    id: args.data.id
                                }
                            }, info));

                        case 1:
                        case 'end':
                            return _context10.stop();
                    }
                }
            }, _callee10, this);
        }));

        function deleteComment(_x37, _x38, _x39, _x40) {
            return _ref20.apply(this, arguments);
        }

        return deleteComment;
    }(),
    updateComment: function () {
        var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(parent, args, _ref21, info) {
            var prisma = _ref21.prisma;
            return regeneratorRuntime.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            return _context11.abrupt('return', prisma.mutation.updateComment({
                                where: {
                                    id: args.id
                                },
                                data: args.data
                            }, info));

                        case 1:
                        case 'end':
                            return _context11.stop();
                    }
                }
            }, _callee11, this);
        }));

        function updateComment(_x41, _x42, _x43, _x44) {
            return _ref22.apply(this, arguments);
        }

        return updateComment;
    }()
};

exports.default = Mutation;