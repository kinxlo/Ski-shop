"use strict";
(self.webpackChunktsa_app = self.webpackChunktsa_app || []).push([
  [195],
  {
    "./src/components/shared/logo/Logo.stories.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Primary: () => Primary,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        });
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: "Atoms/Logo",
          component: __webpack_require__("./src/components/shared/logo/index.tsx").g,
        },
        Primary = { args: { logo: "/images/skicom.svg", width: 120, height: 37 } },
        __namedExportsOrder = ["Primary"];
      Primary.parameters = {
        ...Primary.parameters,
        docs: {
          ...Primary.parameters?.docs,
          source: {
            originalSource: '{\n  args: {\n    logo: "/images/skicom.svg",\n    width: 120,\n    height: 37\n  }\n}',
            ...Primary.parameters?.docs?.source,
          },
        },
      };
    },
    "./src/components/shared/logo/index.tsx": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.d(__webpack_exports__, { g: () => Logo });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react/jsx-runtime.js",
        ),
        next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./node_modules/.pnpm/@storybook+nextjs@8.6.12_es_efd1545d91a71caf7c9c4fad0b344f57/node_modules/@storybook/nextjs/dist/images/next-image.mjs",
        ),
        next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/link.js",
        ),
        next_link__WEBPACK_IMPORTED_MODULE_2___default = __webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
      const Logo = ({ logo = "/images/skicom.svg", width = 89, height = 60, className }) =>
        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(next_link__WEBPACK_IMPORTED_MODULE_2___default(), {
          href: "/",
          "data-testid": "logo",
          className: "",
          children: logo
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(next_image__WEBPACK_IMPORTED_MODULE_1__.A, {
                src: logo,
                alt: "Logo",
                width,
                height,
                className,
              })
            : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-xl font-bold",
                children: "LOGO",
              }),
        });
      try {
        (Logo.displayName = "Logo"),
          (Logo.__docgenInfo = {
            description: "",
            displayName: "Logo",
            props: {
              logo: {
                defaultValue: { value: "/images/skicom.svg" },
                description: "",
                name: "logo",
                required: !1,
                type: { name: "string" },
              },
              width: {
                defaultValue: { value: "89" },
                description: "",
                name: "width",
                required: !1,
                type: { name: "number" },
              },
              height: {
                defaultValue: { value: "60" },
                description: "",
                name: "height",
                required: !1,
                type: { name: "number" },
              },
              className: {
                defaultValue: null,
                description: "",
                name: "className",
                required: !1,
                type: { name: "string" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/shared/logo/index.tsx#Logo"] = {
              docgenInfo: Logo.__docgenInfo,
              name: "Logo",
              path: "src/components/shared/logo/index.tsx#Logo",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
  },
]);
