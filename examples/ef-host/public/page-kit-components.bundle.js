(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["page-kit-components"],{

/***/ "2ecfe660":
/*!*******************************************************************!*\
  !*** ./node_modules/@financial-times/dotcom-ui-footer/browser.js ***!
  \*******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony import */ var _financial_times_o_footer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @financial-times/o-footer */ \"e8cff377\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"OrigamiFooter\", function() { return _financial_times_o_footer__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\n\n/**\n * @typedef FooterOptions\n * @property { HTMLElement } [rootElement] - the root element passed to o-footer\n */\n\n/**\n * Initialise the header\n * @param { FooterOptions } footerOptions\n */\nconst init = function () {\n  let footerOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  _financial_times_o_footer__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init(footerOptions.rootElement);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMmVjZmU2NjAuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9kb3Rjb20tdWktZm9vdGVyL2Jyb3dzZXIuanM/OGFiYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRm9vdGVyIGZyb20gJ0BmaW5hbmNpYWwtdGltZXMvby1mb290ZXInXG5cbi8qKlxuICogQHR5cGVkZWYgRm9vdGVyT3B0aW9uc1xuICogQHByb3BlcnR5IHsgSFRNTEVsZW1lbnQgfSBbcm9vdEVsZW1lbnRdIC0gdGhlIHJvb3QgZWxlbWVudCBwYXNzZWQgdG8gby1mb290ZXJcbiAqL1xuXG4vKipcbiAqIEluaXRpYWxpc2UgdGhlIGhlYWRlclxuICogQHBhcmFtIHsgRm9vdGVyT3B0aW9ucyB9IGZvb3Rlck9wdGlvbnNcbiAqL1xuZXhwb3J0IGNvbnN0IGluaXQgPSAoZm9vdGVyT3B0aW9ucyA9IHt9KSA9PiB7XG4gIEZvb3Rlci5pbml0KGZvb3Rlck9wdGlvbnMucm9vdEVsZW1lbnQpXG59XG5cbmV4cG9ydCB7IEZvb3RlciBhcyBPcmlnYW1pRm9vdGVyIH1cbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///2ecfe660\n");

/***/ }),

/***/ "4add4a95":
/*!*******************************************************************!*\
  !*** ./node_modules/@financial-times/dotcom-ui-header/browser.js ***!
  \*******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony import */ var _financial_times_o_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @financial-times/o-header */ \"abceab11\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"OrigamiHeader\", function() { return _financial_times_o_header__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var n_topic_search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! n-topic-search */ \"3a8f0c89\");\n\n\n\n/**\n * @typedef HeaderOptions\n * @property { HTMLElement } [rootElement] - the root element passed to o-header\n * @property { string } [hostName]\n */\n\n/**\n * Initialise the header\n * @param { HeaderOptions } headerOptions\n */\nconst init = function () {\n  let headerOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  const topicSearchElements = document.querySelectorAll('.o-header [data-n-topic-search], .o-header__drawer [data-n-topic-search]');\n  topicSearchElements.forEach(element => {\n    new n_topic_search__WEBPACK_IMPORTED_MODULE_1__[\"default\"](element, headerOptions);\n  });\n  _financial_times_o_header__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init(headerOptions.rootElement);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNGFkZDRhOTUuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9kb3Rjb20tdWktaGVhZGVyL2Jyb3dzZXIuanM/MWM2ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGVhZGVyIGZyb20gJ0BmaW5hbmNpYWwtdGltZXMvby1oZWFkZXInXG5pbXBvcnQgVG9waWNTZWFyY2ggZnJvbSAnbi10b3BpYy1zZWFyY2gnXG5cbi8qKlxuICogQHR5cGVkZWYgSGVhZGVyT3B0aW9uc1xuICogQHByb3BlcnR5IHsgSFRNTEVsZW1lbnQgfSBbcm9vdEVsZW1lbnRdIC0gdGhlIHJvb3QgZWxlbWVudCBwYXNzZWQgdG8gby1oZWFkZXJcbiAqIEBwcm9wZXJ0eSB7IHN0cmluZyB9IFtob3N0TmFtZV1cbiAqL1xuXG4vKipcbiAqIEluaXRpYWxpc2UgdGhlIGhlYWRlclxuICogQHBhcmFtIHsgSGVhZGVyT3B0aW9ucyB9IGhlYWRlck9wdGlvbnNcbiAqL1xuZXhwb3J0IGNvbnN0IGluaXQgPSAoaGVhZGVyT3B0aW9ucyA9IHt9KSA9PiB7XG4gIGNvbnN0IHRvcGljU2VhcmNoRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICcuby1oZWFkZXIgW2RhdGEtbi10b3BpYy1zZWFyY2hdLCAuby1oZWFkZXJfX2RyYXdlciBbZGF0YS1uLXRvcGljLXNlYXJjaF0nXG4gIClcbiAgdG9waWNTZWFyY2hFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgbmV3IFRvcGljU2VhcmNoKGVsZW1lbnQsIGhlYWRlck9wdGlvbnMpXG4gIH0pXG5cbiAgSGVhZGVyLmluaXQoaGVhZGVyT3B0aW9ucy5yb290RWxlbWVudClcbn1cblxuZXhwb3J0IHsgSGVhZGVyIGFzIE9yaWdhbWlIZWFkZXIgfVxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///4add4a95\n");

/***/ }),

