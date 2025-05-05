/*! For license information please see 325.a9902f63.iframe.bundle.js.LICENSE.txt */
"use strict";
(self.webpackChunktsa_app = self.webpackChunktsa_app || []).push([
  [325],
  {
    "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react-dom/cjs/react-dom-test-utils.production.js":
      (__unused_webpack_module, exports, __webpack_require__) => {
        var console = __webpack_require__(
            "./node_modules/.pnpm/console-browserify@1.2.0/node_modules/console-browserify/index.js",
          ),
          React = __webpack_require__(
            "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react/index.js",
          ),
          didWarnAboutUsingAct = !1;
        exports.act = function (callback) {
          return (
            !1 === didWarnAboutUsingAct &&
              ((didWarnAboutUsingAct = !0),
              console.error(
                "`ReactDOMTestUtils.act` is deprecated in favor of `React.act`. Import `act` from `react` instead of `react-dom/test-utils`. See https://react.dev/warnings/react-dom-test-utils for more info.",
              )),
            React.act(callback)
          );
        };
      },
  },
]);
