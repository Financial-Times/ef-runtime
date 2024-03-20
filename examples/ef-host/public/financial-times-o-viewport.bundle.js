(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["financial-times-o-viewport"],{

/***/ "2483286d":
/*!***************************************************************!*\
  !*** ./node_modules/@financial-times/o-viewport/src/utils.js ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _financial_times_o_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @financial-times/o-utils */ \"6d36580f\");\n\nlet debug;\n\n/**\n *\n * @param {string} eventType the name of the event\n * @param {object} data the payload of the event\n * @param {EventTarget} target the target of the event\n */\nfunction broadcast(eventType, data, target) {\n  target = target || document.body;\n  if (debug) {\n    // eslint-disable-next-line no-console\n    console.log('o-viewport', eventType, data);\n  }\n  target.dispatchEvent(new CustomEvent('oViewport.' + eventType, {\n    detail: data,\n    bubbles: true\n  }));\n}\n\n/**\n * Get the viewport height.\n *\n * @param {boolean} ignoreScrollbars [false] - set to true to discount scrollbar height.\n * @returns {number} viewport height\n */\nfunction getHeight(ignoreScrollbars) {\n  return ignoreScrollbars ? document.documentElement.clientHeight : Math.max(document.documentElement.clientHeight, window.innerHeight || 0);\n}\n\n/**\n * Get the viewport width.\n *\n * @param {boolean} ignoreScrollbars [false] - set to true to discount scrollbar width\n * @returns {number} viewport width\n */\nfunction getWidth(ignoreScrollbars) {\n  return ignoreScrollbars ? document.documentElement.clientWidth : Math.max(document.documentElement.clientWidth, window.innerWidth || 0);\n}\n\n/**\n * Viewport size.\n *\n * @typedef {object} Size\n * @property {number} height viewport height\n * @property {number} width viewport width\n */\n\n/**\n * Get the viewport width and height.\n *\n * @param {boolean} ignoreScrollbars [false] - set to true to discount scrollbar width/height.\n * @returns {Size} viewport width and height object\n */\nfunction getSize(ignoreScrollbars) {\n  return {\n    height: getHeight(ignoreScrollbars),\n    width: getWidth(ignoreScrollbars)\n  };\n}\n\n/**\n * Scroll position.\n *\n * @typedef {object} ScrollPosition\n * @property {number} height - `document.body.scrollHeight`\n * @property {number} width - `document.body.scrollWidth`\n * @property {number} left - `window.pageXOffset || window.scrollX`\n * @property {number} top - `window.pageYOffset || window.scrollY`\n */\n\n/**\n * @returns {ScrollPosition} current scroll info\n */\nfunction getScrollPosition() {\n  return {\n    height: document.body.scrollHeight,\n    width: document.body.scrollWidth,\n    left: window.pageXOffset || window.scrollX,\n    top: window.pageYOffset || window.scrollY\n  };\n}\n\n/**\n * @returns {string} - 'portrait' or 'landscape'\n */\nfunction getOrientation() {\n  const orientation = window.screen.orientation;\n  if (orientation) {\n    return typeof orientation === 'string' ? orientation.split('-')[0] : orientation.type.split('-')[0];\n  } else if (window.matchMedia) {\n    return window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape';\n  } else {\n    return getHeight() >= getWidth() ? 'portrait' : 'landscape';\n  }\n}\n\n/**\n * @returns {boolean} - true if the viewport is visible\n */\nfunction getVisibility() {\n  return document.hidden;\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  debug: function () {\n    debug = true;\n  },\n  broadcast,\n  getWidth,\n  getHeight,\n  getSize,\n  getScrollPosition,\n  getVisibility,\n  getOrientation,\n  debounce: _financial_times_o_utils__WEBPACK_IMPORTED_MODULE_0__[\"debounce\"],\n  throttle: _financial_times_o_utils__WEBPACK_IMPORTED_MODULE_0__[\"throttle\"]\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjQ4MzI4NmQuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9vLXZpZXdwb3J0L3NyYy91dGlscy5qcz85MDJhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFV0aWxzIGZyb20gJ0BmaW5hbmNpYWwtdGltZXMvby11dGlscyc7XG5cbmxldCBkZWJ1ZztcblxuLyoqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSB0aGUgbmFtZSBvZiB0aGUgZXZlbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIHRoZSBwYXlsb2FkIG9mIHRoZSBldmVudFxuICogQHBhcmFtIHtFdmVudFRhcmdldH0gdGFyZ2V0IHRoZSB0YXJnZXQgb2YgdGhlIGV2ZW50XG4gKi9cbmZ1bmN0aW9uIGJyb2FkY2FzdChldmVudFR5cGUsIGRhdGEsIHRhcmdldCkge1xuXHR0YXJnZXQgPSB0YXJnZXQgfHwgZG9jdW1lbnQuYm9keTtcblxuXHRpZiAoZGVidWcpIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuXHRcdGNvbnNvbGUubG9nKCdvLXZpZXdwb3J0JywgZXZlbnRUeXBlLCBkYXRhKTtcblx0fVxuXG5cdHRhcmdldC5kaXNwYXRjaEV2ZW50KFxuXHRcdG5ldyBDdXN0b21FdmVudCgnb1ZpZXdwb3J0LicgKyBldmVudFR5cGUsIHtcblx0XHRcdGRldGFpbDogZGF0YSxcblx0XHRcdGJ1YmJsZXM6IHRydWUsXG5cdFx0fSlcblx0KTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHZpZXdwb3J0IGhlaWdodC5cbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlnbm9yZVNjcm9sbGJhcnMgW2ZhbHNlXSAtIHNldCB0byB0cnVlIHRvIGRpc2NvdW50IHNjcm9sbGJhciBoZWlnaHQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSB2aWV3cG9ydCBoZWlnaHRcbiAqL1xuZnVuY3Rpb24gZ2V0SGVpZ2h0KGlnbm9yZVNjcm9sbGJhcnMpIHtcblx0cmV0dXJuIGlnbm9yZVNjcm9sbGJhcnNcblx0XHQ/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcblx0XHQ6IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHZpZXdwb3J0IHdpZHRoLlxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaWdub3JlU2Nyb2xsYmFycyBbZmFsc2VdIC0gc2V0IHRvIHRydWUgdG8gZGlzY291bnQgc2Nyb2xsYmFyIHdpZHRoXG4gKiBAcmV0dXJucyB7bnVtYmVyfSB2aWV3cG9ydCB3aWR0aFxuICovXG5mdW5jdGlvbiBnZXRXaWR0aChpZ25vcmVTY3JvbGxiYXJzKSB7XG5cdHJldHVybiBpZ25vcmVTY3JvbGxiYXJzXG5cdFx0PyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGhcblx0XHQ6IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCk7XG59XG5cbi8qKlxuICogVmlld3BvcnQgc2l6ZS5cbiAqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBTaXplXG4gKiBAcHJvcGVydHkge251bWJlcn0gaGVpZ2h0IHZpZXdwb3J0IGhlaWdodFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHdpZHRoIHZpZXdwb3J0IHdpZHRoXG4gKi9cblxuLyoqXG4gKiBHZXQgdGhlIHZpZXdwb3J0IHdpZHRoIGFuZCBoZWlnaHQuXG4gKlxuICogQHBhcmFtIHtib29sZWFufSBpZ25vcmVTY3JvbGxiYXJzIFtmYWxzZV0gLSBzZXQgdG8gdHJ1ZSB0byBkaXNjb3VudCBzY3JvbGxiYXIgd2lkdGgvaGVpZ2h0LlxuICogQHJldHVybnMge1NpemV9IHZpZXdwb3J0IHdpZHRoIGFuZCBoZWlnaHQgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGdldFNpemUoaWdub3JlU2Nyb2xsYmFycykge1xuXHRyZXR1cm4ge1xuXHRcdGhlaWdodDogZ2V0SGVpZ2h0KGlnbm9yZVNjcm9sbGJhcnMpLFxuXHRcdHdpZHRoOiBnZXRXaWR0aChpZ25vcmVTY3JvbGxiYXJzKSxcblx0fTtcbn1cblxuLyoqXG4gKiBTY3JvbGwgcG9zaXRpb24uXG4gKlxuICogQHR5cGVkZWYge29iamVjdH0gU2Nyb2xsUG9zaXRpb25cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBoZWlnaHQgLSBgZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHRgXG4gKiBAcHJvcGVydHkge251bWJlcn0gd2lkdGggLSBgZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aGBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBsZWZ0IC0gYHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWGBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB0b3AgLSBgd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxZYFxuICovXG5cbi8qKlxuICogQHJldHVybnMge1Njcm9sbFBvc2l0aW9ufSBjdXJyZW50IHNjcm9sbCBpbmZvXG4gKi9cbmZ1bmN0aW9uIGdldFNjcm9sbFBvc2l0aW9uKCkge1xuXHRyZXR1cm4ge1xuXHRcdGhlaWdodDogZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQsXG5cdFx0d2lkdGg6IGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGgsXG5cdFx0bGVmdDogd2luZG93LnBhZ2VYT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxYLFxuXHRcdHRvcDogd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxZLFxuXHR9O1xufVxuXG4vKipcbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gJ3BvcnRyYWl0JyBvciAnbGFuZHNjYXBlJ1xuICovXG5mdW5jdGlvbiBnZXRPcmllbnRhdGlvbigpIHtcblx0Y29uc3Qgb3JpZW50YXRpb24gPSB3aW5kb3cuc2NyZWVuLm9yaWVudGF0aW9uO1xuXHRpZiAob3JpZW50YXRpb24pIHtcblx0XHRyZXR1cm4gdHlwZW9mIG9yaWVudGF0aW9uID09PSAnc3RyaW5nJ1xuXHRcdFx0PyBvcmllbnRhdGlvbi5zcGxpdCgnLScpWzBdXG5cdFx0XHQ6IG9yaWVudGF0aW9uLnR5cGUuc3BsaXQoJy0nKVswXTtcblx0fSBlbHNlIGlmICh3aW5kb3cubWF0Y2hNZWRpYSkge1xuXHRcdHJldHVybiB3aW5kb3cubWF0Y2hNZWRpYSgnKG9yaWVudGF0aW9uOiBwb3J0cmFpdCknKS5tYXRjaGVzXG5cdFx0XHQ/ICdwb3J0cmFpdCdcblx0XHRcdDogJ2xhbmRzY2FwZSc7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIGdldEhlaWdodCgpID49IGdldFdpZHRoKCkgPyAncG9ydHJhaXQnIDogJ2xhbmRzY2FwZSc7XG5cdH1cbn1cblxuLyoqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSB0cnVlIGlmIHRoZSB2aWV3cG9ydCBpcyB2aXNpYmxlXG4gKi9cbmZ1bmN0aW9uIGdldFZpc2liaWxpdHkoKSB7XG5cdHJldHVybiBkb2N1bWVudC5oaWRkZW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0ZGVidWc6IGZ1bmN0aW9uICgpIHtcblx0XHRkZWJ1ZyA9IHRydWU7XG5cdH0sXG5cdGJyb2FkY2FzdCxcblx0Z2V0V2lkdGgsXG5cdGdldEhlaWdodCxcblx0Z2V0U2l6ZSxcblx0Z2V0U2Nyb2xsUG9zaXRpb24sXG5cdGdldFZpc2liaWxpdHksXG5cdGdldE9yaWVudGF0aW9uLFxuXHRkZWJvdW5jZTogVXRpbHMuZGVib3VuY2UsXG5cdHRocm90dGxlOiBVdGlscy50aHJvdHRsZSxcbn07XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///2483286d\n");

/***/ }),

