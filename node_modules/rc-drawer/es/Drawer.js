import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ContainerRender from 'rc-util/es/ContainerRender';
import getScrollBarSize from 'rc-util/es/getScrollBarSize';
import KeyCode from 'rc-util/es/KeyCode';

import { dataToArray, transitionEnd, transitionStr, addEventListener, removeEventListener, transformArguments, isNumeric } from './utils';

var IS_REACT_16 = 'createPortal' in ReactDOM;

var currentDrawer = {};
var windowIsUndefined = !(typeof window !== 'undefined' && window.document && window.document.createElement);

var Drawer = function (_React$PureComponent) {
  _inherits(Drawer, _React$PureComponent);

  function Drawer(props) {
    _classCallCheck(this, Drawer);

    var _this = _possibleConstructorReturn(this, (Drawer.__proto__ || Object.getPrototypeOf(Drawer)).call(this, props));

    _initialiseProps.call(_this);

    _this.levelDom = [];
    _this.contentDom = null;
    _this.maskDom = null;
    _this.handlerDom = null;
    _this.firstEnter = props.firstEnter; // 记录首次进入.
    _this.timeout = null;
    _this.drawerId = Number((Date.now() + Math.random()).toString().replace('.', Math.round(Math.random() * 9))).toString(16);
    var open = props.open !== undefined ? props.open : !!props.defaultOpen;
    currentDrawer[_this.drawerId] = open;
    _this.state = {
      open: open
    };
    return _this;
  }

  _createClass(Drawer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!windowIsUndefined) {
        var passiveSupported = false;
        window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
          get: function get() {
            passiveSupported = true;
            return null;
          }
        }));
        this.passive = passiveSupported ? { passive: false } : false;
      }
      var open = this.getOpen();
      if (this.props.handler || open || this.firstEnter) {
        this.getDefault(this.props);
        if (open) {
          this.isOpenChange = true;
        }
        this.forceUpdate();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var open = nextProps.open,
          placement = nextProps.placement,
          getContainer = nextProps.getContainer;

      if (open !== undefined && open !== this.props.open) {
        this.isOpenChange = true;
        // 没渲染 dom 时，获取默认数据;
        var getContainerBool = typeof getContainer === 'function' && typeof this.props.getContainer === 'function' ? this.props.getContainer() === getContainer() : this.props.getContainer === getContainer;
        if (!this.container || !getContainerBool) {
          this.getDefault(nextProps);
        }
        var focus = open && !this.props.open;
        this.setState({
          open: open
        }, function () {
          _this2.domFocus(focus);
        });
      }
      if (placement !== this.props.placement) {
        // test 的 bug, 有动画过场，删除 dom
        this.contentDom = null;
      }
      if (this.props.level !== nextProps.level) {
        this.getParentAndLevelDom(nextProps);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // dom 没渲染时，重走一遍。
      if (!this.firstEnter && this.container) {
        this.forceUpdate();
        this.firstEnter = true;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      delete currentDrawer[this.drawerId];
      delete this.isOpenChange;
      if (this.container) {
        if (this.state.open) {
          this.setLevelDomTransform(false, true);
        }
        document.body.style.overflow = '';
        // 拦不住。。直接删除；
        if (this.props.getContainer) {
          this.container.parentNode.removeChild(this.container);
        }
      }
      this.firstEnter = false;
      clearTimeout(this.timeout);
      // suppport react15
      // 需要 didmount 后也会渲染，直接 unmount 将不会渲染，加上判断.
      if (this.renderComponent && !IS_REACT_16) {
        this.renderComponent({
          afterClose: this.removeContainer,
          onClose: function onClose() {},

          visible: false
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          getContainer = _props.getContainer,
          wrapperClassName = _props.wrapperClassName;

      var open = this.getOpen();
      currentDrawer[this.drawerId] = open ? this.container : open;
      var children = this.getChildToRender(this.firstEnter ? open : false);
      if (!getContainer) {
        return React.createElement(
          'div',
          {
            className: wrapperClassName,
            ref: function ref(c) {
              if (_this3.props.getContainer) {
                return;
              }
              _this3.container = c;
            }
          },
          children
        );
      }
      if (!this.container || !open && !this.firstEnter) {
        return null;
      }
      // suppport react15
      if (!IS_REACT_16) {
        return React.createElement(
          ContainerRender,
          {
            parent: this,
            visible: true,
            autoMount: true,
            autoDestroy: false,
            getComponent: function getComponent() {
              return children;
            },
            getContainer: this.getContainer
          },
          function (_ref) {
            var renderComponent = _ref.renderComponent,
                removeContainer = _ref.removeContainer;

            _this3.renderComponent = renderComponent;
            _this3.removeContainer = removeContainer;
            return null;
          }
        );
      }
      return ReactDOM.createPortal(children, this.container);
    }
  }]);

  return Drawer;
}(React.PureComponent);

Drawer.propTypes = {
  wrapperClassName: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  width: PropTypes.any,
  height: PropTypes.any,
  defaultOpen: PropTypes.bool,
  firstEnter: PropTypes.bool,
  open: PropTypes.bool,
  prefixCls: PropTypes.string,
  placement: PropTypes.string,
  level: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  levelMove: PropTypes.oneOfType([PropTypes.number, PropTypes.func, PropTypes.array]),
  ease: PropTypes.string,
  duration: PropTypes.string,
  getContainer: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object, PropTypes.bool]),
  handler: PropTypes.any,
  onChange: PropTypes.func,
  afterVisibleChange: PropTypes.func,
  onMaskClick: PropTypes.func,
  onHandleClick: PropTypes.func,
  showMask: PropTypes.bool,
  maskStyle: PropTypes.object,
  keyboard: PropTypes.bool
};
Drawer.defaultProps = {
  prefixCls: 'drawer',
  placement: 'left',
  getContainer: 'body',
  level: 'all',
  duration: '.3s',
  ease: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
  onChange: function onChange() {},
  afterVisibleChange: function afterVisibleChange() {},
  handler: React.createElement(
    'div',
    { className: 'drawer-handle' },
    React.createElement('i', { className: 'drawer-handle-icon' })
  ),
  firstEnter: false,
  showMask: true,
  maskStyle: {},
  wrapperClassName: '',
  className: '',
  keyboard: true
};

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.onMaskTouchEnd = function (e) {
    var onMaskClick = _this4.props.onMaskClick;

    if (onMaskClick) {
      onMaskClick(e);
    }
    _this4.onTouchEnd(e, true);
  };

  this.onIconTouchEnd = function (e) {
    var onHandleClick = _this4.props.onHandleClick;

    if (onHandleClick) {
      onHandleClick(e);
    }
    _this4.onTouchEnd(e);
  };

  this.onTouchEnd = function (e, close) {
    if (_this4.props.open !== undefined) {
      return;
    }
    var open = close || _this4.state.open;
    _this4.isOpenChange = true;
    _this4.setState({
      open: !open
    }, function () {
      _this4.domFocus(!open);
    });
  };

  this.onKeyDown = function (e) {
    if (e.keyCode === KeyCode.ESC) {
      var _props2 = _this4.props,
          onMaskClick = _props2.onMaskClick,
          onHandleClick = _props2.onHandleClick;

      e.stopPropagation();
      var onClose = onHandleClick || onMaskClick;
      if (onClose) {
        onClose(e);
      } else {
        _this4.onTouchEnd(e, true);
      }
    }
  };

  this.onWrapperTransitionEnd = function (e) {
    if (e.target === _this4.contentWrapper && e.propertyName.match(/transform$/)) {
      _this4.dom.style.transition = '';
      if (!_this4.state.open && _this4.getCurrentDrawerSome()) {
        document.body.style.overflowX = '';
        if (_this4.maskDom) {
          _this4.maskDom.style.left = '';
          _this4.maskDom.style.width = '';
        }
      }
      var afterVisibleChange = _this4.props.afterVisibleChange;
      var open = _this4.state.open;

      afterVisibleChange(open);
    }
  };

  this.getDefault = function (props) {
    _this4.getParentAndLevelDom(props);
    if (props.getContainer || props.parent) {
      _this4.container = _this4.defaultGetContainer();
    }
  };

  this.getCurrentDrawerSome = function () {
    return !Object.keys(currentDrawer).some(function (key) {
      return currentDrawer[key];
    });
  };

  this.getContainer = function () {
    return _this4.container;
  };

  this.getParentAndLevelDom = function (props) {
    if (windowIsUndefined) {
      return;
    }
    var level = props.level,
        getContainer = props.getContainer;

    _this4.levelDom = [];
    if (getContainer) {
      if (typeof getContainer === 'string') {
        var dom = document.querySelectorAll(getContainer)[0];
        _this4.parent = dom;
      }
      if (typeof getContainer === 'function') {
        _this4.parent = getContainer();
      }
      if (typeof getContainer === 'object' && getContainer instanceof window.HTMLElement) {
        _this4.parent = getContainer;
      }
    }
    if (!getContainer && _this4.container) {
      _this4.parent = _this4.container.parentNode;
    }
    if (level === 'all') {
      var children = Array.prototype.slice.call(_this4.parent.children);
      children.forEach(function (child) {
        if (child.nodeName !== 'SCRIPT' && child.nodeName !== 'STYLE' && child.nodeName !== 'LINK' && child !== _this4.container) {
          _this4.levelDom.push(child);
        }
      });
    } else if (level) {
      dataToArray(level).forEach(function (key) {
        document.querySelectorAll(key).forEach(function (item) {
          _this4.levelDom.push(item);
        });
      });
    }
  };

  this.setLevelDomTransform = function (open, openTransition, placementName, value) {
    var _props3 = _this4.props,
        placement = _props3.placement,
        levelMove = _props3.levelMove,
        duration = _props3.duration,
        ease = _props3.ease,
        onChange = _props3.onChange,
        getContainer = _props3.getContainer,
        showMask = _props3.showMask;

    if (!windowIsUndefined) {
      var right = document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth ? getScrollBarSize(1) : 0;
      _this4.levelDom.forEach(function (dom) {
        if (_this4.isOpenChange || openTransition) {
          /* eslint no-param-reassign: "error" */
          dom.style.transition = 'transform ' + duration + ' ' + ease;
          addEventListener(dom, transitionEnd, _this4.transitionEnd);
          var levelValue = open ? value : 0;
          if (levelMove) {
            var $levelMove = transformArguments(levelMove, { target: dom, open: open });
            levelValue = open ? $levelMove[0] : $levelMove[1] || 0;
          }
          var $value = typeof levelValue === 'number' ? levelValue + 'px' : levelValue;
          var placementPos = placement === 'left' || placement === 'top' ? $value : '-' + $value;
          var mark = placement === 'left' || placement === 'top' ? '-' : '+';
          placementPos = showMask && (placement === 'left' || placement === 'right') && right ? 'calc(' + placementPos + ' ' + mark + ' ' + right + 'px)' : placementPos;
          dom.style.transform = levelValue ? placementName + '(' + placementPos + ')' : '';
          dom.style.msTransform = levelValue ? placementName + '(' + placementPos + ')' : '';
        }
      });
      // 处理 body 滚动
      if (getContainer === 'body' && showMask) {
        var eventArray = ['touchstart'];
        var domArray = [document.body, _this4.maskDom, _this4.handlerDom, _this4.contentDom];
        var widthTransition = 'width ' + duration + ' ' + ease;
        var transformTransition = 'transform ' + duration + ' ' + ease;
        if (open && document.body.style.overflow !== 'hidden') {
          document.body.style.overflow = 'hidden';
          document.body.style.touchAction = 'none';
          if (right) {
            document.body.style.position = 'relative';
            document.body.style.width = 'calc(100% - ' + right + 'px)';
            _this4.dom.style.transition = 'none';
            switch (placement) {
              case 'right':
                _this4.dom.style.transform = 'translateX(-' + right + 'px)';
                _this4.dom.style.msTransform = 'translateX(-' + right + 'px)';
                break;
              case 'top':
              case 'bottom':
                _this4.dom.style.width = 'calc(100% - ' + right + 'px)';
                _this4.dom.style.transform = 'translateZ(0)';
                break;
              default:
                break;
            }
            clearTimeout(_this4.timeout);
            _this4.timeout = setTimeout(function () {
              _this4.dom.style.transition = transformTransition + ',' + widthTransition;
              _this4.dom.style.width = '';
              _this4.dom.style.transform = '';
              _this4.dom.style.msTransform = '';
            });
          }
          // 手机禁滚
          domArray.forEach(function (item, i) {
            if (!item) {
              return;
            }
            addEventListener(item, eventArray[i] || 'touchmove', i ? _this4.removeMoveHandler : _this4.removeStartHandler, _this4.passive);
          });
        } else if (_this4.getCurrentDrawerSome()) {
          document.body.style.overflow = '';
          document.body.style.touchAction = '';
          if ((_this4.isOpenChange || openTransition) && right) {
            document.body.style.position = '';
            document.body.style.width = '';
            if (transitionStr) {
              document.body.style.overflowX = 'hidden';
            }
            _this4.dom.style.transition = 'none';
            var heightTransition = void 0;
            switch (placement) {
              case 'right':
                {
                  _this4.dom.style.transform = 'translateX(' + right + 'px)';
                  _this4.dom.style.msTransform = 'translateX(' + right + 'px)';
                  _this4.dom.style.width = '100%';
                  widthTransition = 'width 0s ' + ease + ' ' + duration;
                  if (_this4.maskDom) {
                    _this4.maskDom.style.left = '-' + right + 'px';
                    _this4.maskDom.style.width = 'calc(100% + ' + right + 'px)';
                  }
                  break;
                }
              case 'top':
              case 'bottom':
                {
                  _this4.dom.style.width = 'calc(100% + ' + right + 'px)';
                  _this4.dom.style.height = '100%';
                  _this4.dom.style.transform = 'translateZ(0)';
                  heightTransition = 'height 0s ' + ease + ' ' + duration;
                  break;
                }
              default:
                break;
            }
            clearTimeout(_this4.timeout);
            _this4.timeout = setTimeout(function () {
              _this4.dom.style.transition = transformTransition + ',' + (heightTransition ? heightTransition + ',' : '') + widthTransition;
              _this4.dom.style.transform = '';
              _this4.dom.style.msTransform = '';
              _this4.dom.style.width = '';
              _this4.dom.style.height = '';
            });
          }
          domArray.forEach(function (item, i) {
            if (!item) {
              return;
            }
            removeEventListener(item, eventArray[i] || 'touchmove', i ? _this4.removeMoveHandler : _this4.removeStartHandler, _this4.passive);
          });
        }
      }
    }
    if (_this4.isOpenChange && _this4.firstEnter) {
      onChange(open);
      _this4.isOpenChange = false;
    }
  };

  this.getChildToRender = function (open) {
    var _classnames;

    var _props4 = _this4.props,
        $wrapperClass = _props4.wrapperClassName,
        className = _props4.className,
        children = _props4.children,
        style = _props4.style,
        width = _props4.width,
        height = _props4.height,
        defaultOpen = _props4.defaultOpen,
        firstEnter = _props4.firstEnter,
        $open = _props4.open,
        prefixCls = _props4.prefixCls,
        placement = _props4.placement,
        level = _props4.level,
        levelMove = _props4.levelMove,
        ease = _props4.ease,
        duration = _props4.duration,
        getContainer = _props4.getContainer,
        handler = _props4.handler,
        onChange = _props4.onChange,
        afterVisibleChange = _props4.afterVisibleChange,
        onMaskClick = _props4.onMaskClick,
        onHandleClick = _props4.onHandleClick,
        showMask = _props4.showMask,
        maskStyle = _props4.maskStyle,
        keyboard = _props4.keyboard,
        props = _objectWithoutProperties(_props4, ['wrapperClassName', 'className', 'children', 'style', 'width', 'height', 'defaultOpen', 'firstEnter', 'open', 'prefixCls', 'placement', 'level', 'levelMove', 'ease', 'duration', 'getContainer', 'handler', 'onChange', 'afterVisibleChange', 'onMaskClick', 'onHandleClick', 'showMask', 'maskStyle', 'keyboard']);

    var wrapperClassName = classnames(prefixCls, (_classnames = {}, _defineProperty(_classnames, prefixCls + '-' + placement, true), _defineProperty(_classnames, prefixCls + '-open', open), _defineProperty(_classnames, className, !!className), _defineProperty(_classnames, 'no-mask', !showMask), _classnames));
    var isOpenChange = _this4.isOpenChange;
    var isHorizontal = placement === 'left' || placement === 'right';
    var placementName = 'translate' + (isHorizontal ? 'X' : 'Y');
    // 百分比与像素动画不同步，第一次打用后全用像素动画。
    // const defaultValue = !this.contentDom || !level ? '100%' : `${value}px`;
    var placementPos = placement === 'left' || placement === 'top' ? '-100%' : '100%';
    var transform = open ? '' : placementName + '(' + placementPos + ')';
    if (isOpenChange === undefined || isOpenChange) {
      var contentValue = _this4.contentDom ? _this4.contentDom.getBoundingClientRect()[isHorizontal ? 'width' : 'height'] : 0;
      var value = (isHorizontal ? width : height) || contentValue;
      _this4.setLevelDomTransform(open, false, placementName, value);
    }
    var handlerChildren = handler && React.cloneElement(handler, {
      onClick: function onClick(e) {
        if (handler.props.onClick) {
          handler.props.onClick();
        }
        _this4.onIconTouchEnd(e);
      },
      ref: function ref(c) {
        _this4.handlerDom = c;
      }
    });
    return React.createElement(
      'div',
      _extends({}, props, {
        tabIndex: -1,
        className: wrapperClassName,
        style: style,
        ref: function ref(c) {
          _this4.dom = c;
        },
        onKeyDown: open && keyboard ? _this4.onKeyDown : null,
        onTransitionEnd: _this4.onWrapperTransitionEnd
      }),
      showMask && React.createElement('div', {
        className: prefixCls + '-mask',
        onClick: _this4.onMaskTouchEnd,
        style: maskStyle,
        ref: function ref(c) {
          _this4.maskDom = c;
        }
      }),
      React.createElement(
        'div',
        {
          className: prefixCls + '-content-wrapper',
          style: {
            transform: transform,
            msTransform: transform,
            width: isNumeric(width) ? width + 'px' : width,
            height: isNumeric(height) ? height + 'px' : height
          },
          ref: function ref(c) {
            _this4.contentWrapper = c;
          }
        },
        React.createElement(
          'div',
          {
            className: prefixCls + '-content',
            ref: function ref(c) {
              _this4.contentDom = c;
            },
            onTouchStart: open && showMask ? _this4.removeStartHandler : null // 跑用例用
            , onTouchMove: open && showMask ? _this4.removeMoveHandler : null // 跑用例用
          },
          children
        ),
        handlerChildren
      )
    );
  };

  this.getOpen = function () {
    return _this4.props.open !== undefined ? _this4.props.open : _this4.state.open;
  };

  this.getTouchParentScroll = function (root, currentTarget, differX, differY) {
    if (!currentTarget || currentTarget === document) {
      return false;
    }
    // root 为 drawer-content 设定了 overflow, 判断为 root 的 parent 时结束滚动；
    if (currentTarget === root.parentNode) {
      return true;
    }

    var isY = Math.max(Math.abs(differX), Math.abs(differY)) === Math.abs(differY);
    var isX = Math.max(Math.abs(differX), Math.abs(differY)) === Math.abs(differX);

    var scrollY = currentTarget.scrollHeight - currentTarget.clientHeight;
    var scrollX = currentTarget.scrollWidth - currentTarget.clientWidth;
    /**
     * <div style="height: 300px">
     *   <div style="height: 900px"></div>
     * </div>
     * 在没设定 overflow: auto 或 scroll 时，currentTarget 里获取不到 scrollTop 或 scrollLeft,
     * 预先用 scrollTo 来滚动，如果取出的值跟滚动前取出不同，则 currnetTarget 被设定了 overflow; 否则就是上面这种。
     */
    var t = currentTarget.scrollTop;
    var l = currentTarget.scrollLeft;
    currentTarget.scrollTop += 1;
    currentTarget.scrollLeft += 1;
    var currentT = currentTarget.scrollTop;
    var currentL = currentTarget.scrollLeft;
    currentTarget.scrollTop -= 1;
    currentTarget.scrollLeft -= 1;
    if (isY && (!scrollY || !(currentT - t) || scrollY && (currentTarget.scrollTop >= scrollY && differY < 0 || currentTarget.scrollTop <= 0 && differY > 0)) || isX && (!scrollX || !(currentL - l) || scrollX && (currentTarget.scrollLeft >= scrollX && differX < 0 || currentTarget.scrollLeft <= 0 && differX > 0))) {
      return _this4.getTouchParentScroll(root, currentTarget.parentNode, differX, differY);
    }
    return false;
  };

  this.domFocus = function (focus) {
    if (_this4.dom && focus) {
      _this4.dom.focus();
    }
  };

  this.removeStartHandler = function (e) {
    if (e.touches.length > 1) {
      return;
    }
    _this4.startPos = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  this.removeMoveHandler = function (e) {
    if (e.changedTouches.length > 1) {
      return;
    }
    var currentTarget = e.currentTarget;
    var differX = e.changedTouches[0].clientX - _this4.startPos.x;
    var differY = e.changedTouches[0].clientY - _this4.startPos.y;
    if (currentTarget === _this4.maskDom || currentTarget === _this4.handlerDom || currentTarget === _this4.contentDom && _this4.getTouchParentScroll(currentTarget, e.target, differX, differY)) {
      e.preventDefault();
    }
  };

  this.transitionEnd = function (e) {
    removeEventListener(e.target, transitionEnd, _this4.transitionEnd);
    e.target.style.transition = '';
  };

  this.defaultGetContainer = function () {
    if (windowIsUndefined) {
      return null;
    }
    var container = document.createElement('div');
    _this4.parent.appendChild(container);
    if (_this4.props.wrapperClassName) {
      container.className = _this4.props.wrapperClassName;
    }
    return container;
  };
};

export default Drawer;