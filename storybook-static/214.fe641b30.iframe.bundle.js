/*! For license information please see 214.fe641b30.iframe.bundle.js.LICENSE.txt */
"use strict";
(self.webpackChunktsa_app = self.webpackChunktsa_app || []).push([
  [214],
  {
    "./node_modules/.pnpm/@radix-ui+react-dialog@1.1._df29d8d4fc2df69613ee7565646f766c/node_modules/@radix-ui/react-dialog/dist/index.mjs":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.d(__webpack_exports__, {
          UC: () => Content,
          VY: () => Description,
          ZL: () => Portal,
          bL: () => Root,
          bm: () => Close,
          hE: () => Title,
          hJ: () => Overlay,
          l9: () => Trigger,
        });
        var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react/index.js",
          ),
          _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+primitive@1.1.2/node_modules/@radix-ui/primitive/dist/index.mjs",
          ),
          _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-compose-ref_09e46bdbfd85bd0bcf577db4590260b2/node_modules/@radix-ui/react-compose-refs/dist/index.mjs",
          ),
          _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-context@1.1_004a21dc100354e481e7301f1d8fdece/node_modules/@radix-ui/react-context/dist/index.mjs",
          ),
          _radix_ui_react_id__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-id@1.1.1_@types+react@19.1.2_react@19.1.0/node_modules/@radix-ui/react-id/dist/index.mjs",
          ),
          _radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-use-control_c9ce440065516d1e73f54b444c452442/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs",
          ),
          _radix_ui_react_dismissable_layer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-dismissable_1a5c0df20643f8e9832f787b3d4e52d7/node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs",
          ),
          _radix_ui_react_focus_scope__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-focus-scope_f9f2e279a3d105fd4de3223953719ee7/node_modules/@radix-ui/react-focus-scope/dist/index.mjs",
          ),
          _radix_ui_react_portal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-portal@1.1._2295a3d0ef089e0f4a9c06622332597d/node_modules/@radix-ui/react-portal/dist/index.mjs",
          ),
          _radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-presence@1._01531d7e373404f85f01b998531f26ee/node_modules/@radix-ui/react-presence/dist/index.mjs",
          ),
          _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-primitive@2_56c95403134da8494df5342ba255a4c7/node_modules/@radix-ui/react-primitive/dist/index.mjs",
          ),
          _radix_ui_react_focus_guards__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-focus-guard_8400462cd18c9e6ccd96cc5ea74f4fd8/node_modules/@radix-ui/react-focus-guards/dist/index.mjs",
          ),
          react_remove_scroll__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
            "./node_modules/.pnpm/react-remove-scroll@2.6.3_@types+react@19.1.2_react@19.1.0/node_modules/react-remove-scroll/dist/es2015/Combination.js",
          ),
          aria_hidden__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
            "./node_modules/.pnpm/aria-hidden@1.2.4/node_modules/aria-hidden/dist/es2015/index.js",
          ),
          _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-slot@1.2.0_@types+react@19.1.2_react@19.1.0/node_modules/@radix-ui/react-slot/dist/index.mjs",
          ),
          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
            "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react/jsx-runtime.js",
          ),
          console = __webpack_require__(
            "./node_modules/.pnpm/console-browserify@1.2.0/node_modules/console-browserify/index.js",
          ),
          [createDialogContext, createDialogScope] = (0, _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__.A)(
            "Dialog",
          ),
          [DialogProvider, useDialogContext] = createDialogContext("Dialog"),
          Dialog = (props) => {
            const { __scopeDialog, children, open: openProp, defaultOpen, onOpenChange, modal = !0 } = props,
              triggerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),
              contentRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),
              [open, setOpen] = (0, _radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_3__.i)({
                prop: openProp,
                defaultProp: defaultOpen ?? !1,
                onChange: onOpenChange,
                caller: "Dialog",
              });
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DialogProvider, {
              scope: __scopeDialog,
              triggerRef,
              contentRef,
              contentId: (0, _radix_ui_react_id__WEBPACK_IMPORTED_MODULE_4__.B)(),
              titleId: (0, _radix_ui_react_id__WEBPACK_IMPORTED_MODULE_4__.B)(),
              descriptionId: (0, _radix_ui_react_id__WEBPACK_IMPORTED_MODULE_4__.B)(),
              open,
              onOpenChange: setOpen,
              onOpenToggle: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
                () => setOpen((prevOpen) => !prevOpen),
                [setOpen],
              ),
              modal,
              children,
            });
          };
        Dialog.displayName = "Dialog";
        var DialogTrigger = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
          const { __scopeDialog, ...triggerProps } = props,
            context = useDialogContext("DialogTrigger", __scopeDialog),
            composedTriggerRef = (0, _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_5__.s)(
              forwardedRef,
              context.triggerRef,
            );
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
            _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_6__.sG.button,
            {
              type: "button",
              "aria-haspopup": "dialog",
              "aria-expanded": context.open,
              "aria-controls": context.contentId,
              "data-state": getState(context.open),
              ...triggerProps,
              ref: composedTriggerRef,
              onClick: (0, _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__.m)(props.onClick, context.onOpenToggle),
            },
          );
        });
        DialogTrigger.displayName = "DialogTrigger";
        var [PortalProvider, usePortalContext] = createDialogContext("DialogPortal", { forceMount: void 0 }),
          DialogPortal = (props) => {
            const { __scopeDialog, forceMount, children, container } = props,
              context = useDialogContext("DialogPortal", __scopeDialog);
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(PortalProvider, {
              scope: __scopeDialog,
              forceMount,
              children: react__WEBPACK_IMPORTED_MODULE_0__.Children.map(children, (child) =>
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
                  _radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_8__.C,
                  {
                    present: forceMount || context.open,
                    children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
                      _radix_ui_react_portal__WEBPACK_IMPORTED_MODULE_9__.Z,
                      { asChild: !0, container, children: child },
                    ),
                  },
                ),
              ),
            });
          };
        DialogPortal.displayName = "DialogPortal";
        var DialogOverlay = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
          const portalContext = usePortalContext("DialogOverlay", props.__scopeDialog),
            { forceMount = portalContext.forceMount, ...overlayProps } = props,
            context = useDialogContext("DialogOverlay", props.__scopeDialog);
          return context.modal
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
                _radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_8__.C,
                {
                  present: forceMount || context.open,
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DialogOverlayImpl, {
                    ...overlayProps,
                    ref: forwardedRef,
                  }),
                },
              )
            : null;
        });
        DialogOverlay.displayName = "DialogOverlay";
        var Slot = (0, _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_10__.TL)("DialogOverlay.RemoveScroll"),
          DialogOverlayImpl = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
            const { __scopeDialog, ...overlayProps } = props,
              context = useDialogContext("DialogOverlay", __scopeDialog);
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
              react_remove_scroll__WEBPACK_IMPORTED_MODULE_11__.A,
              {
                as: Slot,
                allowPinchZoom: !0,
                shards: [context.contentRef],
                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
                  _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_6__.sG.div,
                  {
                    "data-state": getState(context.open),
                    ...overlayProps,
                    ref: forwardedRef,
                    style: { pointerEvents: "auto", ...overlayProps.style },
                  },
                ),
              },
            );
          }),
          DialogContent = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
            const portalContext = usePortalContext("DialogContent", props.__scopeDialog),
              { forceMount = portalContext.forceMount, ...contentProps } = props,
              context = useDialogContext("DialogContent", props.__scopeDialog);
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
              _radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_8__.C,
              {
                present: forceMount || context.open,
                children: context.modal
                  ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DialogContentModal, {
                      ...contentProps,
                      ref: forwardedRef,
                    })
                  : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DialogContentNonModal, {
                      ...contentProps,
                      ref: forwardedRef,
                    }),
              },
            );
          });
        DialogContent.displayName = "DialogContent";
        var DialogContentModal = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
            const context = useDialogContext("DialogContent", props.__scopeDialog),
              contentRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),
              composedRefs = (0, _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_5__.s)(
                forwardedRef,
                context.contentRef,
                contentRef,
              );
            return (
              react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
                const content = contentRef.current;
                if (content) return (0, aria_hidden__WEBPACK_IMPORTED_MODULE_12__.Eq)(content);
              }, []),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DialogContentImpl, {
                ...props,
                ref: composedRefs,
                trapFocus: context.open,
                disableOutsidePointerEvents: !0,
                onCloseAutoFocus: (0, _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__.m)(
                  props.onCloseAutoFocus,
                  (event) => {
                    event.preventDefault(), context.triggerRef.current?.focus();
                  },
                ),
                onPointerDownOutside: (0, _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__.m)(
                  props.onPointerDownOutside,
                  (event) => {
                    const originalEvent = event.detail.originalEvent,
                      ctrlLeftClick = 0 === originalEvent.button && !0 === originalEvent.ctrlKey;
                    (2 === originalEvent.button || ctrlLeftClick) && event.preventDefault();
                  },
                ),
                onFocusOutside: (0, _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__.m)(props.onFocusOutside, (event) =>
                  event.preventDefault(),
                ),
              })
            );
          }),
          DialogContentNonModal = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
            const context = useDialogContext("DialogContent", props.__scopeDialog),
              hasInteractedOutsideRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(!1),
              hasPointerDownOutsideRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(!1);
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DialogContentImpl, {
              ...props,
              ref: forwardedRef,
              trapFocus: !1,
              disableOutsidePointerEvents: !1,
              onCloseAutoFocus: (event) => {
                props.onCloseAutoFocus?.(event),
                  event.defaultPrevented ||
                    (hasInteractedOutsideRef.current || context.triggerRef.current?.focus(), event.preventDefault()),
                  (hasInteractedOutsideRef.current = !1),
                  (hasPointerDownOutsideRef.current = !1);
              },
              onInteractOutside: (event) => {
                props.onInteractOutside?.(event),
                  event.defaultPrevented ||
                    ((hasInteractedOutsideRef.current = !0),
                    "pointerdown" === event.detail.originalEvent.type && (hasPointerDownOutsideRef.current = !0));
                const target = event.target,
                  targetIsTrigger = context.triggerRef.current?.contains(target);
                targetIsTrigger && event.preventDefault(),
                  "focusin" === event.detail.originalEvent.type &&
                    hasPointerDownOutsideRef.current &&
                    event.preventDefault();
              },
            });
          }),
          DialogContentImpl = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
            const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props,
              context = useDialogContext("DialogContent", __scopeDialog),
              contentRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),
              composedRefs = (0, _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_5__.s)(forwardedRef, contentRef);
            return (
              (0, _radix_ui_react_focus_guards__WEBPACK_IMPORTED_MODULE_13__.Oh)(),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(
                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,
                {
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
                      _radix_ui_react_focus_scope__WEBPACK_IMPORTED_MODULE_14__.n,
                      {
                        asChild: !0,
                        loop: !0,
                        trapped: trapFocus,
                        onMountAutoFocus: onOpenAutoFocus,
                        onUnmountAutoFocus: onCloseAutoFocus,
                        children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
                          _radix_ui_react_dismissable_layer__WEBPACK_IMPORTED_MODULE_15__.qW,
                          {
                            role: "dialog",
                            id: context.contentId,
                            "aria-describedby": context.descriptionId,
                            "aria-labelledby": context.titleId,
                            "data-state": getState(context.open),
                            ...contentProps,
                            ref: composedRefs,
                            onDismiss: () => context.onOpenChange(!1),
                          },
                        ),
                      },
                    ),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(
                      react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,
                      {
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TitleWarning, {
                            titleId: context.titleId,
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DescriptionWarning, {
                            contentRef,
                            descriptionId: context.descriptionId,
                          }),
                        ],
                      },
                    ),
                  ],
                },
              )
            );
          }),
          DialogTitle = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
            const { __scopeDialog, ...titleProps } = props,
              context = useDialogContext("DialogTitle", __scopeDialog);
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
              _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_6__.sG.h2,
              { id: context.titleId, ...titleProps, ref: forwardedRef },
            );
          });
        DialogTitle.displayName = "DialogTitle";
        var DialogDescription = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
          const { __scopeDialog, ...descriptionProps } = props,
            context = useDialogContext("DialogDescription", __scopeDialog);
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
            _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_6__.sG.p,
            { id: context.descriptionId, ...descriptionProps, ref: forwardedRef },
          );
        });
        DialogDescription.displayName = "DialogDescription";
        var DialogClose = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
          const { __scopeDialog, ...closeProps } = props,
            context = useDialogContext("DialogClose", __scopeDialog);
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
            _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_6__.sG.button,
            {
              type: "button",
              ...closeProps,
              ref: forwardedRef,
              onClick: (0, _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_7__.m)(props.onClick, () =>
                context.onOpenChange(!1),
              ),
            },
          );
        });
        function getState(open) {
          return open ? "open" : "closed";
        }
        DialogClose.displayName = "DialogClose";
        var [WarningProvider, useWarningContext] = (0, _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__.q)(
            "DialogTitleWarning",
            { contentName: "DialogContent", titleName: "DialogTitle", docsSlug: "dialog" },
          ),
          TitleWarning = ({ titleId }) => {
            const titleWarningContext = useWarningContext("DialogTitleWarning"),
              MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.\n\nIf you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.\n\nFor more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
            return (
              react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
                if (titleId) {
                  document.getElementById(titleId) || console.error(MESSAGE);
                }
              }, [MESSAGE, titleId]),
              null
            );
          },
          DescriptionWarning = ({ contentRef, descriptionId }) => {
            const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${useWarningContext("DialogDescriptionWarning").contentName}}.`;
            return (
              react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
                const describedById = contentRef.current?.getAttribute("aria-describedby");
                if (descriptionId && describedById) {
                  document.getElementById(descriptionId) || console.warn(MESSAGE);
                }
              }, [MESSAGE, contentRef, descriptionId]),
              null
            );
          },
          Root = Dialog,
          Trigger = DialogTrigger,
          Portal = DialogPortal,
          Overlay = DialogOverlay,
          Content = DialogContent,
          Title = DialogTitle,
          Description = DialogDescription,
          Close = DialogClose;
      },
    "./node_modules/.pnpm/@radix-ui+react-navigation-_0bcb5d647c45d8721f128ec0fbc65c31/node_modules/@radix-ui/react-navigation-menu/dist/index.mjs":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.d(__webpack_exports__, {
          B8: () => List,
          LM: () => Viewport,
          N_: () => Link,
          UC: () => Content,
          bL: () => Root2,
          l9: () => Trigger,
          q7: () => Item,
        });
        var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react/index.js",
          ),
          react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
            "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react-dom/index.js",
          ),
          _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-context@1.1_004a21dc100354e481e7301f1d8fdece/node_modules/@radix-ui/react-context/dist/index.mjs",
          ),
          _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+primitive@1.1.2/node_modules/@radix-ui/primitive/dist/index.mjs",
          ),
          _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-primitive@2_56c95403134da8494df5342ba255a4c7/node_modules/@radix-ui/react-primitive/dist/index.mjs",
          ),
          _radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-use-control_c9ce440065516d1e73f54b444c452442/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs",
          ),
          _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-compose-ref_09e46bdbfd85bd0bcf577db4590260b2/node_modules/@radix-ui/react-compose-refs/dist/index.mjs",
          ),
          _radix_ui_react_direction__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-direction@1_d9788233d4550f36bec220ab67edca5d/node_modules/@radix-ui/react-direction/dist/index.mjs",
          ),
          _radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-presence@1._01531d7e373404f85f01b998531f26ee/node_modules/@radix-ui/react-presence/dist/index.mjs",
          ),
          _radix_ui_react_id__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-id@1.1.1_@types+react@19.1.2_react@19.1.0/node_modules/@radix-ui/react-id/dist/index.mjs",
          ),
          _radix_ui_react_collection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-collection@_fecdb72573095e7939ea51c1893c7e3a/node_modules/@radix-ui/react-collection/dist/index.mjs",
          ),
          _radix_ui_react_dismissable_layer__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-dismissable_1a5c0df20643f8e9832f787b3d4e52d7/node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs",
          ),
          _radix_ui_react_use_previous__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-use-previou_d6273884695acacf2afd2bd3cfd21173/node_modules/@radix-ui/react-use-previous/dist/index.mjs",
          ),
          _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-use-layout-_5f69c47ab12fad839cfb8723a33e5e36/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs",
          ),
          _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-use-callbac_5357c350f25489f343e1b278223a85d5/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs",
          ),
          _radix_ui_react_visually_hidden__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-visually-hi_52b9324108156fe3cfbcb349477180d1/node_modules/@radix-ui/react-visually-hidden/dist/index.mjs",
          ),
          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
            "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react/jsx-runtime.js",
          ),
          [Collection, useCollection, createCollectionScope] = (0,
          _radix_ui_react_collection__WEBPACK_IMPORTED_MODULE_3__.N)("NavigationMenu"),
          [FocusGroupCollection, useFocusGroupCollection, createFocusGroupCollectionScope] = (0,
          _radix_ui_react_collection__WEBPACK_IMPORTED_MODULE_3__.N)("NavigationMenu"),
          [createNavigationMenuContext, createNavigationMenuScope] = (0,
          _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_4__.A)("NavigationMenu", [
            createCollectionScope,
            createFocusGroupCollectionScope,
          ]),
          [NavigationMenuProviderImpl, useNavigationMenuContext] = createNavigationMenuContext("NavigationMenu"),
          [ViewportContentProvider, useViewportContentContext] = createNavigationMenuContext("NavigationMenu"),
          NavigationMenu = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
            const {
                __scopeNavigationMenu,
                value: valueProp,
                onValueChange,
                defaultValue,
                delayDuration = 200,
                skipDelayDuration = 300,
                orientation = "horizontal",
                dir,
                ...NavigationMenuProps
              } = props,
              [navigationMenu, setNavigationMenu] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
              composedRef = (0, _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_5__.s)(forwardedRef, (node) =>
                setNavigationMenu(node),
              ),
              direction = (0, _radix_ui_react_direction__WEBPACK_IMPORTED_MODULE_6__.jH)(dir),
              openTimerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(0),
              closeTimerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(0),
              skipDelayTimerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(0),
              [isOpenDelayed, setIsOpenDelayed] = react__WEBPACK_IMPORTED_MODULE_0__.useState(!0),
              [value, setValue] = (0, _radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_7__.i)({
                prop: valueProp,
                onChange: (value2) => {
                  const hasSkipDelayDuration = skipDelayDuration > 0;
                  "" !== value2
                    ? (window.clearTimeout(skipDelayTimerRef.current), hasSkipDelayDuration && setIsOpenDelayed(!1))
                    : (window.clearTimeout(skipDelayTimerRef.current),
                      (skipDelayTimerRef.current = window.setTimeout(() => setIsOpenDelayed(!0), skipDelayDuration))),
                    onValueChange?.(value2);
                },
                defaultProp: defaultValue ?? "",
                caller: "NavigationMenu",
              }),
              startCloseTimer = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
                window.clearTimeout(closeTimerRef.current),
                  (closeTimerRef.current = window.setTimeout(() => setValue(""), 150));
              }, [setValue]),
              handleOpen = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
                (itemValue) => {
                  window.clearTimeout(closeTimerRef.current), setValue(itemValue);
                },
                [setValue],
              ),
              handleDelayedOpen = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
                (itemValue) => {
                  value === itemValue
                    ? window.clearTimeout(closeTimerRef.current)
                    : (openTimerRef.current = window.setTimeout(() => {
                        window.clearTimeout(closeTimerRef.current), setValue(itemValue);
                      }, delayDuration));
                },
                [value, setValue, delayDuration],
              );
            return (
              react__WEBPACK_IMPORTED_MODULE_0__.useEffect(
                () => () => {
                  window.clearTimeout(openTimerRef.current),
                    window.clearTimeout(closeTimerRef.current),
                    window.clearTimeout(skipDelayTimerRef.current);
                },
                [],
              ),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(NavigationMenuProvider, {
                scope: __scopeNavigationMenu,
                isRootMenu: !0,
                value,
                dir: direction,
                orientation,
                rootNavigationMenu: navigationMenu,
                onTriggerEnter: (itemValue) => {
                  window.clearTimeout(openTimerRef.current),
                    isOpenDelayed ? handleDelayedOpen(itemValue) : handleOpen(itemValue);
                },
                onTriggerLeave: () => {
                  window.clearTimeout(openTimerRef.current), startCloseTimer();
                },
                onContentEnter: () => window.clearTimeout(closeTimerRef.current),
                onContentLeave: startCloseTimer,
                onItemSelect: (itemValue) => {
                  setValue((prevValue) => (prevValue === itemValue ? "" : itemValue));
                },
                onItemDismiss: () => setValue(""),
                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
                  _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_8__.sG.nav,
                  {
                    "aria-label": "Main",
                    "data-orientation": orientation,
                    dir: direction,
                    ...NavigationMenuProps,
                    ref: composedRef,
                  },
                ),
              })
            );
          });
        NavigationMenu.displayName = "NavigationMenu";
        var SUB_NAME = "NavigationMenuSub",
          NavigationMenuSub = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
            const {
                __scopeNavigationMenu,
                value: valueProp,
                onValueChange,
                defaultValue,
                orientation = "horizontal",
                ...subProps
              } = props,
              context = useNavigationMenuContext(SUB_NAME, __scopeNavigationMenu),
              [value, setValue] = (0, _radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_7__.i)({
                prop: valueProp,
                onChange: onValueChange,
                defaultProp: defaultValue ?? "",
                caller: SUB_NAME,
              });
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(NavigationMenuProvider, {
              scope: __scopeNavigationMenu,
              isRootMenu: !1,
              value,
              dir: context.dir,
              orientation,
              rootNavigationMenu: context.rootNavigationMenu,
              onTriggerEnter: (itemValue) => setValue(itemValue),
              onItemSelect: (itemValue) => setValue(itemValue),
              onItemDismiss: () => setValue(""),
              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
                _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_8__.sG.div,
                { "data-orientation": orientation, ...subProps, ref: forwardedRef },
              ),
            });
          });
        NavigationMenuSub.displayName = SUB_NAME;
        var NavigationMenuProvider = (props) => {
            const {
                scope,
                isRootMenu,
                rootNavigationMenu,
                dir,
                orientation,
                children,
                value,
                onItemSelect,
                onItemDismiss,
                onTriggerEnter,
                onTriggerLeave,
                onContentEnter,
                onContentLeave,
              } = props,
              [viewport, setViewport] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
              [viewportContent, setViewportContent] = react__WEBPACK_IMPORTED_MODULE_0__.useState(new Map()),
              [indicatorTrack, setIndicatorTrack] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(NavigationMenuProviderImpl, {
              scope,
              isRootMenu,
              rootNavigationMenu,
              value,
              previousValue: (0, _radix_ui_react_use_previous__WEBPACK_IMPORTED_MODULE_9__.Z)(value),
              baseId: (0, _radix_ui_react_id__WEBPACK_IMPORTED_MODULE_10__.B)(),
              dir,
              orientation,
              viewport,
              onViewportChange: setViewport,
              indicatorTrack,
              onIndicatorTrackChange: setIndicatorTrack,
              onTriggerEnter: (0, _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_11__.c)(onTriggerEnter),
              onTriggerLeave: (0, _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_11__.c)(onTriggerLeave),
              onContentEnter: (0, _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_11__.c)(onContentEnter),
              onContentLeave: (0, _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_11__.c)(onContentLeave),
              onItemSelect: (0, _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_11__.c)(onItemSelect),
              onItemDismiss: (0, _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_11__.c)(onItemDismiss),
              onViewportContentChange: react__WEBPACK_IMPORTED_MODULE_0__.useCallback((contentValue, contentData) => {
                setViewportContent((prevContent) => (prevContent.set(contentValue, contentData), new Map(prevContent)));
              }, []),
              onViewportContentRemove: react__WEBPACK_IMPORTED_MODULE_0__.useCallback((contentValue) => {
                setViewportContent((prevContent) =>
                  prevContent.has(contentValue)
                    ? (prevContent.delete(contentValue), new Map(prevContent))
                    : prevContent,
                );
              }, []),
              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Collection.Provider, {
                scope,
                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(ViewportContentProvider, {
                  scope,
                  items: viewportContent,
                  children,
                }),
              }),
            });
          },
          NavigationMenuList = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
            const { __scopeNavigationMenu, ...listProps } = props,
              context = useNavigationMenuContext("NavigationMenuList", __scopeNavigationMenu),
              list = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
                _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_8__.sG.ul,
                { "data-orientation": context.orientation, ...listProps, ref: forwardedRef },
              );
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
              _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_8__.sG.div,
              {
                style: { position: "relative" },
                ref: context.onIndicatorTrackChange,
                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Collection.Slot, {
                  scope: __scopeNavigationMenu,
                  children: context.isRootMenu
                    ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(FocusGroup, {
                        asChild: !0,
                        children: list,
                      })
                    : list,
                }),
              },
            );
          });
        NavigationMenuList.displayName = "NavigationMenuList";
        var [NavigationMenuItemContextProvider, useNavigationMenuItemContext] =
            createNavigationMenuContext("NavigationMenuItem"),
          NavigationMenuItem = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
            const { __scopeNavigationMenu, value: valueProp, ...itemProps } = props,
              autoValue = (0, _radix_ui_react_id__WEBPACK_IMPORTED_MODULE_10__.B)(),
              value = valueProp || autoValue || "LEGACY_REACT_AUTO_VALUE",
              contentRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),
              triggerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),
              focusProxyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),
              restoreContentTabOrderRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(() => {}),
              wasEscapeCloseRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(!1),
              handleContentEntry = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((side = "start") => {
                if (contentRef.current) {
                  restoreContentTabOrderRef.current();
                  const candidates = getTabbableCandidates(contentRef.current);
                  candidates.length && focusFirst("start" === side ? candidates : candidates.reverse());
                }
              }, []),
              handleContentExit = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
                if (contentRef.current) {
                  const candidates = getTabbableCandidates(contentRef.current);
                  candidates.length &&
                    (restoreContentTabOrderRef.current = (function removeFromTabOrder(candidates) {
                      return (
                        candidates.forEach((candidate) => {
                          (candidate.dataset.tabindex = candidate.getAttribute("tabindex") || ""),
                            candidate.setAttribute("tabindex", "-1");
                        }),
                        () => {
                          candidates.forEach((candidate) => {
                            const prevTabIndex = candidate.dataset.tabindex;
                            candidate.setAttribute("tabindex", prevTabIndex);
                          });
                        }
                      );
                    })(candidates));
                }
              }, []);
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(NavigationMenuItemContextProvider, {
              scope: __scopeNavigationMenu,
              value,
              triggerRef,
              contentRef,
              focusProxyRef,
              wasEscapeCloseRef,
              onEntryKeyDown: handleContentEntry,
              onFocusProxyEnter: handleContentEntry,
              onRootContentClose: handleContentExit,
              onContentFocusOutside: handleContentExit,
              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
                _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_8__.sG.li,
                { ...itemProps, ref: forwardedRef },
              ),
            });
          });
        NavigationMenuItem.displayName = "NavigationMenuItem";
        var NavigationMenuTrigger = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
          const { __scopeNavigationMenu, disabled, ...triggerProps } = props,
            context = useNavigationMenuContext("NavigationMenuTrigger", props.__scopeNavigationMenu),
            itemContext = useNavigationMenuItemContext("NavigationMenuTrigger", props.__scopeNavigationMenu),
            ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),
            composedRefs = (0, _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_5__.s)(
              ref,
              itemContext.triggerRef,
              forwardedRef,
            ),
            triggerId = makeTriggerId(context.baseId, itemContext.value),
            contentId = makeContentId(context.baseId, itemContext.value),
            hasPointerMoveOpenedRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(!1),
            wasClickCloseRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(!1),
            open = itemContext.value === context.value;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment,
            {
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Collection.ItemSlot, {
                  scope: __scopeNavigationMenu,
                  value: itemContext.value,
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(FocusGroupItem, {
                    asChild: !0,
                    children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
                      _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_8__.sG.button,
                      {
                        id: triggerId,
                        disabled,
                        "data-disabled": disabled ? "" : void 0,
                        "data-state": getOpenState(open),
                        "aria-expanded": open,
                        "aria-controls": contentId,
                        ...triggerProps,
                        ref: composedRefs,
                        onPointerEnter: (0, _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.m)(
                          props.onPointerEnter,
                          () => {
                            (wasClickCloseRef.current = !1), (itemContext.wasEscapeCloseRef.current = !1);
                          },
                        ),
                        onPointerMove: (0, _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.m)(
                          props.onPointerMove,
                          whenMouse(() => {
                            disabled ||
                              wasClickCloseRef.current ||
                              itemContext.wasEscapeCloseRef.current ||
                              hasPointerMoveOpenedRef.current ||
                              (context.onTriggerEnter(itemContext.value), (hasPointerMoveOpenedRef.current = !0));
                          }),
                        ),
                        onPointerLeave: (0, _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.m)(
                          props.onPointerLeave,
                          whenMouse(() => {
                            disabled || (context.onTriggerLeave(), (hasPointerMoveOpenedRef.current = !1));
                          }),
                        ),
                        onClick: (0, _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.m)(props.onClick, () => {
                          context.onItemSelect(itemContext.value), (wasClickCloseRef.current = open);
                        }),
                        onKeyDown: (0, _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.m)(
                          props.onKeyDown,
                          (event) => {
                            const entryKey = {
                              horizontal: "ArrowDown",
                              vertical: "rtl" === context.dir ? "ArrowLeft" : "ArrowRight",
                            }[context.orientation];
                            open && event.key === entryKey && (itemContext.onEntryKeyDown(), event.preventDefault());
                          },
                        ),
                      },
                    ),
                  }),
                }),
                open &&
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment,
                    {
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
                          _radix_ui_react_visually_hidden__WEBPACK_IMPORTED_MODULE_13__.bL,
                          {
                            "aria-hidden": !0,
                            tabIndex: 0,
                            ref: itemContext.focusProxyRef,
                            onFocus: (event) => {
                              const content = itemContext.contentRef.current,
                                prevFocusedElement = event.relatedTarget,
                                wasTriggerFocused = prevFocusedElement === ref.current,
                                wasFocusFromContent = content?.contains(prevFocusedElement);
                              (!wasTriggerFocused && wasFocusFromContent) ||
                                itemContext.onFocusProxyEnter(wasTriggerFocused ? "start" : "end");
                            },
                          },
                        ),
                        context.viewport &&
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", { "aria-owns": contentId }),
                      ],
                    },
                  ),
              ],
            },
          );
        });
        NavigationMenuTrigger.displayName = "NavigationMenuTrigger";
        var NavigationMenuLink = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
          const { __scopeNavigationMenu, active, onSelect, ...linkProps } = props;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(FocusGroupItem, {
            asChild: !0,
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
              _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_8__.sG.a,
              {
                "data-active": active ? "" : void 0,
                "aria-current": active ? "page" : void 0,
                ...linkProps,
                ref: forwardedRef,
                onClick: (0, _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.m)(
                  props.onClick,
                  (event) => {
                    const target = event.target,
                      linkSelectEvent = new CustomEvent("navigationMenu.linkSelect", { bubbles: !0, cancelable: !0 });
                    if (
                      (target.addEventListener("navigationMenu.linkSelect", (event2) => onSelect?.(event2), {
                        once: !0,
                      }),
                      (0, _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_8__.hO)(target, linkSelectEvent),
                      !linkSelectEvent.defaultPrevented && !event.metaKey)
                    ) {
                      const rootContentDismissEvent = new CustomEvent(ROOT_CONTENT_DISMISS, {
                        bubbles: !0,
                        cancelable: !0,
                      });
                      (0, _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_8__.hO)(target, rootContentDismissEvent);
                    }
                  },
                  { checkForDefaultPrevented: !1 },
                ),
              },
            ),
          });
        });
        NavigationMenuLink.displayName = "NavigationMenuLink";
        var NavigationMenuIndicator = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
          const { forceMount, ...indicatorProps } = props,
            context = useNavigationMenuContext("NavigationMenuIndicator", props.__scopeNavigationMenu),
            isVisible = Boolean(context.value);
          return context.indicatorTrack
            ? react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal(
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
                  _radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_14__.C,
                  {
                    present: forceMount || isVisible,
                    children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(NavigationMenuIndicatorImpl, {
                      ...indicatorProps,
                      ref: forwardedRef,
                    }),
                  },
                ),
                context.indicatorTrack,
              )
            : null;
        });
        NavigationMenuIndicator.displayName = "NavigationMenuIndicator";
        var NavigationMenuIndicatorImpl = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
            const { __scopeNavigationMenu, ...indicatorProps } = props,
              context = useNavigationMenuContext("NavigationMenuIndicator", __scopeNavigationMenu),
              getItems = useCollection(__scopeNavigationMenu),
              [activeTrigger, setActiveTrigger] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
              [position, setPosition] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
              isHorizontal = "horizontal" === context.orientation,
              isVisible = Boolean(context.value);
            react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
              const items = getItems(),
                triggerNode = items.find((item) => item.value === context.value)?.ref.current;
              triggerNode && setActiveTrigger(triggerNode);
            }, [getItems, context.value]);
            const handlePositionChange = () => {
              activeTrigger &&
                setPosition({
                  size: isHorizontal ? activeTrigger.offsetWidth : activeTrigger.offsetHeight,
                  offset: isHorizontal ? activeTrigger.offsetLeft : activeTrigger.offsetTop,
                });
            };
            return (
              useResizeObserver(activeTrigger, handlePositionChange),
              useResizeObserver(context.indicatorTrack, handlePositionChange),
              position
                ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
                    _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_8__.sG.div,
                    {
                      "aria-hidden": !0,
                      "data-state": isVisible ? "visible" : "hidden",
                      "data-orientation": context.orientation,
                      ...indicatorProps,
                      ref: forwardedRef,
                      style: {
                        position: "absolute",
                        ...(isHorizontal
                          ? { left: 0, width: position.size + "px", transform: `translateX(${position.offset}px)` }
                          : { top: 0, height: position.size + "px", transform: `translateY(${position.offset}px)` }),
                        ...indicatorProps.style,
                      },
                    },
                  )
                : null
            );
          }),
          CONTENT_NAME = "NavigationMenuContent",
          NavigationMenuContent = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
            const { forceMount, ...contentProps } = props,
              context = useNavigationMenuContext(CONTENT_NAME, props.__scopeNavigationMenu),
              itemContext = useNavigationMenuItemContext(CONTENT_NAME, props.__scopeNavigationMenu),
              composedRefs = (0, _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_5__.s)(
                itemContext.contentRef,
                forwardedRef,
              ),
              open = itemContext.value === context.value,
              commonProps = {
                value: itemContext.value,
                triggerRef: itemContext.triggerRef,
                focusProxyRef: itemContext.focusProxyRef,
                wasEscapeCloseRef: itemContext.wasEscapeCloseRef,
                onContentFocusOutside: itemContext.onContentFocusOutside,
                onRootContentClose: itemContext.onRootContentClose,
                ...contentProps,
              };
            return context.viewport
              ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(ViewportContentMounter, {
                  forceMount,
                  ...commonProps,
                  ref: composedRefs,
                })
              : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
                  _radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_14__.C,
                  {
                    present: forceMount || open,
                    children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(NavigationMenuContentImpl, {
                      "data-state": getOpenState(open),
                      ...commonProps,
                      ref: composedRefs,
                      onPointerEnter: (0, _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.m)(
                        props.onPointerEnter,
                        context.onContentEnter,
                      ),
                      onPointerLeave: (0, _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.m)(
                        props.onPointerLeave,
                        whenMouse(context.onContentLeave),
                      ),
                      style: { pointerEvents: !open && context.isRootMenu ? "none" : void 0, ...commonProps.style },
                    }),
                  },
                );
          });
        NavigationMenuContent.displayName = CONTENT_NAME;
        var ViewportContentMounter = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
            const context = useNavigationMenuContext(CONTENT_NAME, props.__scopeNavigationMenu),
              { onViewportContentChange, onViewportContentRemove } = context;
            return (
              (0, _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_15__.N)(() => {
                onViewportContentChange(props.value, { ref: forwardedRef, ...props });
              }, [props, forwardedRef, onViewportContentChange]),
              (0, _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_15__.N)(
                () => () => onViewportContentRemove(props.value),
                [props.value, onViewportContentRemove],
              ),
              null
            );
          }),
          ROOT_CONTENT_DISMISS = "navigationMenu.rootContentDismiss",
          NavigationMenuContentImpl = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
            const {
                __scopeNavigationMenu,
                value,
                triggerRef,
                focusProxyRef,
                wasEscapeCloseRef,
                onRootContentClose,
                onContentFocusOutside,
                ...contentProps
              } = props,
              context = useNavigationMenuContext(CONTENT_NAME, __scopeNavigationMenu),
              ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),
              composedRefs = (0, _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_5__.s)(ref, forwardedRef),
              triggerId = makeTriggerId(context.baseId, value),
              contentId = makeContentId(context.baseId, value),
              getItems = useCollection(__scopeNavigationMenu),
              prevMotionAttributeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),
              { onItemDismiss } = context;
            react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
              const content = ref.current;
              if (context.isRootMenu && content) {
                const handleClose = () => {
                  onItemDismiss(),
                    onRootContentClose(),
                    content.contains(document.activeElement) && triggerRef.current?.focus();
                };
                return (
                  content.addEventListener(ROOT_CONTENT_DISMISS, handleClose),
                  () => content.removeEventListener(ROOT_CONTENT_DISMISS, handleClose)
                );
              }
            }, [context.isRootMenu, props.value, triggerRef, onItemDismiss, onRootContentClose]);
            const motionAttribute = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
              const values = getItems().map((item) => item.value);
              "rtl" === context.dir && values.reverse();
              const index = values.indexOf(context.value),
                prevIndex = values.indexOf(context.previousValue),
                isSelected = value === context.value,
                wasSelected = prevIndex === values.indexOf(value);
              if (!isSelected && !wasSelected) return prevMotionAttributeRef.current;
              const attribute = (() => {
                if (index !== prevIndex) {
                  if (isSelected && -1 !== prevIndex) return index > prevIndex ? "from-end" : "from-start";
                  if (wasSelected && -1 !== index) return index > prevIndex ? "to-start" : "to-end";
                }
                return null;
              })();
              return (prevMotionAttributeRef.current = attribute), attribute;
            }, [context.previousValue, context.value, context.dir, getItems, value]);
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(FocusGroup, {
              asChild: !0,
              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
                _radix_ui_react_dismissable_layer__WEBPACK_IMPORTED_MODULE_16__.qW,
                {
                  id: contentId,
                  "aria-labelledby": triggerId,
                  "data-motion": motionAttribute,
                  "data-orientation": context.orientation,
                  ...contentProps,
                  ref: composedRefs,
                  disableOutsidePointerEvents: !1,
                  onDismiss: () => {
                    const rootContentDismissEvent = new Event(ROOT_CONTENT_DISMISS, { bubbles: !0, cancelable: !0 });
                    ref.current?.dispatchEvent(rootContentDismissEvent);
                  },
                  onFocusOutside: (0, _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.m)(
                    props.onFocusOutside,
                    (event) => {
                      onContentFocusOutside();
                      const target = event.target;
                      context.rootNavigationMenu?.contains(target) && event.preventDefault();
                    },
                  ),
                  onPointerDownOutside: (0, _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.m)(
                    props.onPointerDownOutside,
                    (event) => {
                      const target = event.target,
                        isTrigger = getItems().some((item) => item.ref.current?.contains(target)),
                        isRootViewport = context.isRootMenu && context.viewport?.contains(target);
                      (isTrigger || isRootViewport || !context.isRootMenu) && event.preventDefault();
                    },
                  ),
                  onKeyDown: (0, _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.m)(props.onKeyDown, (event) => {
                    const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
                    if ("Tab" === event.key && !isMetaKey) {
                      const candidates = getTabbableCandidates(event.currentTarget),
                        focusedElement = document.activeElement,
                        index = candidates.findIndex((candidate) => candidate === focusedElement);
                      focusFirst(
                        event.shiftKey
                          ? candidates.slice(0, index).reverse()
                          : candidates.slice(index + 1, candidates.length),
                      )
                        ? event.preventDefault()
                        : focusProxyRef.current?.focus();
                    }
                  }),
                  onEscapeKeyDown: (0, _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.m)(
                    props.onEscapeKeyDown,
                    (_event) => {
                      wasEscapeCloseRef.current = !0;
                    },
                  ),
                },
              ),
            });
          }),
          NavigationMenuViewport = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
            const { forceMount, ...viewportProps } = props,
              context = useNavigationMenuContext("NavigationMenuViewport", props.__scopeNavigationMenu),
              open = Boolean(context.value);
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
              _radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_14__.C,
              {
                present: forceMount || open,
                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(NavigationMenuViewportImpl, {
                  ...viewportProps,
                  ref: forwardedRef,
                }),
              },
            );
          });
        NavigationMenuViewport.displayName = "NavigationMenuViewport";
        var NavigationMenuViewportImpl = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
            const { __scopeNavigationMenu, children, ...viewportImplProps } = props,
              context = useNavigationMenuContext("NavigationMenuViewport", __scopeNavigationMenu),
              composedRefs = (0, _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_5__.s)(
                forwardedRef,
                context.onViewportChange,
              ),
              viewportContentContext = useViewportContentContext(CONTENT_NAME, props.__scopeNavigationMenu),
              [size, setSize] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
              [content, setContent] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
              viewportWidth = size ? size?.width + "px" : void 0,
              viewportHeight = size ? size?.height + "px" : void 0,
              open = Boolean(context.value),
              activeContentValue = open ? context.value : context.previousValue;
            return (
              useResizeObserver(content, () => {
                content && setSize({ width: content.offsetWidth, height: content.offsetHeight });
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
                _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_8__.sG.div,
                {
                  "data-state": getOpenState(open),
                  "data-orientation": context.orientation,
                  ...viewportImplProps,
                  ref: composedRefs,
                  style: {
                    pointerEvents: !open && context.isRootMenu ? "none" : void 0,
                    "--radix-navigation-menu-viewport-width": viewportWidth,
                    "--radix-navigation-menu-viewport-height": viewportHeight,
                    ...viewportImplProps.style,
                  },
                  onPointerEnter: (0, _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.m)(
                    props.onPointerEnter,
                    context.onContentEnter,
                  ),
                  onPointerLeave: (0, _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.m)(
                    props.onPointerLeave,
                    whenMouse(context.onContentLeave),
                  ),
                  children: Array.from(viewportContentContext.items).map(([value, { ref, forceMount, ...props2 }]) => {
                    const isActive = activeContentValue === value;
                    return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
                      _radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_14__.C,
                      {
                        present: forceMount || isActive,
                        children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(NavigationMenuContentImpl, {
                          ...props2,
                          ref: (0, _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_5__.t)(ref, (node) => {
                            isActive && node && setContent(node);
                          }),
                        }),
                      },
                      value,
                    );
                  }),
                },
              )
            );
          }),
          FocusGroup = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
            const { __scopeNavigationMenu, ...groupProps } = props,
              context = useNavigationMenuContext("FocusGroup", __scopeNavigationMenu);
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(FocusGroupCollection.Provider, {
              scope: __scopeNavigationMenu,
              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(FocusGroupCollection.Slot, {
                scope: __scopeNavigationMenu,
                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
                  _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_8__.sG.div,
                  { dir: context.dir, ...groupProps, ref: forwardedRef },
                ),
              }),
            });
          }),
          ARROW_KEYS = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"],
          FocusGroupItem = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
            const { __scopeNavigationMenu, ...groupProps } = props,
              getItems = useFocusGroupCollection(__scopeNavigationMenu),
              context = useNavigationMenuContext("FocusGroupItem", __scopeNavigationMenu);
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(FocusGroupCollection.ItemSlot, {
              scope: __scopeNavigationMenu,
              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
                _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_8__.sG.button,
                {
                  ...groupProps,
                  ref: forwardedRef,
                  onKeyDown: (0, _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_12__.m)(props.onKeyDown, (event) => {
                    if (["Home", "End", ...ARROW_KEYS].includes(event.key)) {
                      let candidateNodes = getItems().map((item) => item.ref.current);
                      if (
                        (["rtl" === context.dir ? "ArrowRight" : "ArrowLeft", "ArrowUp", "End"].includes(event.key) &&
                          candidateNodes.reverse(),
                        ARROW_KEYS.includes(event.key))
                      ) {
                        const currentIndex = candidateNodes.indexOf(event.currentTarget);
                        candidateNodes = candidateNodes.slice(currentIndex + 1);
                      }
                      setTimeout(() => focusFirst(candidateNodes)), event.preventDefault();
                    }
                  }),
                },
              ),
            });
          });
        function getTabbableCandidates(container) {
          const nodes = [],
            walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
              acceptNode: (node) => {
                const isHiddenInput = "INPUT" === node.tagName && "hidden" === node.type;
                return node.disabled || node.hidden || isHiddenInput
                  ? NodeFilter.FILTER_SKIP
                  : node.tabIndex >= 0
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_SKIP;
              },
            });
          for (; walker.nextNode(); ) nodes.push(walker.currentNode);
          return nodes;
        }
        function focusFirst(candidates) {
          const previouslyFocusedElement = document.activeElement;
          return candidates.some(
            (candidate) =>
              candidate === previouslyFocusedElement ||
              (candidate.focus(), document.activeElement !== previouslyFocusedElement),
          );
        }
        function useResizeObserver(element, onResize) {
          const handleResize = (0, _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_11__.c)(onResize);
          (0, _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_15__.N)(() => {
            let rAF = 0;
            if (element) {
              const resizeObserver = new ResizeObserver(() => {
                cancelAnimationFrame(rAF), (rAF = window.requestAnimationFrame(handleResize));
              });
              return (
                resizeObserver.observe(element),
                () => {
                  window.cancelAnimationFrame(rAF), resizeObserver.unobserve(element);
                }
              );
            }
          }, [element, handleResize]);
        }
        function getOpenState(open) {
          return open ? "open" : "closed";
        }
        function makeTriggerId(baseId, value) {
          return `${baseId}-trigger-${value}`;
        }
        function makeContentId(baseId, value) {
          return `${baseId}-content-${value}`;
        }
        function whenMouse(handler) {
          return (event) => ("mouse" === event.pointerType ? handler(event) : void 0);
        }
        var Root2 = NavigationMenu,
          List = NavigationMenuList,
          Item = NavigationMenuItem,
          Trigger = NavigationMenuTrigger,
          Link = NavigationMenuLink,
          Content = NavigationMenuContent,
          Viewport = NavigationMenuViewport;
      },
    "./node_modules/.pnpm/@radix-ui+react-presence@1._01531d7e373404f85f01b998531f26ee/node_modules/@radix-ui/react-presence/dist/index.mjs":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.d(__webpack_exports__, { C: () => Presence });
        var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react/index.js",
          ),
          _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-compose-ref_09e46bdbfd85bd0bcf577db4590260b2/node_modules/@radix-ui/react-compose-refs/dist/index.mjs",
          ),
          _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-use-layout-_5f69c47ab12fad839cfb8723a33e5e36/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs",
          );
        var Presence = (props) => {
          const { present, children } = props,
            presence = (function usePresence(present) {
              const [node, setNode] = react__WEBPACK_IMPORTED_MODULE_0__.useState(),
                stylesRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),
                prevPresentRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(present),
                prevAnimationNameRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef("none"),
                initialState = present ? "mounted" : "unmounted",
                [state, send] = (function useStateMachine(initialState, machine) {
                  return react__WEBPACK_IMPORTED_MODULE_0__.useReducer(
                    (state, event) => machine[state][event] ?? state,
                    initialState,
                  );
                })(initialState, {
                  mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
                  unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
                  unmounted: { MOUNT: "mounted" },
                });
              return (
                react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
                  const currentAnimationName = getAnimationName(stylesRef.current);
                  prevAnimationNameRef.current = "mounted" === state ? currentAnimationName : "none";
                }, [state]),
                (0, _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_2__.N)(() => {
                  const styles = stylesRef.current,
                    wasPresent = prevPresentRef.current;
                  if (wasPresent !== present) {
                    const prevAnimationName = prevAnimationNameRef.current,
                      currentAnimationName = getAnimationName(styles);
                    if (present) send("MOUNT");
                    else if ("none" === currentAnimationName || "none" === styles?.display) send("UNMOUNT");
                    else {
                      send(wasPresent && prevAnimationName !== currentAnimationName ? "ANIMATION_OUT" : "UNMOUNT");
                    }
                    prevPresentRef.current = present;
                  }
                }, [present, send]),
                (0, _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_2__.N)(() => {
                  if (node) {
                    let timeoutId;
                    const ownerWindow = node.ownerDocument.defaultView ?? window,
                      handleAnimationEnd = (event) => {
                        const isCurrentAnimation = getAnimationName(stylesRef.current).includes(event.animationName);
                        if (
                          event.target === node &&
                          isCurrentAnimation &&
                          (send("ANIMATION_END"), !prevPresentRef.current)
                        ) {
                          const currentFillMode = node.style.animationFillMode;
                          (node.style.animationFillMode = "forwards"),
                            (timeoutId = ownerWindow.setTimeout(() => {
                              "forwards" === node.style.animationFillMode &&
                                (node.style.animationFillMode = currentFillMode);
                            }));
                        }
                      },
                      handleAnimationStart = (event) => {
                        event.target === node && (prevAnimationNameRef.current = getAnimationName(stylesRef.current));
                      };
                    return (
                      node.addEventListener("animationstart", handleAnimationStart),
                      node.addEventListener("animationcancel", handleAnimationEnd),
                      node.addEventListener("animationend", handleAnimationEnd),
                      () => {
                        ownerWindow.clearTimeout(timeoutId),
                          node.removeEventListener("animationstart", handleAnimationStart),
                          node.removeEventListener("animationcancel", handleAnimationEnd),
                          node.removeEventListener("animationend", handleAnimationEnd);
                      }
                    );
                  }
                  send("ANIMATION_END");
                }, [node, send]),
                {
                  isPresent: ["mounted", "unmountSuspended"].includes(state),
                  ref: react__WEBPACK_IMPORTED_MODULE_0__.useCallback((node2) => {
                    (stylesRef.current = node2 ? getComputedStyle(node2) : null), setNode(node2);
                  }, []),
                }
              );
            })(present),
            child =
              "function" == typeof children
                ? children({ present: presence.isPresent })
                : react__WEBPACK_IMPORTED_MODULE_0__.Children.only(children),
            ref = (0, _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_1__.s)(
              presence.ref,
              (function getElementRef(element) {
                let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get,
                  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
                if (mayWarn) return element.ref;
                if (
                  ((getter = Object.getOwnPropertyDescriptor(element, "ref")?.get),
                  (mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning),
                  mayWarn)
                )
                  return element.props.ref;
                return element.props.ref || element.ref;
              })(child),
            );
          return "function" == typeof children || presence.isPresent
            ? react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(child, { ref })
            : null;
        };
        function getAnimationName(styles) {
          return styles?.animationName || "none";
        }
        Presence.displayName = "Presence";
      },
    "./node_modules/.pnpm/@radix-ui+react-use-previou_d6273884695acacf2afd2bd3cfd21173/node_modules/@radix-ui/react-use-previous/dist/index.mjs":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.d(__webpack_exports__, { Z: () => usePrevious });
        var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react/index.js",
        );
        function usePrevious(value) {
          const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef({ value, previous: value });
          return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
            () => (
              ref.current.value !== value && ((ref.current.previous = ref.current.value), (ref.current.value = value)),
              ref.current.previous
            ),
            [value],
          );
        }
      },
    "./node_modules/.pnpm/@radix-ui+react-visually-hi_52b9324108156fe3cfbcb349477180d1/node_modules/@radix-ui/react-visually-hidden/dist/index.mjs":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.d(__webpack_exports__, { Qg: () => VISUALLY_HIDDEN_STYLES, bL: () => Root });
        var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react/index.js",
          ),
          _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-primitive@2_56c95403134da8494df5342ba255a4c7/node_modules/@radix-ui/react-primitive/dist/index.mjs",
          ),
          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
            "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react/jsx-runtime.js",
          ),
          VISUALLY_HIDDEN_STYLES = Object.freeze({
            position: "absolute",
            border: 0,
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            wordWrap: "normal",
          }),
          VisuallyHidden = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
              _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__.sG.span,
              { ...props, ref: forwardedRef, style: { ...VISUALLY_HIDDEN_STYLES, ...props.style } },
            ),
          );
        VisuallyHidden.displayName = "VisuallyHidden";
        var Root = VisuallyHidden;
      },
    "./node_modules/.pnpm/class-variance-authority@0.7.1/node_modules/class-variance-authority/dist/index.mjs": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.d(__webpack_exports__, { F: () => cva });
      var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        "./node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs",
      );
      const falsyToString = (value) => ("boolean" == typeof value ? `${value}` : 0 === value ? "0" : value),
        cx = clsx__WEBPACK_IMPORTED_MODULE_0__.$,
        cva = (base, config) => (props) => {
          var _config_compoundVariants;
          if (null == (null == config ? void 0 : config.variants))
            return cx(base, null == props ? void 0 : props.class, null == props ? void 0 : props.className);
          const { variants, defaultVariants } = config,
            getVariantClassNames = Object.keys(variants).map((variant) => {
              const variantProp = null == props ? void 0 : props[variant],
                defaultVariantProp = null == defaultVariants ? void 0 : defaultVariants[variant];
              if (null === variantProp) return null;
              const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
              return variants[variant][variantKey];
            }),
            propsWithoutUndefined =
              props &&
              Object.entries(props).reduce((acc, param) => {
                let [key, value] = param;
                return void 0 === value || (acc[key] = value), acc;
              }, {}),
            getCompoundVariantClassNames =
              null == config ||
              null === (_config_compoundVariants = config.compoundVariants) ||
              void 0 === _config_compoundVariants
                ? void 0
                : _config_compoundVariants.reduce((acc, param) => {
                    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
                    return Object.entries(compoundVariantOptions).every((param) => {
                      let [key, value] = param;
                      return Array.isArray(value)
                        ? value.includes({ ...defaultVariants, ...propsWithoutUndefined }[key])
                        : { ...defaultVariants, ...propsWithoutUndefined }[key] === value;
                    })
                      ? [...acc, cvClass, cvClassName]
                      : acc;
                  }, []);
          return cx(
            base,
            getVariantClassNames,
            getCompoundVariantClassNames,
            null == props ? void 0 : props.class,
            null == props ? void 0 : props.className,
          );
        };
    },
    "./node_modules/.pnpm/lucide-react@0.503.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/chevron-down.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.d(__webpack_exports__, { A: () => ChevronDown });
      const ChevronDown = (0,
      __webpack_require__(
        "./node_modules/.pnpm/lucide-react@0.503.0_react@19.1.0/node_modules/lucide-react/dist/esm/createLucideIcon.js",
      ).A)("chevron-down", [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]);
    },
    "./node_modules/.pnpm/lucide-react@0.503.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/menu.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.d(__webpack_exports__, { A: () => Menu });
      const Menu = (0,
      __webpack_require__(
        "./node_modules/.pnpm/lucide-react@0.503.0_react@19.1.0/node_modules/lucide-react/dist/esm/createLucideIcon.js",
      ).A)("menu", [
        ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
        ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
        ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }],
      ]);
    },
    "./node_modules/.pnpm/lucide-react@0.503.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/x.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.d(__webpack_exports__, { A: () => X });
      const X = (0,
      __webpack_require__(
        "./node_modules/.pnpm/lucide-react@0.503.0_react@19.1.0/node_modules/lucide-react/dist/esm/createLucideIcon.js",
      ).A)("x", [
        ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
        ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
      ]);
    },
    "./node_modules/.pnpm/react-icons@5.5.0_react@19.1.0/node_modules/react-icons/lib/index.mjs": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.d(__webpack_exports__, { k5: () => GenIcon });
      var react = __webpack_require__(
          "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react/index.js",
        ),
        DefaultContext = { color: void 0, size: void 0, className: void 0, style: void 0, attr: void 0 },
        IconContext = react.createContext && react.createContext(DefaultContext),
        _excluded = ["attr", "size", "title"];
      function _objectWithoutProperties(source, excluded) {
        if (null == source) return {};
        var key,
          i,
          target = (function _objectWithoutPropertiesLoose(source, excluded) {
            if (null == source) return {};
            var target = {};
            for (var key in source)
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                if (excluded.indexOf(key) >= 0) continue;
                target[key] = source[key];
              }
            return target;
          })(source, excluded);
        if (Object.getOwnPropertySymbols) {
          var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
          for (i = 0; i < sourceSymbolKeys.length; i++)
            (key = sourceSymbolKeys[i]),
              excluded.indexOf(key) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(source, key) && (target[key] = source[key]));
        }
        return target;
      }
      function _extends() {
        return (
          (_extends = Object.assign
            ? Object.assign.bind()
            : function (target) {
                for (var i = 1; i < arguments.length; i++) {
                  var source = arguments[i];
                  for (var key in source)
                    Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
              }),
          _extends.apply(this, arguments)
        );
      }
      function ownKeys(e, r) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          r &&
            (o = o.filter(function (r) {
              return Object.getOwnPropertyDescriptor(e, r).enumerable;
            })),
            t.push.apply(t, o);
        }
        return t;
      }
      function _objectSpread(e) {
        for (var r = 1; r < arguments.length; r++) {
          var t = null != arguments[r] ? arguments[r] : {};
          r % 2
            ? ownKeys(Object(t), !0).forEach(function (r) {
                _defineProperty(e, r, t[r]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
              : ownKeys(Object(t)).forEach(function (r) {
                  Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
                });
        }
        return e;
      }
      function _defineProperty(obj, key, value) {
        return (
          (key = (function _toPropertyKey(t) {
            var i = (function _toPrimitive(t, r) {
              if ("object" != typeof t || !t) return t;
              var e = t[Symbol.toPrimitive];
              if (void 0 !== e) {
                var i = e.call(t, r || "default");
                if ("object" != typeof i) return i;
                throw new TypeError("@@toPrimitive must return a primitive value.");
              }
              return ("string" === r ? String : Number)(t);
            })(t, "string");
            return "symbol" == typeof i ? i : i + "";
          })(key)) in obj
            ? Object.defineProperty(obj, key, { value, enumerable: !0, configurable: !0, writable: !0 })
            : (obj[key] = value),
          obj
        );
      }
      function Tree2Element(tree) {
        return (
          tree &&
          tree.map((node, i) =>
            react.createElement(node.tag, _objectSpread({ key: i }, node.attr), Tree2Element(node.child)),
          )
        );
      }
      function GenIcon(data) {
        return (props) =>
          react.createElement(
            IconBase,
            _extends({ attr: _objectSpread({}, data.attr) }, props),
            Tree2Element(data.child),
          );
      }
      function IconBase(props) {
        var elem = (conf) => {
          var className,
            { attr, size, title } = props,
            svgProps = _objectWithoutProperties(props, _excluded),
            computedSize = size || conf.size || "1em";
          return (
            conf.className && (className = conf.className),
            props.className && (className = (className ? className + " " : "") + props.className),
            react.createElement(
              "svg",
              _extends({ stroke: "currentColor", fill: "currentColor", strokeWidth: "0" }, conf.attr, attr, svgProps, {
                className,
                style: _objectSpread(_objectSpread({ color: props.color || conf.color }, conf.style), props.style),
                height: computedSize,
                width: computedSize,
                xmlns: "http://www.w3.org/2000/svg",
              }),
              title && react.createElement("title", null, title),
              props.children,
            )
          );
        };
        return void 0 !== IconContext
          ? react.createElement(IconContext.Consumer, null, (conf) => elem(conf))
          : elem(DefaultContext);
      }
    },
  },
]);
