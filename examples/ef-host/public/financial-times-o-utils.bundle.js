(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["financial-times-o-utils"],{

/***/ "6d36580f":
/*!*******************************************************!*\
  !*** ./node_modules/@financial-times/o-utils/main.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"debounce\", function() { return debounce; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"throttle\", function() { return throttle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"uidBuilder\", function() { return uidBuilder; });\n/**\n *\n * Debounces function so it is only called after n milliseconds\n * without it not being called\n *\n * @example\n * Utils.debounce(myFunction() {}, 100);\n *\n * @param {Function} func - Function to be debounced\n * @param {number} wait - Time in miliseconds\n *\n * @returns {Function} - Debounced function\n */\nfunction debounce(func, wait) {\n  let timeout;\n  return function () {\n    const args = arguments;\n    const later = () => {\n      timeout = null;\n      func.apply(this, args);\n    };\n    clearTimeout(timeout);\n    timeout = setTimeout(later, wait);\n  };\n}\n\n/**\n *\n * Throttle function so it is only called once every n milliseconds\n *\n * @example\n * Utils.throttle(myFunction() {}, 100);\n *\n * @param {Function} func - Function to be throttled\n * @param {number} wait - Time in miliseconds\n *\n * @returns {Function} - Throttled function\n */\nfunction throttle(func, wait) {\n  let timeout;\n  return function () {\n    if (timeout) {\n      return;\n    }\n    const args = arguments;\n    const later = () => {\n      timeout = null;\n      func.apply(this, args);\n    };\n    timeout = setTimeout(later, wait);\n  };\n}\n\n/**\n * Generates a unique ID string by concatenating the given component name, prefix, and a random number.\n *\n * @param {string} componentName - The name of the component to be included in the ID string.\n * @returns {function} A function that takes a prefix string and returns a unique ID string.\n *\n * @example\n *\n * const generateId = uidBuilder('myComponent');\n * const id = generateId('prefix');\n * console.log(id); // 'myComponent-prefix1234567890'\n */\n\nconst uidBuilder = componentName => prefix => {\n  const uid = String(Math.random()).split('.')[1];\n  return `${componentName}-${prefix}${uid}`;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNmQzNjU4MGYuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9vLXV0aWxzL21haW4uanM/Yjc2OSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBEZWJvdW5jZXMgZnVuY3Rpb24gc28gaXQgaXMgb25seSBjYWxsZWQgYWZ0ZXIgbiBtaWxsaXNlY29uZHNcbiAqIHdpdGhvdXQgaXQgbm90IGJlaW5nIGNhbGxlZFxuICpcbiAqIEBleGFtcGxlXG4gKiBVdGlscy5kZWJvdW5jZShteUZ1bmN0aW9uKCkge30sIDEwMCk7XG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIEZ1bmN0aW9uIHRvIGJlIGRlYm91bmNlZFxuICogQHBhcmFtIHtudW1iZXJ9IHdhaXQgLSBUaW1lIGluIG1pbGlzZWNvbmRzXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufSAtIERlYm91bmNlZCBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0KSB7XG5cdGxldCB0aW1lb3V0O1xuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG5cdFx0Y29uc3QgbGF0ZXIgPSAoKSA9PiB7XG5cdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0fTtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXHR9O1xufVxuXG4vKipcbiAqXG4gKiBUaHJvdHRsZSBmdW5jdGlvbiBzbyBpdCBpcyBvbmx5IGNhbGxlZCBvbmNlIGV2ZXJ5IG4gbWlsbGlzZWNvbmRzXG4gKlxuICogQGV4YW1wbGVcbiAqIFV0aWxzLnRocm90dGxlKG15RnVuY3Rpb24oKSB7fSwgMTAwKTtcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gRnVuY3Rpb24gdG8gYmUgdGhyb3R0bGVkXG4gKiBAcGFyYW0ge251bWJlcn0gd2FpdCAtIFRpbWUgaW4gbWlsaXNlY29uZHNcbiAqXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IC0gVGhyb3R0bGVkIGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIHdhaXQpIHtcblx0bGV0IHRpbWVvdXQ7XG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRpbWVvdXQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y29uc3QgYXJncyA9IGFyZ3VtZW50cztcblx0XHRjb25zdCBsYXRlciA9ICgpID0+IHtcblx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0ZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHR9O1xuXG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXHR9O1xufVxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHVuaXF1ZSBJRCBzdHJpbmcgYnkgY29uY2F0ZW5hdGluZyB0aGUgZ2l2ZW4gY29tcG9uZW50IG5hbWUsIHByZWZpeCwgYW5kIGEgcmFuZG9tIG51bWJlci5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjb21wb25lbnQgdG8gYmUgaW5jbHVkZWQgaW4gdGhlIElEIHN0cmluZy5cbiAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgcHJlZml4IHN0cmluZyBhbmQgcmV0dXJucyBhIHVuaXF1ZSBJRCBzdHJpbmcuXG4gKlxuICogQGV4YW1wbGVcbiAqXG4gKiBjb25zdCBnZW5lcmF0ZUlkID0gdWlkQnVpbGRlcignbXlDb21wb25lbnQnKTtcbiAqIGNvbnN0IGlkID0gZ2VuZXJhdGVJZCgncHJlZml4Jyk7XG4gKiBjb25zb2xlLmxvZyhpZCk7IC8vICdteUNvbXBvbmVudC1wcmVmaXgxMjM0NTY3ODkwJ1xuICovXG5cbmNvbnN0IHVpZEJ1aWxkZXIgPSAoY29tcG9uZW50TmFtZSkgPT4gcHJlZml4ID0+IHtcblx0Y29uc3QgdWlkID0gU3RyaW5nKE1hdGgucmFuZG9tKCkpLnNwbGl0KCcuJylbMV07XG5cdHJldHVybiBgJHtjb21wb25lbnROYW1lfS0ke3ByZWZpeH0ke3VpZH1gO1xufTtcblxuXG5leHBvcnQge1xuXHRkZWJvdW5jZSxcblx0dGhyb3R0bGUsXG5cdHVpZEJ1aWxkZXJcbn07XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///6d36580f\n");

/***/ })

}]);