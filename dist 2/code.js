import * as __WEBPACK_EXTERNAL_MODULE_add_on_sdk_document_sandbox_502f5cda__ from "add-on-sdk-document-sandbox";
import * as __WEBPACK_EXTERNAL_MODULE_express_document_sdk_a5d09708__ from "express-document-sdk";
/******/ var __webpack_modules__ = ({

/***/ "add-on-sdk-document-sandbox":
/*!**********************************************!*\
  !*** external "add-on-sdk-document-sandbox" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_add_on_sdk_document_sandbox_502f5cda__;

/***/ }),

/***/ "express-document-sdk":
/*!***************************************!*\
  !*** external "express-document-sdk" ***!
  \***************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_express_document_sdk_a5d09708__;

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./src/sandbox/code.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var add_on_sdk_document_sandbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! add-on-sdk-document-sandbox */ "add-on-sdk-document-sandbox");
/* harmony import */ var express_document_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express-document-sdk */ "express-document-sdk");



// Get the document sandbox runtime.
var runtime = add_on_sdk_document_sandbox__WEBPACK_IMPORTED_MODULE_0__["default"].instance.runtime;
function start() {
  // APIs to be exposed to the UI runtime
  // i.e., to the `index.html` file of this add-on.
  var sandboxApi = {
    createRectangle: function createRectangle() {
      var rectangle = express_document_sdk__WEBPACK_IMPORTED_MODULE_1__.editor.createRectangle();

      // Define rectangle dimensions.
      rectangle.width = 240;
      rectangle.height = 180;

      // Define rectangle position.
      rectangle.translation = {
        x: 10,
        y: 10
      };

      // Define rectangle color.
      var color = {
        red: 0.32,
        green: 0.34,
        blue: 0.89,
        alpha: 1
      };

      // Fill the rectangle with the color.
      var rectangleFill = express_document_sdk__WEBPACK_IMPORTED_MODULE_1__.editor.makeColorFill(color);
      rectangle.fill = rectangleFill;

      // Add the rectangle to the document.
      var insertionParent = express_document_sdk__WEBPACK_IMPORTED_MODULE_1__.editor.context.insertionParent;
      insertionParent.children.append(rectangle);
    }
  };

  // Expose `sandboxApi` to the UI runtime.
  runtime.exposeApi(sandboxApi);
}
start();
})();


//# sourceMappingURL=code.js.map