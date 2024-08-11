/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var MyLibrary;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./utils/convert.js":
/*!**************************!*\
  !*** ./utils/convert.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   convert: () => (/* binding */ convert)\n/* harmony export */ });\n/* harmony import */ var _convertToMultiline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./convertToMultiline */ \"./utils/convertToMultiline.js\");\n/* harmony import */ var _generatePHP__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generatePHP */ \"./utils/generatePHP.js\");\n\r\n\r\n\r\nfunction convert() {\r\n  // Get input element\r\n  const input = document.getElementById('input');\r\n  const inputMultiline = (0,_convertToMultiline__WEBPACK_IMPORTED_MODULE_0__.convertToMultiline)(input.value);\r\n\r\n  if (inputMultiline.startsWith('Error:')) {\r\n    const output = document.getElementById('output');\r\n    output.textContent = inputMultiline; // Ustaw output na komunikat o błędzie\r\n    return inputMultiline;\r\n  }\r\n\r\n  // Initialize variables\r\n  let stack = [];\r\n  let current = {};\r\n  let key = '';\r\n\r\n  // Split input into lines and remove empty lines\r\n  const lines = inputMultiline\r\n    .trim()\r\n    .split('\\n')\r\n    .map((line) => line.trim())\r\n    .filter((line) => line.length > 0);\r\n  // Iterate over lines\r\n  lines.forEach((line) => {\r\n    // Handle array start\r\n    if (line.startsWith('array')) {\r\n      let newObj = {};\r\n      if (Object.keys(current).length !== 0 || stack.length > 0) {\r\n        stack.push({ obj: current, key });\r\n      }\r\n      current = newObj;\r\n    }\r\n    // Handle array end\r\n    else if (line.startsWith('}')) {\r\n      if (stack.length > 0) {\r\n        const parent = stack.pop();\r\n        if (!parent.key) {\r\n          parent.obj.push(current);\r\n        } else {\r\n          parent.obj[parent.key] = current;\r\n        }\r\n        current = parent.obj;\r\n        key = parent.key;\r\n      }\r\n    }\r\n    // Handle key-value pair\r\n    else if (line.endsWith('=>')) {\r\n      key = line.slice(0, -2).replace(/^\\[\"|\\\"]$/g, '');\r\n    }\r\n    // Handle string value\r\n    else if (line.startsWith('string')) {\r\n      const value = line.split('\"')[1];\r\n      current[key] = `'${value}'`;\r\n    }\r\n    // Handle integer value\r\n    else if (line.startsWith('int')) {\r\n      const value = parseInt(line.match(/\\d+/)[0], 10);\r\n      current[key] = value;\r\n    }\r\n    // Handle float value\r\n    else if (line.startsWith('float')) {\r\n      const value = parseFloat(line.match(/[\\d\\.]+/)[0]);\r\n      current[key] = value;\r\n    }\r\n    // Handle boolean value\r\n    else if (line.startsWith('bool')) {\r\n      const value = line.includes('true') ? 'true' : 'false';\r\n      current[key] = value;\r\n    }\r\n  });\r\n\r\n  // Generate PHP code and set output\r\n  const result = (0,_generatePHP__WEBPACK_IMPORTED_MODULE_1__.generatePHP)(current);\r\n  const output = document.getElementById('output');\r\n  output.textContent = result;\r\n\r\n  return result;\r\n}\r\n\r\n// module.exports = { convert };\r\n\r\nwindow.convert = convert;\r\n\n\n//# sourceURL=webpack://MyLibrary/./utils/convert.js?");

/***/ }),

