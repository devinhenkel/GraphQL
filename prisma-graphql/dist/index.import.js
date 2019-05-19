'use strict';

var _myModule = require('./myModule');

var _myModule2 = _interopRequireDefault(_myModule);

var _mathModule = require('./mathModule');

var _mathModule2 = _interopRequireDefault(_mathModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_myModule.logString + ' love, ' + _myModule.name + (0, _myModule2.default)('Downers Grove'));

console.log('3+7=' + (0, _mathModule2.default)(3, 7));

var c = 15,
    d = 1.5;
console.log(c + '-' + d + '=' + (0, _mathModule.subtract)(c, d));