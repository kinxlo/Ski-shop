"use strict";
(self.webpackChunktsa_app = self.webpackChunktsa_app || []).push([
  [241],
  {
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
    "./src/components/shared/navbar/Navbar.stories.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          WithUser: () => WithUser,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => Navbar_stories,
        });
      var jsx_runtime = __webpack_require__(
          "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react/jsx-runtime.js",
        ),
        utils = __webpack_require__("./src/lib/utils.ts");
      const Wrapper = ({ width = "max-w-[1240px]", height = "h-full", children, className, ...rest }) =>
        (0, jsx_runtime.jsx)("section", {
          ...rest,
          className: (0, utils.cn)(`mx-auto ${width} ${height} px-[1rem] xl:px-0`, className),
          children,
        });
      try {
        (Wrapper.displayName = "Wrapper"),
          (Wrapper.__docgenInfo = {
            description: "",
            displayName: "Wrapper",
            props: {
              width: {
                defaultValue: { value: "`max-w-[1240px]`" },
                description: "",
                name: "width",
                required: !1,
                type: { name: "string" },
              },
              height: {
                defaultValue: { value: "`h-full`" },
                description: "",
                name: "height",
                required: !1,
                type: { name: "string" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/core/layout/wrapper/index.tsx#Wrapper"] = {
              docgenInfo: Wrapper.__docgenInfo,
              name: "Wrapper",
              path: "src/components/core/layout/wrapper/index.tsx#Wrapper",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      const NAV_LINKS = [
        { id: 1, title: "Explore", href: "/explore", type: "link" },
        { id: 2, title: "About Us", href: "/about", type: "link" },
        { id: 3, title: "Shop", href: "/shop", type: "link" },
        { id: 3, title: "Contact Us", href: "/contact", type: "link" },
      ];
      var x = __webpack_require__(
          "./node_modules/.pnpm/lucide-react@0.503.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/x.js",
        ),
        menu = __webpack_require__(
          "./node_modules/.pnpm/lucide-react@0.503.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/menu.js",
        ),
        navigation = __webpack_require__(
          "./node_modules/.pnpm/@storybook+nextjs@8.6.12_es_efd1545d91a71caf7c9c4fad0b344f57/node_modules/@storybook/nextjs/dist/export-mocks/navigation/index.mjs",
        ),
        react = __webpack_require__(
          "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react/index.js",
        ),
        button_button = __webpack_require__("./src/components/shared/button/button.tsx"),
        shared_logo = __webpack_require__("./src/components/shared/logo/index.tsx"),
        input = __webpack_require__("./src/components/ui/input.tsx"),
        lu = __webpack_require__(
          "__barrel_optimize__?names=LuLoader,LuPlus!=!./node_modules/.pnpm/react-icons@5.5.0_react@19.1.0/node_modules/react-icons/lu/index.mjs",
        ),
        dist = __webpack_require__(
          "./node_modules/.pnpm/@radix-ui+react-dialog@1.1._df29d8d4fc2df69613ee7565646f766c/node_modules/@radix-ui/react-dialog/dist/index.mjs",
        );
      function Dialog({ ...properties }) {
        return (0, jsx_runtime.jsx)(dist.bL, { "data-slot": "dialog", ...properties });
      }
      function DialogTrigger({ ...properties }) {
        return (0, jsx_runtime.jsx)(dist.l9, { "data-slot": "dialog-trigger", ...properties });
      }
      function DialogPortal({ ...properties }) {
        return (0, jsx_runtime.jsx)(dist.ZL, { "data-slot": "dialog-portal", ...properties });
      }
      function DialogClose({ ...properties }) {
        return _jsx(DialogPrimitive.Close, { "data-slot": "dialog-close", ...properties });
      }
      function DialogOverlay({ className, ...properties }) {
        return (0, jsx_runtime.jsx)(dist.hJ, {
          "data-slot": "dialog-overlay",
          className: (0, utils.cn)(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
            className,
          ),
          ...properties,
        });
      }
      function DialogContent({ className, children, hideClose = !1, ...properties }) {
        return (0, jsx_runtime.jsxs)(DialogPortal, {
          "data-slot": "dialog-portal",
          children: [
            (0, jsx_runtime.jsx)(DialogOverlay, {}),
            (0, jsx_runtime.jsxs)(dist.UC, {
              "data-slot": "dialog-content",
              className: (0, utils.cn)(
                "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
                className,
              ),
              ...properties,
              children: [
                children,
                !hideClose &&
                  (0, jsx_runtime.jsxs)(dist.bm, {
                    className:
                      "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                    children: [
                      (0, jsx_runtime.jsx)(x.A, {}),
                      (0, jsx_runtime.jsx)("span", { className: "sr-only", children: "Close" }),
                    ],
                  }),
              ],
            }),
          ],
        });
      }
      function DialogHeader({ className, ...properties }) {
        return (0, jsx_runtime.jsx)("div", {
          "data-slot": "dialog-header",
          className: (0, utils.cn)("flex flex-col gap-2 text-center sm:text-left", className),
          ...properties,
        });
      }
      function DialogFooter({ className, ...properties }) {
        return _jsx("div", {
          "data-slot": "dialog-footer",
          className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
          ...properties,
        });
      }
      function DialogTitle({ className, ...properties }) {
        return (0, jsx_runtime.jsx)(dist.hE, {
          "data-slot": "dialog-title",
          className: (0, utils.cn)("text-lg leading-none font-semibold", className),
          ...properties,
        });
      }
      function DialogDescription({ className, ...properties }) {
        return (0, jsx_runtime.jsx)(dist.VY, {
          "data-slot": "dialog-description",
          className: (0, utils.cn)("text-muted-foreground text-sm", className),
          ...properties,
        });
      }
      try {
        (Dialog.displayName = "Dialog"),
          (Dialog.__docgenInfo = { description: "", displayName: "Dialog", props: {} }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/dialog.tsx#Dialog"] = {
              docgenInfo: Dialog.__docgenInfo,
              name: "Dialog",
              path: "src/components/ui/dialog.tsx#Dialog",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (DialogClose.displayName = "DialogClose"),
          (DialogClose.__docgenInfo = {
            description: "",
            displayName: "DialogClose",
            props: {
              asChild: {
                defaultValue: null,
                description: "",
                name: "asChild",
                required: !1,
                type: { name: "boolean" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/dialog.tsx#DialogClose"] = {
              docgenInfo: DialogClose.__docgenInfo,
              name: "DialogClose",
              path: "src/components/ui/dialog.tsx#DialogClose",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (DialogContent.displayName = "DialogContent"),
          (DialogContent.__docgenInfo = {
            description: "",
            displayName: "DialogContent",
            props: {
              hideClose: {
                defaultValue: { value: "false" },
                description: "",
                name: "hideClose",
                required: !1,
                type: { name: "boolean" },
              },
              asChild: {
                defaultValue: null,
                description: "",
                name: "asChild",
                required: !1,
                type: { name: "boolean" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/dialog.tsx#DialogContent"] = {
              docgenInfo: DialogContent.__docgenInfo,
              name: "DialogContent",
              path: "src/components/ui/dialog.tsx#DialogContent",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (DialogDescription.displayName = "DialogDescription"),
          (DialogDescription.__docgenInfo = {
            description: "",
            displayName: "DialogDescription",
            props: {
              asChild: {
                defaultValue: null,
                description: "",
                name: "asChild",
                required: !1,
                type: { name: "boolean" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/dialog.tsx#DialogDescription"] = {
              docgenInfo: DialogDescription.__docgenInfo,
              name: "DialogDescription",
              path: "src/components/ui/dialog.tsx#DialogDescription",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (DialogFooter.displayName = "DialogFooter"),
          (DialogFooter.__docgenInfo = { description: "", displayName: "DialogFooter", props: {} }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/dialog.tsx#DialogFooter"] = {
              docgenInfo: DialogFooter.__docgenInfo,
              name: "DialogFooter",
              path: "src/components/ui/dialog.tsx#DialogFooter",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (DialogHeader.displayName = "DialogHeader"),
          (DialogHeader.__docgenInfo = { description: "", displayName: "DialogHeader", props: {} }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/dialog.tsx#DialogHeader"] = {
              docgenInfo: DialogHeader.__docgenInfo,
              name: "DialogHeader",
              path: "src/components/ui/dialog.tsx#DialogHeader",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (DialogOverlay.displayName = "DialogOverlay"),
          (DialogOverlay.__docgenInfo = {
            description: "",
            displayName: "DialogOverlay",
            props: {
              asChild: {
                defaultValue: null,
                description: "",
                name: "asChild",
                required: !1,
                type: { name: "boolean" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/dialog.tsx#DialogOverlay"] = {
              docgenInfo: DialogOverlay.__docgenInfo,
              name: "DialogOverlay",
              path: "src/components/ui/dialog.tsx#DialogOverlay",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (DialogPortal.displayName = "DialogPortal"),
          (DialogPortal.__docgenInfo = { description: "", displayName: "DialogPortal", props: {} }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/dialog.tsx#DialogPortal"] = {
              docgenInfo: DialogPortal.__docgenInfo,
              name: "DialogPortal",
              path: "src/components/ui/dialog.tsx#DialogPortal",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (DialogTitle.displayName = "DialogTitle"),
          (DialogTitle.__docgenInfo = {
            description: "",
            displayName: "DialogTitle",
            props: {
              asChild: {
                defaultValue: null,
                description: "",
                name: "asChild",
                required: !1,
                type: { name: "boolean" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/dialog.tsx#DialogTitle"] = {
              docgenInfo: DialogTitle.__docgenInfo,
              name: "DialogTitle",
              path: "src/components/ui/dialog.tsx#DialogTitle",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (DialogTrigger.displayName = "DialogTrigger"),
          (DialogTrigger.__docgenInfo = {
            description: "",
            displayName: "DialogTrigger",
            props: {
              asChild: {
                defaultValue: null,
                description: "",
                name: "asChild",
                required: !1,
                type: { name: "boolean" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/dialog.tsx#DialogTrigger"] = {
              docgenInfo: DialogTrigger.__docgenInfo,
              name: "DialogTrigger",
              path: "src/components/ui/dialog.tsx#DialogTrigger",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var next_image = __webpack_require__(
        "./node_modules/.pnpm/@storybook+nextjs@8.6.12_es_efd1545d91a71caf7c9c4fad0b344f57/node_modules/@storybook/nextjs/dist/images/next-image.mjs",
      );
      function ReusableDialog({
        trigger,
        hideClose,
        title,
        description,
        children,
        headerClassName,
        wrapperClassName,
        className,
        open,
        img,
        onOpenChange,
      }) {
        return (0, jsx_runtime.jsxs)(Dialog, {
          open,
          onOpenChange,
          children: [
            (0, jsx_runtime.jsx)(DialogTrigger, { asChild: !0, children: trigger }),
            (0, jsx_runtime.jsx)("div", {
              className: (0, utils.cn)(
                "fixed inset-0 z-50",
                open ? "bg-black/50 backdrop-blur-sm" : "pointer-events-none",
              ),
              children: (0, jsx_runtime.jsxs)(DialogContent, {
                hideClose,
                className: (0, utils.cn)("border-default h-full items-center sm:max-w-[425px] md:h-fit", className),
                children: [
                  wrapperClassName ||
                    (img &&
                      (0, jsx_runtime.jsxs)(DialogHeader, {
                        className: (0, utils.cn)("h-fit", wrapperClassName),
                        children: [
                          img &&
                            (0, jsx_runtime.jsx)(next_image.A, {
                              width: 100,
                              height: 100,
                              src: img || "",
                              alt: "dangerous",
                              className: "h-[100px] w-[100px]",
                            }),
                          (0, jsx_runtime.jsx)(DialogTitle, {
                            className: (0, utils.cn)("text-2xl", headerClassName),
                            children: title,
                          }),
                          (0, jsx_runtime.jsx)(DialogDescription, { children: description }),
                        ],
                      })),
                  children,
                ],
              }),
            }),
          ],
        });
      }
      try {
        (ReusableDialog.displayName = "ReusableDialog"),
          (ReusableDialog.__docgenInfo = {
            description: "",
            displayName: "ReusableDialog",
            props: {
              trigger: {
                defaultValue: null,
                description: "",
                name: "trigger",
                required: !0,
                type: { name: "ReactNode" },
              },
              title: { defaultValue: null, description: "", name: "title", required: !1, type: { name: "string" } },
              img: { defaultValue: null, description: "", name: "img", required: !1, type: { name: "string" } },
              description: {
                defaultValue: null,
                description: "",
                name: "description",
                required: !1,
                type: { name: "string" },
              },
              headerClassName: {
                defaultValue: null,
                description: "",
                name: "headerClassName",
                required: !1,
                type: { name: "string" },
              },
              wrapperClassName: {
                defaultValue: null,
                description: "",
                name: "wrapperClassName",
                required: !1,
                type: { name: "string" },
              },
              open: { defaultValue: null, description: "", name: "open", required: !1, type: { name: "boolean" } },
              hideClose: {
                defaultValue: null,
                description: "",
                name: "hideClose",
                required: !1,
                type: { name: "boolean" },
              },
              onOpenChange: {
                defaultValue: null,
                description: "",
                name: "onOpenChange",
                required: !1,
                type: { name: "((open: boolean) => void)" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/shared/dialog/Dialog.tsx#ReusableDialog"] = {
              docgenInfo: ReusableDialog.__docgenInfo,
              name: "ReusableDialog",
              path: "src/components/shared/dialog/Dialog.tsx#ReusableDialog",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      const SearchDialog = () => {
        const [isOpen, setIsOpen] = (0, react.useState)(!1);
        return (0, jsx_runtime.jsx)(ReusableDialog, {
          hideClose: !0,
          trigger: (0, jsx_runtime.jsx)("button", {
            "aria-label": "Open Search Dialog",
            className: "border-neutral-dark-2 rounded-full border p-2",
            children: (0, jsx_runtime.jsx)(lu.qbB, { size: 20 }),
          }),
          open: isOpen,
          onOpenChange: setIsOpen,
          className: "top-[4rem] sm:max-w-[1240px] xl:top-[10rem] xl:rounded-[49px]",
          children: (0, jsx_runtime.jsxs)("div", {
            className: "flex items-center border-b",
            children: [
              (0, jsx_runtime.jsx)(lu.qbB, { size: 28 }),
              (0, jsx_runtime.jsx)(input.p, {
                className:
                  "mx-4 h-[46px] border-0 hover:border-0 hover:ring-0 focus:border-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none active:border-0 active:ring-0 active:outline-none",
              }),
              (0, jsx_runtime.jsx)(button_button.A, {
                size: "icon",
                isIconOnly: !0,
                icon: (0, jsx_runtime.jsx)(x.A, { size: 28 }),
                onClick: () => setIsOpen(!1),
                "aria-label": "Close Search Dialog",
                className: "shadow-none",
              }),
            ],
          }),
        });
      };
      var react_navigation_menu_dist = __webpack_require__(
          "./node_modules/.pnpm/@radix-ui+react-navigation-_0bcb5d647c45d8721f128ec0fbc65c31/node_modules/@radix-ui/react-navigation-menu/dist/index.mjs",
        ),
        class_variance_authority_dist = __webpack_require__(
          "./node_modules/.pnpm/class-variance-authority@0.7.1/node_modules/class-variance-authority/dist/index.mjs",
        ),
        chevron_down = __webpack_require__(
          "./node_modules/.pnpm/lucide-react@0.503.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/chevron-down.js",
        );
      function NavigationMenu({ className, children, viewport = !0, ...properties }) {
        return (0, jsx_runtime.jsxs)(react_navigation_menu_dist.bL, {
          "data-slot": "navigation-menu",
          "data-viewport": viewport,
          className: (0, utils.cn)(
            "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
            className,
          ),
          ...properties,
          children: [children, viewport && (0, jsx_runtime.jsx)(NavigationMenuViewport, {})],
        });
      }
      function NavigationMenuList({ className, ...properties }) {
        return (0, jsx_runtime.jsx)(react_navigation_menu_dist.B8, {
          "data-slot": "navigation-menu-list",
          className: (0, utils.cn)("group flex flex-1 list-none items-center justify-center gap-1", className),
          ...properties,
        });
      }
      function NavigationMenuItem({ className, ...properties }) {
        return (0, jsx_runtime.jsx)(react_navigation_menu_dist.q7, {
          "data-slot": "navigation-menu-item",
          className: (0, utils.cn)("relative", className),
          ...properties,
        });
      }
      const navigationMenuTriggerStyle = (0, class_variance_authority_dist.F)(
        "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1",
      );
      function NavigationMenuTrigger({ className, children, ...properties }) {
        return (0, jsx_runtime.jsxs)(react_navigation_menu_dist.l9, {
          "data-slot": "navigation-menu-trigger",
          className: (0, utils.cn)(navigationMenuTriggerStyle(), "group", className),
          ...properties,
          children: [
            children,
            " ",
            (0, jsx_runtime.jsx)(chevron_down.A, {
              className: "relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180",
              "aria-hidden": "true",
            }),
          ],
        });
      }
      function NavigationMenuContent({ className, ...properties }) {
        return (0, jsx_runtime.jsx)(react_navigation_menu_dist.UC, {
          "data-slot": "navigation-menu-content",
          className: (0, utils.cn)(
            "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
            "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
            className,
          ),
          ...properties,
        });
      }
      function NavigationMenuViewport({ className, ...properties }) {
        return (0, jsx_runtime.jsx)("div", {
          className: (0, utils.cn)("absolute top-full left-0 isolate z-50 flex justify-center"),
          children: (0, jsx_runtime.jsx)(react_navigation_menu_dist.LM, {
            "data-slot": "navigation-menu-viewport",
            className: (0, utils.cn)(
              "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
              className,
            ),
            ...properties,
          }),
        });
      }
      function NavigationMenuLink({ className, ...properties }) {
        return (0, jsx_runtime.jsx)(react_navigation_menu_dist.N_, {
          "data-slot": "navigation-menu-link",
          className: (0, utils.cn)(
            "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
            className,
          ),
          ...properties,
        });
      }
      function NavigationMenuIndicator({ className, ...properties }) {
        return _jsx(NavigationMenuPrimitive.Indicator, {
          "data-slot": "navigation-menu-indicator",
          className: cn(
            "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
            className,
          ),
          ...properties,
          children: _jsx("div", {
            className: "bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md",
          }),
        });
      }
      try {
        (NavigationMenu.displayName = "NavigationMenu"),
          (NavigationMenu.__docgenInfo = {
            description: "",
            displayName: "NavigationMenu",
            props: {
              asChild: {
                defaultValue: null,
                description: "",
                name: "asChild",
                required: !1,
                type: { name: "boolean" },
              },
              viewport: {
                defaultValue: { value: "true" },
                description: "",
                name: "viewport",
                required: !1,
                type: { name: "boolean" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/navigation-menu.tsx#NavigationMenu"] = {
              docgenInfo: NavigationMenu.__docgenInfo,
              name: "NavigationMenu",
              path: "src/components/ui/navigation-menu.tsx#NavigationMenu",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (NavigationMenuList.displayName = "NavigationMenuList"),
          (NavigationMenuList.__docgenInfo = {
            description: "",
            displayName: "NavigationMenuList",
            props: {
              asChild: {
                defaultValue: null,
                description: "",
                name: "asChild",
                required: !1,
                type: { name: "boolean" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/navigation-menu.tsx#NavigationMenuList"] = {
              docgenInfo: NavigationMenuList.__docgenInfo,
              name: "NavigationMenuList",
              path: "src/components/ui/navigation-menu.tsx#NavigationMenuList",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (NavigationMenuItem.displayName = "NavigationMenuItem"),
          (NavigationMenuItem.__docgenInfo = {
            description: "",
            displayName: "NavigationMenuItem",
            props: {
              asChild: {
                defaultValue: null,
                description: "",
                name: "asChild",
                required: !1,
                type: { name: "boolean" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/navigation-menu.tsx#NavigationMenuItem"] = {
              docgenInfo: NavigationMenuItem.__docgenInfo,
              name: "NavigationMenuItem",
              path: "src/components/ui/navigation-menu.tsx#NavigationMenuItem",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (NavigationMenuContent.displayName = "NavigationMenuContent"),
          (NavigationMenuContent.__docgenInfo = {
            description: "",
            displayName: "NavigationMenuContent",
            props: {
              asChild: {
                defaultValue: null,
                description: "",
                name: "asChild",
                required: !1,
                type: { name: "boolean" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/navigation-menu.tsx#NavigationMenuContent"] = {
              docgenInfo: NavigationMenuContent.__docgenInfo,
              name: "NavigationMenuContent",
              path: "src/components/ui/navigation-menu.tsx#NavigationMenuContent",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (NavigationMenuTrigger.displayName = "NavigationMenuTrigger"),
          (NavigationMenuTrigger.__docgenInfo = {
            description: "",
            displayName: "NavigationMenuTrigger",
            props: {
              asChild: {
                defaultValue: null,
                description: "",
                name: "asChild",
                required: !1,
                type: { name: "boolean" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/navigation-menu.tsx#NavigationMenuTrigger"] = {
              docgenInfo: NavigationMenuTrigger.__docgenInfo,
              name: "NavigationMenuTrigger",
              path: "src/components/ui/navigation-menu.tsx#NavigationMenuTrigger",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (NavigationMenuLink.displayName = "NavigationMenuLink"),
          (NavigationMenuLink.__docgenInfo = {
            description: "",
            displayName: "NavigationMenuLink",
            props: {
              asChild: {
                defaultValue: null,
                description: "",
                name: "asChild",
                required: !1,
                type: { name: "boolean" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/navigation-menu.tsx#NavigationMenuLink"] = {
              docgenInfo: NavigationMenuLink.__docgenInfo,
              name: "NavigationMenuLink",
              path: "src/components/ui/navigation-menu.tsx#NavigationMenuLink",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (NavigationMenuIndicator.displayName = "NavigationMenuIndicator"),
          (NavigationMenuIndicator.__docgenInfo = {
            description: "",
            displayName: "NavigationMenuIndicator",
            props: {
              asChild: {
                defaultValue: null,
                description: "",
                name: "asChild",
                required: !1,
                type: { name: "boolean" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/navigation-menu.tsx#NavigationMenuIndicator"] = {
              docgenInfo: NavigationMenuIndicator.__docgenInfo,
              name: "NavigationMenuIndicator",
              path: "src/components/ui/navigation-menu.tsx#NavigationMenuIndicator",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (NavigationMenuViewport.displayName = "NavigationMenuViewport"),
          (NavigationMenuViewport.__docgenInfo = {
            description: "",
            displayName: "NavigationMenuViewport",
            props: {
              asChild: {
                defaultValue: null,
                description: "",
                name: "asChild",
                required: !1,
                type: { name: "boolean" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/navigation-menu.tsx#NavigationMenuViewport"] = {
              docgenInfo: NavigationMenuViewport.__docgenInfo,
              name: "NavigationMenuViewport",
              path: "src/components/ui/navigation-menu.tsx#NavigationMenuViewport",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var next_link = __webpack_require__(
          "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/link.js",
        ),
        link_default = __webpack_require__.n(next_link);
      const NavItems = ({ links, isMobile, className }) =>
          (0, jsx_runtime.jsx)(NavigationMenu, {
            className: (0, utils.cn)(isMobile && "block max-w-full", className),
            children: (0, jsx_runtime.jsx)(NavigationMenuList, {
              className: (0, utils.cn)(isMobile && "block"),
              children: links.map((link, index) =>
                "dropdown" === link.type && link.subLinks
                  ? (0, jsx_runtime.jsxs)(
                      NavigationMenuItem,
                      {
                        children: [
                          (0, jsx_runtime.jsx)(NavigationMenuTrigger, { className: "w-full", children: link.title }),
                          (0, jsx_runtime.jsx)(NavigationMenuContent, {
                            children: (0, jsx_runtime.jsx)("ul", {
                              className: "grid gap-3 p-4 md:w-[600px] md:grid-cols-2",
                              children: link.subLinks.map((subLink) =>
                                (0, jsx_runtime.jsx)(
                                  ListItem,
                                  { href: subLink.href, title: subLink.title, children: subLink.description },
                                  subLink.id,
                                ),
                              ),
                            }),
                          }),
                        ],
                      },
                      index,
                    )
                  : (0, jsx_runtime.jsx)(
                      NavigationMenuItem,
                      {
                        children: (0, jsx_runtime.jsx)(NavigationMenuLink, {
                          asChild: !0,
                          children: (0, jsx_runtime.jsx)(link_default(), {
                            href: link.href,
                            className: (0, utils.cn)(navigationMenuTriggerStyle(), "w-full"),
                            legacyBehavior: !1,
                            children: link.title,
                          }),
                        }),
                      },
                      index,
                    ),
              ),
            }),
          }),
        ListItem = react.forwardRef(({ className, title, children, href, ...properties }, reference) =>
          (0, jsx_runtime.jsx)("li", {
            children: (0, jsx_runtime.jsx)(NavigationMenuLink, {
              asChild: !0,
              children: (0, jsx_runtime.jsxs)(link_default(), {
                ref: reference,
                href,
                className: (0, utils.cn)(
                  "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
                  className,
                ),
                ...properties,
                children: [
                  (0, jsx_runtime.jsx)("div", { className: "text-sm leading-none font-medium", children: title }),
                  (0, jsx_runtime.jsx)("p", {
                    className: "text-muted-foreground line-clamp-2 text-sm leading-snug",
                    children,
                  }),
                ],
              }),
            }),
          }),
        );
      ListItem.displayName = "ListItem";
      try {
        (NavItems.displayName = "ListItem"),
          (NavItems.__docgenInfo = {
            description: "",
            displayName: "ListItem",
            props: {
              links: { defaultValue: null, description: "", name: "links", required: !0, type: { name: "NavLink[]" } },
              isMobile: {
                defaultValue: null,
                description: "",
                name: "isMobile",
                required: !1,
                type: { name: "boolean" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/shared/navbar/nav-menu-item.tsx#ListItem"] = {
              docgenInfo: ListItem.__docgenInfo,
              name: "ListItem",
              path: "src/components/shared/navbar/nav-menu-item.tsx#ListItem",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      const Navbar = (0, react.forwardRef)(
        (
          {
            logo = (0, jsx_runtime.jsx)(shared_logo.g, { logo: "/images/skicom.svg" }),
            links = NAV_LINKS,
            cta,
            user,
            className,
            navbarStyle,
            sticky = !0,
          },
          reference,
        ) => {
          const pathname = (0, navigation.usePathname)(),
            [isMobileMenuOpen, setIsMobileMenuOpen] = (0, react.useState)(!1);
          return (
            (0, react.useEffect)(() => {
              setIsMobileMenuOpen(!1);
            }, [pathname]),
            (0, jsx_runtime.jsxs)("nav", {
              ref: reference,
              className: (0, utils.cn)("w-full transition-all duration-300", sticky && "fixed top-0 z-50", navbarStyle),
              children: [
                (0, jsx_runtime.jsx)(Wrapper, {
                  className: "p-0",
                  children: (0, jsx_runtime.jsxs)("div", {
                    className: (0, utils.cn)("flex h-16 items-center justify-between md:h-24", className),
                    children: [
                      (0, jsx_runtime.jsx)("div", { className: "flex-shrink-0", children: logo }),
                      (0, jsx_runtime.jsx)(NavItems, { links, className: "hidden lg:block" }),
                      (0, jsx_runtime.jsxs)("div", {
                        className: "flex items-center gap-4",
                        children: [
                          (0, jsx_runtime.jsx)(SearchDialog, {}),
                          user ||
                            cta ||
                            (0, jsx_runtime.jsxs)("div", {
                              className: "hidden gap-4 lg:flex",
                              children: [
                                (0, jsx_runtime.jsx)(button_button.A, { href: "/login", children: "Sign in" }),
                                (0, jsx_runtime.jsx)(button_button.A, {
                                  variant: "accent",
                                  href: "/register",
                                  children: "Sign up",
                                }),
                              ],
                            }),
                          (0, jsx_runtime.jsx)(button_button.A, {
                            variant: "ghost",
                            size: "icon",
                            className: "lg:hidden",
                            onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
                            "aria-label": "Toggle menu",
                            children: isMobileMenuOpen
                              ? (0, jsx_runtime.jsx)(x.A, { className: "h-6 w-6" })
                              : (0, jsx_runtime.jsx)(menu.A, { className: "h-6 w-6" }),
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                isMobileMenuOpen &&
                  (0, jsx_runtime.jsx)("div", {
                    className: (0, utils.cn)(
                      "fixed inset-x-0 z-40 w-full bg-white shadow-md lg:hidden",
                      sticky ? "top-16 md:top-20" : "top-0",
                    ),
                    children: (0, jsx_runtime.jsxs)("div", {
                      className: "space-y-2 px-4 py-3",
                      children: [
                        (0, jsx_runtime.jsx)(NavItems, { links, isMobile: !0 }),
                        !user &&
                          (0, jsx_runtime.jsxs)("div", {
                            className: "flex flex-col space-y-2 pt-2",
                            children: [
                              (0, jsx_runtime.jsx)(button_button.A, {
                                href: "/login",
                                className: "w-full",
                                children: "Sign in",
                              }),
                              (0, jsx_runtime.jsx)(button_button.A, {
                                variant: "primary",
                                href: "/register",
                                className: "w-full",
                                children: "Sign up",
                              }),
                            ],
                          }),
                      ],
                    }),
                  }),
              ],
            })
          );
        },
      );
      Navbar.displayName = "Navbar";
      try {
        (Navbar.displayName = "Navbar"),
          (Navbar.__docgenInfo = { description: "", displayName: "Navbar", props: {} }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/shared/navbar/index.tsx#Navbar"] = {
              docgenInfo: Navbar.__docgenInfo,
              name: "Navbar",
              path: "src/components/shared/navbar/index.tsx#Navbar",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      const Navbar_stories = {
          title: "Molecules/Navbar",
          component: Navbar,
          parameters: { layout: "fullscreen" },
          argTypes: { sticky: { control: { type: "boolean" } } },
        },
        UserProfile = () =>
          (0, jsx_runtime.jsxs)("div", {
            className: "flex items-center space-x-2",
            children: [
              (0, jsx_runtime.jsx)("div", { className: "h-8 w-8 rounded-full bg-gray-300" }),
              (0, jsx_runtime.jsx)("span", { className: "text-sm", children: "John Doe" }),
            ],
          }),
        Default = {
          args: {
            logo: (0, jsx_runtime.jsx)(shared_logo.g, { logo: "/images/skicom.svg" }),
            links: NAV_LINKS,
            className: "bg-white px-4 lg:rounded-full lg:px-7",
            sticky: !0,
          },
        },
        WithUser = { args: { ...Default.args, user: (0, jsx_runtime.jsx)(UserProfile, {}) } },
        __namedExportsOrder = ["Default", "WithUser"];
      (Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              '{\n  args: {\n    logo: <Logo logo={"/images/skicom.svg"} />,\n    links: NAV_LINKS,\n    className: "bg-white px-4 lg:rounded-full lg:px-7",\n    sticky: true\n  }\n}',
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (WithUser.parameters = {
          ...WithUser.parameters,
          docs: {
            ...WithUser.parameters?.docs,
            source: {
              originalSource: "{\n  args: {\n    ...Default.args,\n    user: <UserProfile />\n  }\n}",
              ...WithUser.parameters?.docs?.source,
            },
          },
        });
    },
    "./src/components/ui/input.tsx": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.d(__webpack_exports__, { p: () => Input });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react/jsx-runtime.js",
        ),
        _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/utils.ts");
      __webpack_require__(
        "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react/index.js",
      );
      function Input({ className, type, ...properties }) {
        return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
          type,
          "data-slot": "input",
          className: (0, _lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className,
          ),
          ...properties,
        });
      }
      try {
        (Input.displayName = "Input"),
          (Input.__docgenInfo = { description: "", displayName: "Input", props: {} }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/input.tsx#Input"] = {
              docgenInfo: Input.__docgenInfo,
              name: "Input",
              path: "src/components/ui/input.tsx#Input",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
  },
]);
