'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _getuserid = require('../utils/getuserid');

var _getuserid2 = _interopRequireDefault(_getuserid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Query = {
    me: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref, info) {
            var prisma = _ref.prisma,
                request = _ref.request;
            var userId, userRoles, opArgs;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            userId = (0, _getuserid2.default)(request);
                            _context.next = 3;
                            return (0, _getuserid.getUserAdmin)(prisma, userId);

                        case 3:
                            userRoles = _context.sent;
                            opArgs = {};

                            opArgs.where = { id: userId };
                            _context.next = 8;
                            return prisma.query.user(opArgs, info);

                        case 8:
                            return _context.abrupt('return', _context.sent);

                        case 9:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function me(_x, _x2, _x3, _x4) {
            return _ref2.apply(this, arguments);
        }

        return me;
    }(),

    // passed props (parent, args, context[state], info)
    post: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args, _ref3, info) {
            var prisma = _ref3.prisma,
                request = _ref3.request;
            var userId, opArgs;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return (0, _getuserid2.default)(request, false);

                        case 2:
                            userId = _context2.sent;
                            opArgs = {};


                            opArgs.where = {
                                id: args.where.id
                            };
                            return _context2.abrupt('return', prisma.query.post(opArgs, info));

                        case 6:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function post(_x5, _x6, _x7, _x8) {
            return _ref4.apply(this, arguments);
        }

        return post;
    }(),
    posts: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, args, _ref5, info) {
            var prisma = _ref5.prisma,
                request = _ref5.request;
            var userId, opArgs, isAdmin;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            userId = (0, _getuserid2.default)(request, false);
                            opArgs = {
                                first: args.first,
                                skip: args.skip,
                                after: args.after
                            };


                            if (args.query) {
                                opArgs.where = {
                                    OR: [{ title_contains: args.query }, { title_contains: args.query.toUpperCase() }, { title_contains: args.query.toLowerCase() }, { body_contains: args.query }, { body_contains: args.query.toUpperCase() }, { body_contains: args.query.toUpperCase() }]
                                };
                            }

                            if (userId) {
                                _context3.next = 6;
                                break;
                            }

                            opArgs.where = _extends({}, opArgs.where, {
                                published: true
                            });
                            return _context3.abrupt('return', prisma.query.posts(opArgs, info));

                        case 6:
                            _context3.next = 8;
                            return (0, _getuserid.getUserAdmin)(prisma, userId);

                        case 8:
                            isAdmin = _context3.sent;


                            if (!isAdmin) {
                                opArgs.where = _extends({}, opArgs.where, {
                                    OR: [{
                                        author: {
                                            id: userId
                                        }
                                    }, { published: true }]
                                });
                            }
                            return _context3.abrupt('return', prisma.query.posts(opArgs, info));

                        case 11:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function posts(_x9, _x10, _x11, _x12) {
            return _ref6.apply(this, arguments);
        }

        return posts;
    }(),
    myPosts: function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(parent, args, _ref7, info) {
            var prisma = _ref7.prisma,
                request = _ref7.request;
            var userId, opArgs;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            userId = (0, _getuserid2.default)(request);
                            opArgs = {
                                first: args.first,
                                skip: args.skip,
                                after: args.after
                            };


                            opArgs.where = {
                                author: {
                                    id: userId
                                }
                            };

                            if (args.query) {
                                opArgs.where = _extends({}, opArgs.where, {
                                    OR: [{ title_contains: args.query }, { title_contains: args.query.toUpperCase() }, { title_contains: args.query.toLowerCase() }, { body_contains: args.query }, { body_contains: args.query.toUpperCase() }, { body_contains: args.query.toUpperCase() }]
                                });
                            }
                            _context4.next = 6;
                            return prisma.query.posts(opArgs, info);

                        case 6:
                            return _context4.abrupt('return', _context4.sent);

                        case 7:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function myPosts(_x13, _x14, _x15, _x16) {
            return _ref8.apply(this, arguments);
        }

        return myPosts;
    }(),
    users: function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(parent, args, _ref9, info) {
            var prisma = _ref9.prisma,
                request = _ref9.request;
            var userId, isAdmin, opArgs;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            userId = (0, _getuserid2.default)(request, false);
                            _context5.next = 3;
                            return (0, _getuserid.getUserAdmin)(prisma, userId);

                        case 3:
                            isAdmin = _context5.sent;
                            opArgs = {
                                first: args.first,
                                skip: args.skip,
                                after: args.after

                                /* if (!isAdmin) {
                                    opArgs.where = { id: userId }
                                    return prisma.query.users(opArgs, info)
                                }  */

                            };
                            if (args.query) {
                                opArgs.where = {
                                    OR: [{ firstname_contains: args.query }, { firstname_contains: args.query.toUpperCase() }, { firstname_contains: args.query.toLowerCase() }, { lastname_contains: args.query }, { lastname_contains: args.query.toUpperCase() }, { lastname_contains: args.query.toUpperCase() }]
                                };
                            }
                            return _context5.abrupt('return', prisma.query.users(opArgs, info));

                        case 7:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function users(_x17, _x18, _x19, _x20) {
            return _ref10.apply(this, arguments);
        }

        return users;
    }(),

    user: function user(parent, args, _ref11, info) {
        var prisma = _ref11.prisma;

        var opArgs = {};
        if (args.where) {
            opArgs.where = args.where;
        }
        return prisma.query.user(opArgs, info);
    },
    comments: function comments(parent, args, _ref12, info) {
        var db = _ref12.db,
            prisma = _ref12.prisma;

        var opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after
        };
        if (args.where) {
            opArgs.where = args.where;
        }
        return prisma.query.comments(opArgs, info);
        /* return db.COMMENTS */
    },

    comment: function comment(parent, args, _ref13, info) {
        var db = _ref13.db;

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