/***/ "./utils/convertToMultiline.js":
/*!*************************************!*\
  !*** ./utils/convertToMultiline.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   convertToMultiline: () => (/* binding */ convertToMultiline)\n/* harmony export */ });\nfunction convertToMultiline(input) {\r\n  let lines = [];\r\n  let currentLine = '';\r\n  let inString = false;\r\n\r\n  // Stacks to keep track of opening brackets\r\n  let curlyStack = [];\r\n  let roundStack = [];\r\n  let squareStack = [];\r\n\r\n  for (let i = 0; i < input.length; i++) {\r\n    let char = input[i];\r\n\r\n    // Toggle inString flag if encountering quotes\r\n    if (char === '\"' || char === \"'\") {\r\n      inString = !inString;\r\n    }\r\n\r\n    // Handle opening and closing curly brackets { }\r\n    if (!inString && (char === '{' || char === '}')) {\r\n      if (char === '{') {\r\n        curlyStack.push(char);\r\n      } else if (char === '}') {\r\n        if (curlyStack.length === 0) {\r\n          return 'Error: Unmatched closing curly bracket }';\r\n        }\r\n        curlyStack.pop();\r\n      }\r\n\r\n      if (currentLine.trim().length > 0) {\r\n        lines.push(currentLine.trim());\r\n        currentLine = '';\r\n      }\r\n      lines.push(char);\r\n    }\r\n    // Handle opening and closing round brackets ( )\r\n    else if (!inString && (char === '(' || char === ')')) {\r\n      if (char === '(') {\r\n        roundStack.push(char);\r\n      } else if (char === ')') {\r\n        if (roundStack.length === 0) {\r\n          return 'Error: Unmatched closing round bracket )';\r\n        }\r\n        roundStack.pop();\r\n      }\r\n      currentLine += char;\r\n    }\r\n    // Handle opening and closing square brackets [ ]\r\n    else if (!inString && (char === '[' || char === ']')) {\r\n      if (char === '[') {\r\n        squareStack.push(char);\r\n      } else if (char === ']') {\r\n        if (squareStack.length === 0) {\r\n          return 'Error: Unmatched closing square bracket ]';\r\n        }\r\n        squareStack.pop();\r\n      }\r\n      currentLine += char;\r\n    }\r\n    // Handle arrow => separator\r\n    else if (!inString && char === '=' && input[i + 1] === '>') {\r\n      currentLine += '=>';\r\n      i++; // Skip next character '='\r\n      if (currentLine.trim().length > 0) {\r\n        lines.push(currentLine.trim());\r\n        currentLine = '';\r\n      }\r\n    }\r\n    // Handle whitespace between key-value pairs\r\n    else if (\r\n      !inString &&\r\n      char === ' ' &&\r\n      currentLine.trim().length > 0 &&\r\n      !['{', '}', '=>'].includes(currentLine.trim())\r\n    ) {\r\n      lines.push(currentLine.trim());\r\n      currentLine = '';\r\n    }\r\n    // Handle other characters\r\n    else {\r\n      currentLine += char;\r\n    }\r\n  }\r\n\r\n  // Push the last processed line\r\n  if (currentLine.trim().length > 0) {\r\n    lines.push(currentLine.trim());\r\n  }\r\n\r\n  // Check if all stacks are empty, indicating all brackets matched\r\n  if (curlyStack.length > 0) {\r\n    return 'Error: Unmatched opening curly bracket {';\r\n  }\r\n  if (roundStack.length > 0) {\r\n    return 'Error: Unmatched opening round bracket (';\r\n  }\r\n  if (squareStack.length > 0) {\r\n    return 'Error: Unmatched opening square bracket [';\r\n  }\r\n\r\n  // Combine strings and their values into a single line\r\n  let combinedLines = [];\r\n  for (let i = 0; i < lines.length; i++) {\r\n    if (\r\n      lines[i].startsWith('string(') &&\r\n      i < lines.length - 1 &&\r\n      lines[i + 1].startsWith('\"')\r\n    ) {\r\n      combinedLines.push(lines[i] + lines[i + 1]);\r\n      i++; // Skip next line since it's already combined\r\n    } else if (\r\n      lines[i].startsWith('int(') ||\r\n      lines[i].startsWith('float(') ||\r\n      lines[i].startsWith('bool(')\r\n    ) {\r\n      combinedLines.push(lines[i]);\r\n    } else {\r\n      combinedLines.push(lines[i]);\r\n    }\r\n  }\r\n\r\n  // Format combined lines into a multi-line string with indentation\r\n  let result = '';\r\n  let indentLevel = 0;\r\n  for (let line of combinedLines) {\r\n    if (line === '{') {\r\n      result += ' '.repeat(indentLevel) + line + '\\n';\r\n      indentLevel += 2;\r\n    } else if (line === '}') {\r\n      indentLevel -= 2;\r\n      result += ' '.repeat(indentLevel) + line + '\\n';\r\n    } else {\r\n      result += ' '.repeat(indentLevel) + line + '\\n';\r\n    }\r\n  }\r\n  return result;\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://MyLibrary/./utils/convertToMultiline.js?");

/***/ }),