/***/ "3c85f3e3":
/*!**********************************************************!*\
  !*** ./node_modules/@financial-times/o-viewport/main.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/utils.js */ \"2483286d\");\n\nconst throttle = _src_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].throttle;\nconst debounce = _src_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].debounce;\nconst listeners = {};\nconst intervals = {\n  resize: 100,\n  orientation: 100,\n  visibility: 100,\n  scroll: 100\n};\n\n/**\n *\n * @param {string} eventType - The type of event to throttle for this duration.\n * @param {number} interval - The duration to throttle in ms.\n * @returns {void}\n * @example\n * \t   // throttle for different events at different durations\n *     setThrottleInterval('scroll', 100)\n *     setThrottleInterval('resize', 300)\n *     setThrottleInterval('orientation', 30)\n *     setThrottleInterval('visibility', 30)\n * \t\t// throttle all events at 30ms\n *     setThrottleInterval(30);\n */\nfunction setThrottleInterval(eventType, interval) {\n  if (typeof arguments[0] === 'number') {\n    setThrottleInterval('scroll', arguments[0]);\n    setThrottleInterval('resize', arguments[1]);\n    setThrottleInterval('orientation', arguments[2]);\n    setThrottleInterval('visibility', arguments[3]);\n  } else if (interval) {\n    intervals[eventType] = interval;\n  }\n}\n\n/**\n * @access private\n */\nfunction listenToResize() {\n  if (listeners.resize) {\n    return;\n  }\n  const eventType = 'resize';\n  const handler = debounce(function (ev) {\n    _src_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].broadcast('resize', {\n      viewport: _src_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getSize(),\n      originalEvent: ev\n    });\n  }, intervals.resize);\n  window.addEventListener(eventType, handler);\n  listeners.resize = {\n    eventType: eventType,\n    handler: handler\n  };\n}\n\n/**\n * @access private\n */\nfunction listenToOrientation() {\n  if (listeners.orientation) {\n    return;\n  }\n  const eventType = 'orientationchange';\n  const handler = debounce(function (ev) {\n    _src_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].broadcast('orientation', {\n      viewport: _src_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getSize(),\n      orientation: _src_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getOrientation(),\n      originalEvent: ev\n    });\n  }, intervals.orientation);\n  window.addEventListener(eventType, handler);\n  listeners.orientation = {\n    eventType: eventType,\n    handler: handler\n  };\n}\n\n/**\n * @access private\n */\nfunction listenToVisibility() {\n  if (listeners.visibility) {\n    return;\n  }\n  const eventType = 'visibilitychange';\n  const handler = debounce(function (ev) {\n    _src_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].broadcast('visibility', {\n      hidden: _src_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getVisibility(),\n      originalEvent: ev\n    });\n  }, intervals.visibility);\n  window.addEventListener(eventType, handler);\n  listeners.visibility = {\n    eventType: eventType,\n    handler: handler\n  };\n}\n\n/**\n * @access private\n */\nfunction listenToScroll() {\n  if (listeners.scroll) {\n    return;\n  }\n  const eventType = 'scroll';\n  const handler = throttle(function (ev) {\n    const scrollPos = _src_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getScrollPosition();\n    _src_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].broadcast('scroll', {\n      viewport: _src_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getSize(),\n      scrollHeight: scrollPos.height,\n      scrollLeft: scrollPos.left,\n      scrollTop: scrollPos.top,\n      scrollWidth: scrollPos.width,\n      originalEvent: ev\n    });\n  }, intervals.scroll);\n  window.addEventListener(eventType, handler);\n  listeners.scroll = {\n    eventType: eventType,\n    handler: handler\n  };\n}\n\n/**\n * Start listening for an event(s).\n *\n * @param {string} eventType - The event to start listening for. One of `resize`, `scroll`, `orientation`, `visibility` or `all`.\n * @example\n * \t\t// Start listening for all events.\n * \t\toViewport.listenTo('all');\n *\n * \t\t// It is now possible to listen for debounce o-viewport events such as `oViewport.orientation`.\n *      document.body.addEventListener('oViewport.orientation', function(event) {\n *      \tconsole.log(event.type); // oViewport.orientation\n *      });\n */\nfunction listenTo(eventType) {\n  if (eventType === 'resize' || eventType === 'all') {\n    listenToResize();\n  }\n  if (eventType === 'scroll' || eventType === 'all') {\n    listenToScroll();\n  }\n  if (eventType === 'orientation' || eventType === 'all') {\n    listenToOrientation();\n  }\n  if (eventType === 'visibility' || eventType === 'all') {\n    listenToVisibility();\n  }\n}\n\n/**\n * Stop listening for an event(s).\n *\n * @param {string} eventType - The event to stop listening for. One of `resize`, `scroll`, `orientation`, `visibility` or `all`.\n * @example\n * \t\t// Start listening for all events.\n * \t\toViewport.listenTo('all');\n * \t\t// We're done. Stop listening for all events.\n * \t\toViewport.stopListeningTo('all');\n */\nfunction stopListeningTo(eventType) {\n  if (eventType === 'all') {\n    Object.keys(listeners).forEach(stopListeningTo);\n  } else if (listeners[eventType]) {\n    window.removeEventListener(listeners[eventType].eventType, listeners[eventType].handler);\n    delete listeners[eventType];\n  }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  debug: function () {\n    _src_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].debug();\n  },\n  listenTo,\n  stopListeningTo,\n  setThrottleInterval,\n  getOrientation: _src_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getOrientation,\n  getSize: _src_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getSize,\n  getScrollPosition: _src_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getScrollPosition,\n  getVisibility: _src_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getVisibility\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiM2M4NWYzZTMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9vLXZpZXdwb3J0L21haW4uanM/NDBhMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXRpbHMgZnJvbSAnLi9zcmMvdXRpbHMuanMnO1xuXG5jb25zdCB0aHJvdHRsZSA9IHV0aWxzLnRocm90dGxlO1xuY29uc3QgZGVib3VuY2UgPSB1dGlscy5kZWJvdW5jZTtcblxuY29uc3QgbGlzdGVuZXJzID0ge307XG5jb25zdCBpbnRlcnZhbHMgPSB7XG5cdHJlc2l6ZTogMTAwLFxuXHRvcmllbnRhdGlvbjogMTAwLFxuXHR2aXNpYmlsaXR5OiAxMDAsXG5cdHNjcm9sbDogMTAwXG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIHR5cGUgb2YgZXZlbnQgdG8gdGhyb3R0bGUgZm9yIHRoaXMgZHVyYXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gaW50ZXJ2YWwgLSBUaGUgZHVyYXRpb24gdG8gdGhyb3R0bGUgaW4gbXMuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBleGFtcGxlXG4gKiBcdCAgIC8vIHRocm90dGxlIGZvciBkaWZmZXJlbnQgZXZlbnRzIGF0IGRpZmZlcmVudCBkdXJhdGlvbnNcbiAqICAgICBzZXRUaHJvdHRsZUludGVydmFsKCdzY3JvbGwnLCAxMDApXG4gKiAgICAgc2V0VGhyb3R0bGVJbnRlcnZhbCgncmVzaXplJywgMzAwKVxuICogICAgIHNldFRocm90dGxlSW50ZXJ2YWwoJ29yaWVudGF0aW9uJywgMzApXG4gKiAgICAgc2V0VGhyb3R0bGVJbnRlcnZhbCgndmlzaWJpbGl0eScsIDMwKVxuICogXHRcdC8vIHRocm90dGxlIGFsbCBldmVudHMgYXQgMzBtc1xuICogICAgIHNldFRocm90dGxlSW50ZXJ2YWwoMzApO1xuICovXG5mdW5jdGlvbiBzZXRUaHJvdHRsZUludGVydmFsKGV2ZW50VHlwZSwgaW50ZXJ2YWwpIHtcblx0aWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdudW1iZXInKSB7XG5cdFx0c2V0VGhyb3R0bGVJbnRlcnZhbCgnc2Nyb2xsJywgYXJndW1lbnRzWzBdKTtcblx0XHRzZXRUaHJvdHRsZUludGVydmFsKCdyZXNpemUnLCBhcmd1bWVudHNbMV0pO1xuXHRcdHNldFRocm90dGxlSW50ZXJ2YWwoJ29yaWVudGF0aW9uJywgYXJndW1lbnRzWzJdKTtcblx0XHRzZXRUaHJvdHRsZUludGVydmFsKCd2aXNpYmlsaXR5JywgYXJndW1lbnRzWzNdKTtcblx0fSBlbHNlIGlmIChpbnRlcnZhbCkge1xuXHRcdGludGVydmFsc1tldmVudFR5cGVdID0gaW50ZXJ2YWw7XG5cdH1cbn1cblxuLyoqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbGlzdGVuVG9SZXNpemUoKSB7XG5cdGlmIChsaXN0ZW5lcnMucmVzaXplKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGNvbnN0IGV2ZW50VHlwZSA9ICdyZXNpemUnO1xuXHRjb25zdCBoYW5kbGVyID0gZGVib3VuY2UoZnVuY3Rpb24oZXYpIHtcblx0XHR1dGlscy5icm9hZGNhc3QoJ3Jlc2l6ZScsIHtcblx0XHRcdHZpZXdwb3J0OiB1dGlscy5nZXRTaXplKCksXG5cdFx0XHRvcmlnaW5hbEV2ZW50OiBldlxuXHRcdH0pO1xuXHR9LCBpbnRlcnZhbHMucmVzaXplKTtcblxuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlcik7XG5cdGxpc3RlbmVycy5yZXNpemUgPSB7XG5cdFx0ZXZlbnRUeXBlOiBldmVudFR5cGUsXG5cdFx0aGFuZGxlcjogaGFuZGxlclxuXHR9O1xufVxuXG4vKipcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBsaXN0ZW5Ub09yaWVudGF0aW9uKCkge1xuXG5cdGlmIChsaXN0ZW5lcnMub3JpZW50YXRpb24pIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBldmVudFR5cGUgPSAnb3JpZW50YXRpb25jaGFuZ2UnO1xuXHRjb25zdCBoYW5kbGVyID0gZGVib3VuY2UoZnVuY3Rpb24oZXYpIHtcblx0XHR1dGlscy5icm9hZGNhc3QoJ29yaWVudGF0aW9uJywge1xuXHRcdFx0dmlld3BvcnQ6IHV0aWxzLmdldFNpemUoKSxcblx0XHRcdG9yaWVudGF0aW9uOiB1dGlscy5nZXRPcmllbnRhdGlvbigpLFxuXHRcdFx0b3JpZ2luYWxFdmVudDogZXZcblx0XHR9KTtcblx0fSwgaW50ZXJ2YWxzLm9yaWVudGF0aW9uKTtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIpO1xuXHRsaXN0ZW5lcnMub3JpZW50YXRpb24gPSB7XG5cdFx0ZXZlbnRUeXBlOiBldmVudFR5cGUsXG5cdFx0aGFuZGxlcjogaGFuZGxlclxuXHR9O1xufVxuXG4vKipcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBsaXN0ZW5Ub1Zpc2liaWxpdHkoKSB7XG5cblx0aWYgKGxpc3RlbmVycy52aXNpYmlsaXR5KSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgZXZlbnRUeXBlID0gJ3Zpc2liaWxpdHljaGFuZ2UnO1xuXHRjb25zdCBoYW5kbGVyID0gZGVib3VuY2UoZnVuY3Rpb24oZXYpIHtcblx0XHR1dGlscy5icm9hZGNhc3QoJ3Zpc2liaWxpdHknLCB7XG5cdFx0XHRoaWRkZW46IHV0aWxzLmdldFZpc2liaWxpdHkoKSxcblx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2XG5cdFx0fSk7XG5cdH0sIGludGVydmFscy52aXNpYmlsaXR5KTtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIpO1xuXG5cdGxpc3RlbmVycy52aXNpYmlsaXR5ID0ge1xuXHRcdGV2ZW50VHlwZTogZXZlbnRUeXBlLFxuXHRcdGhhbmRsZXI6IGhhbmRsZXJcblx0fTtcbn1cblxuLyoqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbGlzdGVuVG9TY3JvbGwoKSB7XG5cblx0aWYgKGxpc3RlbmVycy5zY3JvbGwpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBldmVudFR5cGUgPSAnc2Nyb2xsJztcblx0Y29uc3QgaGFuZGxlciA9IHRocm90dGxlKGZ1bmN0aW9uKGV2KSB7XG5cdFx0Y29uc3Qgc2Nyb2xsUG9zID0gdXRpbHMuZ2V0U2Nyb2xsUG9zaXRpb24oKTtcblx0XHR1dGlscy5icm9hZGNhc3QoJ3Njcm9sbCcsIHtcblx0XHRcdHZpZXdwb3J0OiB1dGlscy5nZXRTaXplKCksXG5cdFx0XHRzY3JvbGxIZWlnaHQ6IHNjcm9sbFBvcy5oZWlnaHQsXG5cdFx0XHRzY3JvbGxMZWZ0OiBzY3JvbGxQb3MubGVmdCxcblx0XHRcdHNjcm9sbFRvcDogc2Nyb2xsUG9zLnRvcCxcblx0XHRcdHNjcm9sbFdpZHRoOiBzY3JvbGxQb3Mud2lkdGgsXG5cdFx0XHRvcmlnaW5hbEV2ZW50OiBldlxuXHRcdH0pO1xuXHR9LCBpbnRlcnZhbHMuc2Nyb2xsKTtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIpO1xuXHRsaXN0ZW5lcnMuc2Nyb2xsID0ge1xuXHRcdGV2ZW50VHlwZTogZXZlbnRUeXBlLFxuXHRcdGhhbmRsZXI6IGhhbmRsZXJcblx0fTtcbn1cblxuLyoqXG4gKiBTdGFydCBsaXN0ZW5pbmcgZm9yIGFuIGV2ZW50KHMpLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGUgLSBUaGUgZXZlbnQgdG8gc3RhcnQgbGlzdGVuaW5nIGZvci4gT25lIG9mIGByZXNpemVgLCBgc2Nyb2xsYCwgYG9yaWVudGF0aW9uYCwgYHZpc2liaWxpdHlgIG9yIGBhbGxgLlxuICogQGV4YW1wbGVcbiAqIFx0XHQvLyBTdGFydCBsaXN0ZW5pbmcgZm9yIGFsbCBldmVudHMuXG4gKiBcdFx0b1ZpZXdwb3J0Lmxpc3RlblRvKCdhbGwnKTtcbiAqXG4gKiBcdFx0Ly8gSXQgaXMgbm93IHBvc3NpYmxlIHRvIGxpc3RlbiBmb3IgZGVib3VuY2Ugby12aWV3cG9ydCBldmVudHMgc3VjaCBhcyBgb1ZpZXdwb3J0Lm9yaWVudGF0aW9uYC5cbiAqICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdvVmlld3BvcnQub3JpZW50YXRpb24nLCBmdW5jdGlvbihldmVudCkge1xuICogICAgICBcdGNvbnNvbGUubG9nKGV2ZW50LnR5cGUpOyAvLyBvVmlld3BvcnQub3JpZW50YXRpb25cbiAqICAgICAgfSk7XG4gKi9cbmZ1bmN0aW9uIGxpc3RlblRvKGV2ZW50VHlwZSkge1xuXHRpZiAoZXZlbnRUeXBlID09PSAncmVzaXplJyB8fCBldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0bGlzdGVuVG9SZXNpemUoKTtcblx0fVxuXG5cdGlmIChldmVudFR5cGUgPT09ICdzY3JvbGwnIHx8IGV2ZW50VHlwZSA9PT0gJ2FsbCcpIHtcblx0XHRsaXN0ZW5Ub1Njcm9sbCgpO1xuXHR9XG5cblx0aWYgKGV2ZW50VHlwZSA9PT0gJ29yaWVudGF0aW9uJyB8fCBldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0bGlzdGVuVG9PcmllbnRhdGlvbigpO1xuXHR9XG5cblx0aWYgKGV2ZW50VHlwZSA9PT0gJ3Zpc2liaWxpdHknIHx8IGV2ZW50VHlwZSA9PT0gJ2FsbCcpIHtcblx0XHRsaXN0ZW5Ub1Zpc2liaWxpdHkoKTtcblx0fVxufVxuXG4vKipcbiAqIFN0b3AgbGlzdGVuaW5nIGZvciBhbiBldmVudChzKS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIGV2ZW50IHRvIHN0b3AgbGlzdGVuaW5nIGZvci4gT25lIG9mIGByZXNpemVgLCBgc2Nyb2xsYCwgYG9yaWVudGF0aW9uYCwgYHZpc2liaWxpdHlgIG9yIGBhbGxgLlxuICogQGV4YW1wbGVcbiAqIFx0XHQvLyBTdGFydCBsaXN0ZW5pbmcgZm9yIGFsbCBldmVudHMuXG4gKiBcdFx0b1ZpZXdwb3J0Lmxpc3RlblRvKCdhbGwnKTtcbiAqIFx0XHQvLyBXZSdyZSBkb25lLiBTdG9wIGxpc3RlbmluZyBmb3IgYWxsIGV2ZW50cy5cbiAqIFx0XHRvVmlld3BvcnQuc3RvcExpc3RlbmluZ1RvKCdhbGwnKTtcbiAqL1xuZnVuY3Rpb24gc3RvcExpc3RlbmluZ1RvKGV2ZW50VHlwZSkge1xuXHRpZiAoZXZlbnRUeXBlID09PSAnYWxsJykge1xuXHRcdE9iamVjdC5rZXlzKGxpc3RlbmVycykuZm9yRWFjaChzdG9wTGlzdGVuaW5nVG8pO1xuXHR9IGVsc2UgaWYgKGxpc3RlbmVyc1tldmVudFR5cGVdKSB7XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXJzW2V2ZW50VHlwZV0uZXZlbnRUeXBlLCBsaXN0ZW5lcnNbZXZlbnRUeXBlXS5oYW5kbGVyKTtcblx0XHRkZWxldGUgbGlzdGVuZXJzW2V2ZW50VHlwZV07XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRkZWJ1ZzogZnVuY3Rpb24gKCkge1xuXHRcdHV0aWxzLmRlYnVnKCk7XG5cdH0sXG5cdGxpc3RlblRvLFxuXHRzdG9wTGlzdGVuaW5nVG8sXG5cdHNldFRocm90dGxlSW50ZXJ2YWwsXG5cdGdldE9yaWVudGF0aW9uOiB1dGlscy5nZXRPcmllbnRhdGlvbixcblx0Z2V0U2l6ZTogdXRpbHMuZ2V0U2l6ZSxcblx0Z2V0U2Nyb2xsUG9zaXRpb246IHV0aWxzLmdldFNjcm9sbFBvc2l0aW9uLFxuXHRnZXRWaXNpYmlsaXR5OiB1dGlscy5nZXRWaXNpYmlsaXR5XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///3c85f3e3\n");

/***/ })

}]);