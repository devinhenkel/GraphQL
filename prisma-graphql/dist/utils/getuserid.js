'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUserAdmin = exports.getUserRoles = exports.default = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getUserId = function getUserId(request) {
    var requireAuth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var authHeader = request.request ? request.request.headers.authorization : request.connection.context.Authorization;

    if (authHeader) {
        var authToken = authHeader.replace('Bearer ', '');
        var verified = _jsonwebtoken2.default.verify(authToken, 'mysecretkey');
        return verified.userId;
    }

    if (requireAuth) {
        throw new Error('Authentication required.');
    }

    return null;
};

var getUserRoles = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request, prisma) {
        var requireAuth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var userId, opArgs, currentUser;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        userId = getUserId(request, requireAuth);
                        opArgs = {};

                        opArgs.where = { id: userId };
                        _context.next = 5;
                        return prisma.query.user(opArgs, '{username, roles}');

                    case 5:
                        currentUser = _context.sent;
                        return _context.abrupt('return', currentUser.roles);

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function getUserRoles(_x3, _x4) {
        return _ref.apply(this, arguments);
    };
}();

var getUserAdmin = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(prisma, userId) {
        var opArgs, currentUser;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        opArgs = {};

                        opArgs.where = { id: userId };
                        _context2.next = 4;
                        return prisma.query.user(opArgs, '{username, roles}');

                    case 4:
                        currentUser = _context2.sent;
                        return _context2.abrupt('return', currentUser.roles.includes('ADMIN'));

                    case 6:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function getUserAdmin(_x5, _x6) {
        return _ref2.apply(this, arguments);
    };
}();

exports.default = getUserId;
exports.getUserRoles = getUserRoles;
exports.getUserAdmin = getUserAdmin;