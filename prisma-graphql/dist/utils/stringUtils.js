'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hashPassword = exports.validatePassword = undefined;

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var validatePassword = function validatePassword(password) {
    var passVal = require('password-validator');

    var schema = new passVal();

    schema.is().min(8).has().uppercase().has().lowercase().has().digits();

    if (!schema.validate(password)) {
        var whyFail = schema.validate(password, { list: true });
        throw new Error('Password does not meet requirements. ' + whyFail);
    }

    return true;
};

var hashPassword = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(password) {
        var hashPass;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _bcryptjs2.default.hash(password, 10);

                    case 2:
                        hashPass = _context.sent;
                        return _context.abrupt('return', hashPass);

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function hashPassword(_x) {
        return _ref.apply(this, arguments);
    };
}();

exports.validatePassword = validatePassword;
exports.hashPassword = hashPassword;