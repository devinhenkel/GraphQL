'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getuserid = require('../utils/getuserid');

var _getuserid2 = _interopRequireDefault(_getuserid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var User = {
    email: {
        fragment: 'fragment userId on User { id }',
        resolve: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref, info) {
                var prisma = _ref.prisma,
                    request = _ref.request;
                var userId, isAdmin;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return (0, _getuserid2.default)(request, false);

                            case 2:
                                userId = _context.sent;

                                if (!(parent.id === userId)) {
                                    _context.next = 5;
                                    break;
                                }

                                return _context.abrupt('return', parent.email);

                            case 5:
                                if (!userId) {
                                    _context.next = 11;
                                    break;
                                }

                                _context.next = 8;
                                return (0, _getuserid.getUserAdmin)(prisma, userId);

                            case 8:
                                isAdmin = _context.sent;

                                if (!isAdmin) {
                                    _context.next = 11;
                                    break;
                                }

                                return _context.abrupt('return', parent.email);

                            case 11:
                                return _context.abrupt('return', null);

                            case 12:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function resolve(_x, _x2, _x3, _x4) {
                return _ref2.apply(this, arguments);
            }

            return resolve;
        }()
    },
    fullname: function fullname(parent) {
        return parent.firstname + ' ' + parent.lastname;
    },
    posts: {
        fragment: 'fragment userId on User { id }',
        resolve: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args, _ref3, info) {
                var prisma = _ref3.prisma,
                    request = _ref3.request;
                var currentId, isAdmin, opArgs;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return (0, _getuserid2.default)(request, false);

                            case 2:
                                currentId = _context2.sent;

                                if (!(parent.id === currentId)) {
                                    _context2.next = 5;
                                    break;
                                }

                                return _context2.abrupt('return', parent.posts);

                            case 5:
                                if (!currentId) {
                                    _context2.next = 11;
                                    break;
                                }

                                _context2.next = 8;
                                return (0, _getuserid.getUserAdmin)(prisma, currentId);

                            case 8:
                                isAdmin = _context2.sent;

                                if (!isAdmin) {
                                    _context2.next = 11;
                                    break;
                                }

                                return _context2.abrupt('return', parent.posts);

                            case 11:
                                opArgs = {};

                                opArgs.where = {
                                    author: {
                                        id: parent.id
                                    },
                                    published: true
                                };
                                _context2.next = 15;
                                return prisma.query.posts(opArgs, info);

                            case 15:
                                return _context2.abrupt('return', _context2.sent);

                            case 16:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function resolve(_x5, _x6, _x7, _x8) {
                return _ref4.apply(this, arguments);
            }

            return resolve;
        }()
    }
};

exports.default = User;