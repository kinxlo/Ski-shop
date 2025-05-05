"use strict";
(self.webpackChunktsa_app = self.webpackChunktsa_app || []).push([
  [599],
  {
    "./src/components/shared/breadcrumb/Breadcrumb.stories.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => Breadcrumb_stories,
        });
      var jsx_runtime = __webpack_require__(
          "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react/jsx-runtime.js",
        ),
        utils = __webpack_require__("./src/lib/utils.ts"),
        dist = __webpack_require__(
          "./node_modules/.pnpm/@radix-ui+react-slot@1.2.0_@types+react@19.1.2_react@19.1.0/node_modules/@radix-ui/react-slot/dist/index.mjs",
        ),
        chevron_right = __webpack_require__(
          "./node_modules/.pnpm/lucide-react@0.503.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/chevron-right.js",
        ),
        ellipsis = __webpack_require__(
          "./node_modules/.pnpm/lucide-react@0.503.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/ellipsis.js",
        );
      __webpack_require__(
        "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react/index.js",
      );
      function Breadcrumb({ ...properties }) {
        return (0, jsx_runtime.jsx)("nav", { "aria-label": "breadcrumb", "data-slot": "breadcrumb", ...properties });
      }
      function BreadcrumbList({ className, ...properties }) {
        return (0, jsx_runtime.jsx)("ol", {
          "data-slot": "breadcrumb-list",
          className: (0, utils.cn)(
            "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
            className,
          ),
          ...properties,
        });
      }
      function BreadcrumbItem({ className, ...properties }) {
        return (0, jsx_runtime.jsx)("li", {
          "data-slot": "breadcrumb-item",
          className: (0, utils.cn)("inline-flex items-center gap-1.5", className),
          ...properties,
        });
      }
      function BreadcrumbLink({ asChild, className, ...properties }) {
        const Comp = asChild ? dist.DX : "a";
        return (0, jsx_runtime.jsx)(Comp, {
          "data-slot": "breadcrumb-link",
          className: (0, utils.cn)("hover:text-foreground transition-colors", className),
          ...properties,
        });
      }
      function BreadcrumbPage({ className, ...properties }) {
        return (0, jsx_runtime.jsx)("span", {
          "data-slot": "breadcrumb-page",
          role: "link",
          "aria-disabled": "true",
          "aria-current": "page",
          className: (0, utils.cn)("text-foreground font-normal", className),
          ...properties,
        });
      }
      function BreadcrumbSeparator({ children, className, ...properties }) {
        return (0, jsx_runtime.jsx)("li", {
          "data-slot": "breadcrumb-separator",
          role: "presentation",
          "aria-hidden": "true",
          className: (0, utils.cn)("[&>svg]:size-3.5", className),
          ...properties,
          children: null != children ? children : (0, jsx_runtime.jsx)(chevron_right.A, {}),
        });
      }
      function BreadcrumbEllipsis({ className, ...properties }) {
        return (0, jsx_runtime.jsxs)("span", {
          "data-slot": "breadcrumb-ellipsis",
          role: "presentation",
          "aria-hidden": "true",
          className: (0, utils.cn)("flex size-9 items-center justify-center", className),
          ...properties,
          children: [
            (0, jsx_runtime.jsx)(ellipsis.A, { className: "size-4" }),
            (0, jsx_runtime.jsx)("span", { className: "sr-only", children: "More" }),
          ],
        });
      }
      try {
        (Breadcrumb.displayName = "Breadcrumb"),
          (Breadcrumb.__docgenInfo = { description: "", displayName: "Breadcrumb", props: {} }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/breadcrumb.tsx#Breadcrumb"] = {
              docgenInfo: Breadcrumb.__docgenInfo,
              name: "Breadcrumb",
              path: "src/components/ui/breadcrumb.tsx#Breadcrumb",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (BreadcrumbList.displayName = "BreadcrumbList"),
          (BreadcrumbList.__docgenInfo = { description: "", displayName: "BreadcrumbList", props: {} }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/breadcrumb.tsx#BreadcrumbList"] = {
              docgenInfo: BreadcrumbList.__docgenInfo,
              name: "BreadcrumbList",
              path: "src/components/ui/breadcrumb.tsx#BreadcrumbList",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (BreadcrumbItem.displayName = "BreadcrumbItem"),
          (BreadcrumbItem.__docgenInfo = { description: "", displayName: "BreadcrumbItem", props: {} }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/breadcrumb.tsx#BreadcrumbItem"] = {
              docgenInfo: BreadcrumbItem.__docgenInfo,
              name: "BreadcrumbItem",
              path: "src/components/ui/breadcrumb.tsx#BreadcrumbItem",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (BreadcrumbLink.displayName = "BreadcrumbLink"),
          (BreadcrumbLink.__docgenInfo = {
            description: "",
            displayName: "BreadcrumbLink",
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
            (STORYBOOK_REACT_CLASSES["src/components/ui/breadcrumb.tsx#BreadcrumbLink"] = {
              docgenInfo: BreadcrumbLink.__docgenInfo,
              name: "BreadcrumbLink",
              path: "src/components/ui/breadcrumb.tsx#BreadcrumbLink",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (BreadcrumbPage.displayName = "BreadcrumbPage"),
          (BreadcrumbPage.__docgenInfo = { description: "", displayName: "BreadcrumbPage", props: {} }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/breadcrumb.tsx#BreadcrumbPage"] = {
              docgenInfo: BreadcrumbPage.__docgenInfo,
              name: "BreadcrumbPage",
              path: "src/components/ui/breadcrumb.tsx#BreadcrumbPage",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (BreadcrumbSeparator.displayName = "BreadcrumbSeparator"),
          (BreadcrumbSeparator.__docgenInfo = { description: "", displayName: "BreadcrumbSeparator", props: {} }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/breadcrumb.tsx#BreadcrumbSeparator"] = {
              docgenInfo: BreadcrumbSeparator.__docgenInfo,
              name: "BreadcrumbSeparator",
              path: "src/components/ui/breadcrumb.tsx#BreadcrumbSeparator",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"),
          (BreadcrumbEllipsis.__docgenInfo = { description: "", displayName: "BreadcrumbEllipsis", props: {} }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/breadcrumb.tsx#BreadcrumbEllipsis"] = {
              docgenInfo: BreadcrumbEllipsis.__docgenInfo,
              name: "BreadcrumbEllipsis",
              path: "src/components/ui/breadcrumb.tsx#BreadcrumbEllipsis",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var react_dropdown_menu_dist = __webpack_require__(
        "./node_modules/.pnpm/@radix-ui+react-dropdown-me_5db6614d90691dcfdcad6619145d4a08/node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs",
      );
      function DropdownMenu({ ...properties }) {
        return (0, jsx_runtime.jsx)(react_dropdown_menu_dist.bL, { "data-slot": "dropdown-menu", ...properties });
      }
      function DropdownMenuPortal({ ...properties }) {
        return _jsx(DropdownMenuPrimitive.Portal, { "data-slot": "dropdown-menu-portal", ...properties });
      }
      function DropdownMenuTrigger({ ...properties }) {
        return (0, jsx_runtime.jsx)(react_dropdown_menu_dist.l9, {
          "data-slot": "dropdown-menu-trigger",
          ...properties,
        });
      }
      function DropdownMenuContent({ className, sideOffset = 4, ...properties }) {
        return (0, jsx_runtime.jsx)(react_dropdown_menu_dist.ZL, {
          children: (0, jsx_runtime.jsx)(react_dropdown_menu_dist.UC, {
            "data-slot": "dropdown-menu-content",
            sideOffset,
            className: (0, utils.cn)(
              "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
              className,
            ),
            ...properties,
          }),
        });
      }
      function DropdownMenuGroup({ ...properties }) {
        return _jsx(DropdownMenuPrimitive.Group, { "data-slot": "dropdown-menu-group", ...properties });
      }
      function DropdownMenuItem({ className, inset, variant = "default", ...properties }) {
        return (0, jsx_runtime.jsx)(react_dropdown_menu_dist.q7, {
          "data-slot": "dropdown-menu-item",
          "data-inset": inset,
          "data-variant": variant,
          className: (0, utils.cn)(
            "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className,
          ),
          ...properties,
        });
      }
      function DropdownMenuCheckboxItem({ className, children, checked, ...properties }) {
        return _jsxs(DropdownMenuPrimitive.CheckboxItem, {
          "data-slot": "dropdown-menu-checkbox-item",
          className: cn(
            "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className,
          ),
          checked,
          ...properties,
          children: [
            _jsx("span", {
              className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
              children: _jsx(DropdownMenuPrimitive.ItemIndicator, {
                children: _jsx(CheckIcon, { className: "size-4" }),
              }),
            }),
            children,
          ],
        });
      }
      function DropdownMenuRadioGroup({ ...properties }) {
        return _jsx(DropdownMenuPrimitive.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...properties });
      }
      function DropdownMenuRadioItem({ className, children, ...properties }) {
        return _jsxs(DropdownMenuPrimitive.RadioItem, {
          "data-slot": "dropdown-menu-radio-item",
          className: cn(
            "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className,
          ),
          ...properties,
          children: [
            _jsx("span", {
              className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
              children: _jsx(DropdownMenuPrimitive.ItemIndicator, {
                children: _jsx(CircleIcon, { className: "size-2 fill-current" }),
              }),
            }),
            children,
          ],
        });
      }
      function DropdownMenuLabel({ className, inset, ...properties }) {
        return _jsx(DropdownMenuPrimitive.Label, {
          "data-slot": "dropdown-menu-label",
          "data-inset": inset,
          className: cn("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", className),
          ...properties,
        });
      }
      function DropdownMenuSeparator({ className, ...properties }) {
        return _jsx(DropdownMenuPrimitive.Separator, {
          "data-slot": "dropdown-menu-separator",
          className: cn("bg-border -mx-1 my-1 h-px", className),
          ...properties,
        });
      }
      function DropdownMenuShortcut({ className, ...properties }) {
        return _jsx("span", {
          "data-slot": "dropdown-menu-shortcut",
          className: cn("text-muted-foreground ml-auto text-xs tracking-widest", className),
          ...properties,
        });
      }
      function DropdownMenuSub({ ...properties }) {
        return _jsx(DropdownMenuPrimitive.Sub, { "data-slot": "dropdown-menu-sub", ...properties });
      }
      function DropdownMenuSubTrigger({ className, inset, children, ...properties }) {
        return _jsxs(DropdownMenuPrimitive.SubTrigger, {
          "data-slot": "dropdown-menu-sub-trigger",
          "data-inset": inset,
          className: cn(
            "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
            className,
          ),
          ...properties,
          children: [children, _jsx(ChevronRightIcon, { className: "ml-auto size-4" })],
        });
      }
      function DropdownMenuSubContent({ className, ...properties }) {
        return _jsx(DropdownMenuPrimitive.SubContent, {
          "data-slot": "dropdown-menu-sub-content",
          className: cn(
            "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
            className,
          ),
          ...properties,
        });
      }
      try {
        (DropdownMenu.displayName = "DropdownMenu"),
          (DropdownMenu.__docgenInfo = { description: "", displayName: "DropdownMenu", props: {} }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/dropdown-menu.tsx#DropdownMenu"] = {
              docgenInfo: DropdownMenu.__docgenInfo,
              name: "DropdownMenu",
              path: "src/components/ui/dropdown-menu.tsx#DropdownMenu",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (DropdownMenuPortal.displayName = "DropdownMenuPortal"),
          (DropdownMenuPortal.__docgenInfo = { description: "", displayName: "DropdownMenuPortal", props: {} }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/dropdown-menu.tsx#DropdownMenuPortal"] = {
              docgenInfo: DropdownMenuPortal.__docgenInfo,
              name: "DropdownMenuPortal",
              path: "src/components/ui/dropdown-menu.tsx#DropdownMenuPortal",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (DropdownMenuTrigger.displayName = "DropdownMenuTrigger"),
          (DropdownMenuTrigger.__docgenInfo = {
            description: "",
            displayName: "DropdownMenuTrigger",
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
            (STORYBOOK_REACT_CLASSES["src/components/ui/dropdown-menu.tsx#DropdownMenuTrigger"] = {
              docgenInfo: DropdownMenuTrigger.__docgenInfo,
              name: "DropdownMenuTrigger",
              path: "src/components/ui/dropdown-menu.tsx#DropdownMenuTrigger",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (DropdownMenuContent.displayName = "DropdownMenuContent"),
          (DropdownMenuContent.__docgenInfo = {
            description: "",
            displayName: "DropdownMenuContent",
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
            (STORYBOOK_REACT_CLASSES["src/components/ui/dropdown-menu.tsx#DropdownMenuContent"] = {
              docgenInfo: DropdownMenuContent.__docgenInfo,
              name: "DropdownMenuContent",
              path: "src/components/ui/dropdown-menu.tsx#DropdownMenuContent",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (DropdownMenuGroup.displayName = "DropdownMenuGroup"),
          (DropdownMenuGroup.__docgenInfo = {
            description: "",
            displayName: "DropdownMenuGroup",
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
            (STORYBOOK_REACT_CLASSES["src/components/ui/dropdown-menu.tsx#DropdownMenuGroup"] = {
              docgenInfo: DropdownMenuGroup.__docgenInfo,
              name: "DropdownMenuGroup",
              path: "src/components/ui/dropdown-menu.tsx#DropdownMenuGroup",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (DropdownMenuLabel.displayName = "DropdownMenuLabel"),
          (DropdownMenuLabel.__docgenInfo = {
            description: "",
            displayName: "DropdownMenuLabel",
            props: {
              asChild: {
                defaultValue: null,
                description: "",
                name: "asChild",
                required: !1,
                type: { name: "boolean" },
              },
              inset: { defaultValue: null, description: "", name: "inset", required: !1, type: { name: "boolean" } },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/dropdown-menu.tsx#DropdownMenuLabel"] = {
              docgenInfo: DropdownMenuLabel.__docgenInfo,
              name: "DropdownMenuLabel",
              path: "src/components/ui/dropdown-menu.tsx#DropdownMenuLabel",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (DropdownMenuItem.displayName = "DropdownMenuItem"),
          (DropdownMenuItem.__docgenInfo = {
            description: "",
            displayName: "DropdownMenuItem",
            props: {
              asChild: {
                defaultValue: null,
                description: "",
                name: "asChild",
                required: !1,
                type: { name: "boolean" },
              },
              inset: { defaultValue: null, description: "", name: "inset", required: !1, type: { name: "boolean" } },
              variant: {
                defaultValue: { value: "default" },
                description: "",
                name: "variant",
                required: !1,
                type: { name: "enum", value: [{ value: '"default"' }, { value: '"destructive"' }] },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/dropdown-menu.tsx#DropdownMenuItem"] = {
              docgenInfo: DropdownMenuItem.__docgenInfo,
              name: "DropdownMenuItem",
              path: "src/components/ui/dropdown-menu.tsx#DropdownMenuItem",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem"),
          (DropdownMenuCheckboxItem.__docgenInfo = {
            description: "",
            displayName: "DropdownMenuCheckboxItem",
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
            (STORYBOOK_REACT_CLASSES["src/components/ui/dropdown-menu.tsx#DropdownMenuCheckboxItem"] = {
              docgenInfo: DropdownMenuCheckboxItem.__docgenInfo,
              name: "DropdownMenuCheckboxItem",
              path: "src/components/ui/dropdown-menu.tsx#DropdownMenuCheckboxItem",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup"),
          (DropdownMenuRadioGroup.__docgenInfo = {
            description: "",
            displayName: "DropdownMenuRadioGroup",
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
            (STORYBOOK_REACT_CLASSES["src/components/ui/dropdown-menu.tsx#DropdownMenuRadioGroup"] = {
              docgenInfo: DropdownMenuRadioGroup.__docgenInfo,
              name: "DropdownMenuRadioGroup",
              path: "src/components/ui/dropdown-menu.tsx#DropdownMenuRadioGroup",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem"),
          (DropdownMenuRadioItem.__docgenInfo = {
            description: "",
            displayName: "DropdownMenuRadioItem",
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
            (STORYBOOK_REACT_CLASSES["src/components/ui/dropdown-menu.tsx#DropdownMenuRadioItem"] = {
              docgenInfo: DropdownMenuRadioItem.__docgenInfo,
              name: "DropdownMenuRadioItem",
              path: "src/components/ui/dropdown-menu.tsx#DropdownMenuRadioItem",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (DropdownMenuSeparator.displayName = "DropdownMenuSeparator"),
          (DropdownMenuSeparator.__docgenInfo = {
            description: "",
            displayName: "DropdownMenuSeparator",
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
            (STORYBOOK_REACT_CLASSES["src/components/ui/dropdown-menu.tsx#DropdownMenuSeparator"] = {
              docgenInfo: DropdownMenuSeparator.__docgenInfo,
              name: "DropdownMenuSeparator",
              path: "src/components/ui/dropdown-menu.tsx#DropdownMenuSeparator",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (DropdownMenuShortcut.displayName = "DropdownMenuShortcut"),
          (DropdownMenuShortcut.__docgenInfo = { description: "", displayName: "DropdownMenuShortcut", props: {} }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/dropdown-menu.tsx#DropdownMenuShortcut"] = {
              docgenInfo: DropdownMenuShortcut.__docgenInfo,
              name: "DropdownMenuShortcut",
              path: "src/components/ui/dropdown-menu.tsx#DropdownMenuShortcut",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (DropdownMenuSub.displayName = "DropdownMenuSub"),
          (DropdownMenuSub.__docgenInfo = { description: "", displayName: "DropdownMenuSub", props: {} }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/dropdown-menu.tsx#DropdownMenuSub"] = {
              docgenInfo: DropdownMenuSub.__docgenInfo,
              name: "DropdownMenuSub",
              path: "src/components/ui/dropdown-menu.tsx#DropdownMenuSub",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger"),
          (DropdownMenuSubTrigger.__docgenInfo = {
            description: "",
            displayName: "DropdownMenuSubTrigger",
            props: {
              asChild: {
                defaultValue: null,
                description: "",
                name: "asChild",
                required: !1,
                type: { name: "boolean" },
              },
              inset: { defaultValue: null, description: "", name: "inset", required: !1, type: { name: "boolean" } },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/components/ui/dropdown-menu.tsx#DropdownMenuSubTrigger"] = {
              docgenInfo: DropdownMenuSubTrigger.__docgenInfo,
              name: "DropdownMenuSubTrigger",
              path: "src/components/ui/dropdown-menu.tsx#DropdownMenuSubTrigger",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        (DropdownMenuSubContent.displayName = "DropdownMenuSubContent"),
          (DropdownMenuSubContent.__docgenInfo = {
            description: "",
            displayName: "DropdownMenuSubContent",
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
            (STORYBOOK_REACT_CLASSES["src/components/ui/dropdown-menu.tsx#DropdownMenuSubContent"] = {
              docgenInfo: DropdownMenuSubContent.__docgenInfo,
              name: "DropdownMenuSubContent",
              path: "src/components/ui/dropdown-menu.tsx#DropdownMenuSubContent",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      const Breadcrumb_stories = {
          title: "Molecules/Breadcrumb",
          component: () =>
            (0, jsx_runtime.jsx)(Breadcrumb, {
              children: (0, jsx_runtime.jsxs)(BreadcrumbList, {
                children: [
                  (0, jsx_runtime.jsx)(BreadcrumbItem, {
                    children: (0, jsx_runtime.jsx)(BreadcrumbLink, { href: "/", children: "Home" }),
                  }),
                  (0, jsx_runtime.jsx)(BreadcrumbSeparator, {}),
                  (0, jsx_runtime.jsx)(BreadcrumbItem, {
                    children: (0, jsx_runtime.jsxs)(DropdownMenu, {
                      children: [
                        (0, jsx_runtime.jsxs)(DropdownMenuTrigger, {
                          className: "flex items-center gap-1",
                          children: [
                            (0, jsx_runtime.jsx)(BreadcrumbEllipsis, { className: "h-4 w-4" }),
                            (0, jsx_runtime.jsx)("span", { className: "sr-only", children: "Toggle menu" }),
                          ],
                        }),
                        (0, jsx_runtime.jsxs)(DropdownMenuContent, {
                          align: "start",
                          children: [
                            (0, jsx_runtime.jsx)(DropdownMenuItem, { children: "Documentation" }),
                            (0, jsx_runtime.jsx)(DropdownMenuItem, { children: "Themes" }),
                            (0, jsx_runtime.jsx)(DropdownMenuItem, { children: "GitHub" }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, jsx_runtime.jsx)(BreadcrumbSeparator, {}),
                  (0, jsx_runtime.jsx)(BreadcrumbItem, {
                    children: (0, jsx_runtime.jsx)(BreadcrumbLink, {
                      href: "/docs/components",
                      children: "Components",
                    }),
                  }),
                  (0, jsx_runtime.jsx)(BreadcrumbSeparator, {}),
                  (0, jsx_runtime.jsx)(BreadcrumbItem, {
                    children: (0, jsx_runtime.jsx)(BreadcrumbPage, { children: "Breadcrumb" }),
                  }),
                ],
              }),
            }),
          parameters: { layout: "fullscreen" },
          tags: ["autodocs"],
          argTypes: {},
        },
        Default = { args: {} },
        __namedExportsOrder = ["Default"];
      Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: { originalSource: "{\n  args: {}\n}", ...Default.parameters?.docs?.source },
        },
      };
    },
    "./src/lib/utils.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.d(__webpack_exports__, { cn: () => cn });
      var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs",
        ),
        tailwind_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/.pnpm/tailwind-merge@3.2.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs",
        );
      function cn(...inputs) {
        return (0, tailwind_merge__WEBPACK_IMPORTED_MODULE_0__.QP)((0, clsx__WEBPACK_IMPORTED_MODULE_1__.$)(inputs));
      }
    },
  },
]);