/***/ "./utils/generatePHP.js":
/*!******************************!*\
  !*** ./utils/generatePHP.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generatePHP: () => (/* binding */ generatePHP)\n/* harmony export */ });\nfunction generatePHP(obj, level = 0, parentKey = '') {\r\n  let phpCode = '';\r\n\r\n  // Generate code for top-level object\r\n  if (parentKey === '') {\r\n    phpCode += '$result = [];\\n';\r\n    for (const [key, value] of Object.entries(obj)) {\r\n      const sanitizedKey = key.replace(/[\\[\\]]/g, '');\r\n      if (typeof value === 'object') {\r\n        if (isNaN(sanitizedKey)) {\r\n          // key is not a number\r\n          phpCode += `${'   '.repeat(level)}$result['${key}'] = [];\\n`;\r\n          phpCode += generatePHP(value, level + 1, key);\r\n        } else {\r\n          // key is a number\r\n          phpCode += `${'   '.repeat(level)}$result${key} = [];\\n`;\r\n          phpCode += generatePHP(value, level + 1, key);\r\n        }\r\n      } else {\r\n        if (isNaN(sanitizedKey)) {\r\n          // key is not a number\r\n          phpCode += `${'   '.repeat(level)}$result['${key}'] = ${value};\\n`;\r\n        } else {\r\n          // key is a number no '' is needed\r\n          phpCode += `${'   '.repeat(level)}$result${key} = ${value};\\n`;\r\n        }\r\n      }\r\n    }\r\n  }\r\n  // Generate code for nested object\r\n  else {\r\n    const sanitizedParentKey = parentKey.replace(/[\\[\\]]/g, '');\r\n    for (const [key, value] of Object.entries(obj)) {\r\n      const indent = '   '.repeat(level);\r\n      const sanitizedKey = key.replace(/[\\[\\]]/g, '');\r\n\r\n      if (typeof value === 'object') {\r\n        if (isNaN(sanitizedKey)) {\r\n          // key is not a number\r\n          if (isNaN(sanitizedParentKey)) {\r\n            // parentKey is not a number\r\n            phpCode += `${indent}$result['${parentKey}']['${key}'] = [];\\n`;\r\n          } else {\r\n            // parentKey is a number\r\n            phpCode += `${indent}$result${parentKey}['${key}'] = [];\\n`;\r\n          }\r\n          phpCode += generatePHP(value, level + 1, key);\r\n        } else {\r\n          // key is a number\r\n          if (isNaN(sanitizedParentKey)) {\r\n            // parentKey is not a number\r\n            phpCode += `${indent}$result['${parentKey}']${key} = [];\\n`;\r\n          } else {\r\n            // parentKey is a number\r\n            phpCode += `${indent}$result${parentKey}${key} = [];\\n`;\r\n          }\r\n          phpCode += generatePHP(value, level + 1, key);\r\n        }\r\n      } else {\r\n        if (isNaN(sanitizedKey)) {\r\n          // key is not a number\r\n          if (isNaN(sanitizedParentKey)) {\r\n            // parentKey is not a number\r\n            phpCode += `${indent}$result['${parentKey}']['${key}'] = ${value};\\n`;\r\n          } else {\r\n            // parentKey is a number\r\n            phpCode += `${indent}$result${parentKey}['${key}'] = ${value};\\n`;\r\n          }\r\n        } else {\r\n          // key is a number\r\n          if (isNaN(sanitizedParentKey)) {\r\n            // parentKey is not a number\r\n            phpCode += `${indent}$result['${parentKey}']${key} = ${value};\\n`;\r\n          } else {\r\n            // parentKey is a number\r\n            phpCode += `${indent}$result${parentKey}${key} = ${value};\\n`;\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  return phpCode;\r\n}\r\n\r\n\n\n//# sourceURL=webpack://MyLibrary/./utils/generatePHP.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./utils/convert.js");
/******/ 	MyLibrary = __webpack_exports__;
/******/ 	
/******/ })()
;