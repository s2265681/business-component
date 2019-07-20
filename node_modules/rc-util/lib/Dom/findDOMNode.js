'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = findDOMNode;

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Return if a node is a DOM node. Else will return by `findDOMNode`
 */
function findDOMNode(node) {
  if (node instanceof HTMLElement) {
    return node;
  }
  return _reactDom2['default'].findDOMNode(node);
}
module.exports = exports['default'];