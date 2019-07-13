'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = isAncestorFixed;

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var getParent = _utils2['default'].getParent;
function isAncestorFixed(element) {
  if (_utils2['default'].isWindow(element) || element.nodeType === 9) {
    return false;
  }

  var doc = _utils2['default'].getDocument(element);
  var body = doc.body;
  var parent = null;
  for (parent = getParent(element); parent && parent !== body; parent = getParent(parent)) {
    var positionStyle = _utils2['default'].css(parent, 'position');
    if (positionStyle === 'fixed') {
      return true;
    }
  }
  return false;
}
module.exports = exports['default'];