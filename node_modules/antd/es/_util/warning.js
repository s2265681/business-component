import warning from 'warning';
var warned = {};
export default (function (valid, component, message) {
  if (!valid && !warned[message]) {
    warning(false, "[antd: ".concat(component, "] ").concat(message));
    warned[message] = true;
  }
});