/***/ "86234f4a":
/*!************************************************************************!*\
  !*** ./node_modules/@financial-times/dotcom-ui-base-styles/browser.js ***!
  \************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony import */ var _financial_times_o_typography__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @financial-times/o-typography */ \"62c6128b\");\n/* harmony import */ var focus_visible__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! focus-visible */ \"3c7622ff\");\n/* harmony import */ var focus_visible__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(focus_visible__WEBPACK_IMPORTED_MODULE_1__);\n\n\n// Polyfill for :focus-visible https://github.com/WICG/focus-visible\n// NOTE: v5 of this polyfill is not yet supported by o-normalise\n// https://github.com/WICG/focus-visible/pull/196/files\n// https://github.com/Financial-Times/o-normalise/issues/41\n\nfunction init() {\n  _financial_times_o_typography__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init();\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiODYyMzRmNGEuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9kb3Rjb20tdWktYmFzZS1zdHlsZXMvYnJvd3Nlci5qcz82NTNmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvVHlwb2dyYXBoeSBmcm9tICdAZmluYW5jaWFsLXRpbWVzL28tdHlwb2dyYXBoeSdcblxuLy8gUG9seWZpbGwgZm9yIDpmb2N1cy12aXNpYmxlIGh0dHBzOi8vZ2l0aHViLmNvbS9XSUNHL2ZvY3VzLXZpc2libGVcbi8vIE5PVEU6IHY1IG9mIHRoaXMgcG9seWZpbGwgaXMgbm90IHlldCBzdXBwb3J0ZWQgYnkgby1ub3JtYWxpc2Vcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9XSUNHL2ZvY3VzLXZpc2libGUvcHVsbC8xOTYvZmlsZXNcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9GaW5hbmNpYWwtVGltZXMvby1ub3JtYWxpc2UvaXNzdWVzLzQxXG5pbXBvcnQgJ2ZvY3VzLXZpc2libGUnXG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICBvVHlwb2dyYXBoeS5pbml0KClcbn1cbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///86234f4a\n");

/***/ }),

/***/ "9d24bbd0":
/*!*******************************************************************!*\
  !*** ./node_modules/@financial-times/dotcom-ui-layout/browser.js ***!
  \*******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony import */ var _financial_times_dotcom_ui_footer_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @financial-times/dotcom-ui-footer/browser */ \"2ecfe660\");\n/* harmony import */ var _financial_times_dotcom_ui_header_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @financial-times/dotcom-ui-header/browser */ \"4add4a95\");\n/* harmony import */ var _financial_times_dotcom_ui_base_styles_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @financial-times/dotcom-ui-base-styles/browser */ \"86234f4a\");\n/* harmony import */ var focus_visible__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! focus-visible */ \"3c7622ff\");\n/* harmony import */ var focus_visible__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(focus_visible__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n// Polyfill for :focus-visible https://github.com/WICG/focus-visible\n// NOTE: v5 of this polyfill is not yet supported by o-normalise\n// https://github.com/WICG/focus-visible/pull/196/files\n// https://github.com/Financial-Times/o-normalise/issues/41\n\nfunction init() {\n  let {\n    headerOptions = {},\n    footerOptions = {}\n  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  _financial_times_dotcom_ui_base_styles_browser__WEBPACK_IMPORTED_MODULE_2__[\"init\"]();\n  _financial_times_dotcom_ui_header_browser__WEBPACK_IMPORTED_MODULE_1__[\"init\"](headerOptions);\n  _financial_times_dotcom_ui_footer_browser__WEBPACK_IMPORTED_MODULE_0__[\"init\"](footerOptions);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiOWQyNGJiZDAuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9kb3Rjb20tdWktbGF5b3V0L2Jyb3dzZXIuanM/MzNmYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmb290ZXIgZnJvbSAnQGZpbmFuY2lhbC10aW1lcy9kb3Rjb20tdWktZm9vdGVyL2Jyb3dzZXInXG5pbXBvcnQgKiBhcyBoZWFkZXIgZnJvbSAnQGZpbmFuY2lhbC10aW1lcy9kb3Rjb20tdWktaGVhZGVyL2Jyb3dzZXInXG5pbXBvcnQgKiBhcyBiYXNlU3R5bGVzIGZyb20gJ0BmaW5hbmNpYWwtdGltZXMvZG90Y29tLXVpLWJhc2Utc3R5bGVzL2Jyb3dzZXInXG4vLyBQb2x5ZmlsbCBmb3IgOmZvY3VzLXZpc2libGUgaHR0cHM6Ly9naXRodWIuY29tL1dJQ0cvZm9jdXMtdmlzaWJsZVxuLy8gTk9URTogdjUgb2YgdGhpcyBwb2x5ZmlsbCBpcyBub3QgeWV0IHN1cHBvcnRlZCBieSBvLW5vcm1hbGlzZVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL1dJQ0cvZm9jdXMtdmlzaWJsZS9wdWxsLzE5Ni9maWxlc1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL0ZpbmFuY2lhbC1UaW1lcy9vLW5vcm1hbGlzZS9pc3N1ZXMvNDFcbmltcG9ydCAnZm9jdXMtdmlzaWJsZSdcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoeyBoZWFkZXJPcHRpb25zID0ge30sIGZvb3Rlck9wdGlvbnMgPSB7fSB9ID0ge30pIHtcbiAgYmFzZVN0eWxlcy5pbml0KClcbiAgaGVhZGVyLmluaXQoaGVhZGVyT3B0aW9ucylcbiAgZm9vdGVyLmluaXQoZm9vdGVyT3B0aW9ucylcbn1cbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///9d24bbd0\n");

/***/ }),

/***/ "f0b1d25f":
/*!********************************************************************!*\
  !*** ./node_modules/@financial-times/dotcom-ui-layout/styles.scss ***!
  \********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZjBiMWQyNWYuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9kb3Rjb20tdWktbGF5b3V0L3N0eWxlcy5zY3NzP2NkZDgiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///f0b1d25f\n");

/***/ })

}]);