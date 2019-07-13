import getScrollBarSize from './getScrollBarSize';

export default (function (close) {
  if (close) {
    document.body.style.position = '';
    document.body.style.width = '';
    return;
  }
  var scrollBarSize = getScrollBarSize();
  if (scrollBarSize) {
    document.body.style.position = 'relative';
    document.body.style.width = 'calc(100% - ' + scrollBarSize + 'px)';
  }
});