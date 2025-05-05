/*! For license information please see 936.b015d1af.iframe.bundle.js.LICENSE.txt */
"use strict";
(self.webpackChunktsa_app = self.webpackChunktsa_app || []).push([
  [936],
  {
    "./node_modules/.pnpm/@radix-ui+react-label@2.1.4_eea27531025ba2f33a4887ecef45b561/node_modules/@radix-ui/react-label/dist/index.mjs":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.d(__webpack_exports__, { b: () => Root });
        var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react/index.js",
          ),
          _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-primitive@2_56c95403134da8494df5342ba255a4c7/node_modules/@radix-ui/react-primitive/dist/index.mjs",
          ),
          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
            "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react/jsx-runtime.js",
          ),
          Label = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
              _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__.sG.label,
              {
                ...props,
                ref: forwardedRef,
                onMouseDown: (event) => {
                  event.target.closest("button, input, select, textarea") ||
                    (props.onMouseDown?.(event), !event.defaultPrevented && event.detail > 1 && event.preventDefault());
                },
              },
            ),
          );
        Label.displayName = "Label";
        var Root = Label;
      },
    "./node_modules/.pnpm/@radix-ui+react-select@2.2._39623ee9259bf7b7bbd039db8a2d6680/node_modules/@radix-ui/react-select/dist/index.mjs":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.d(__webpack_exports__, {
          UC: () => Content2,
          In: () => Icon,
          q7: () => Item,
          VF: () => ItemIndicator,
          p4: () => ItemText,
          ZL: () => Portal,
          bL: () => Root2,
          wn: () => ScrollDownButton,
          PP: () => ScrollUpButton,
          l9: () => Trigger,
          WT: () => Value,
          LM: () => Viewport,
        });
        var react = __webpack_require__(
            "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react/index.js",
          ),
          react_dom = __webpack_require__(
            "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react-dom/index.js",
          );
        function clamp(value, [min, max]) {
          return Math.min(max, Math.max(min, value));
        }
        var dist = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+primitive@1.1.2/node_modules/@radix-ui/primitive/dist/index.mjs",
          ),
          react_collection_dist = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-collection@_fecdb72573095e7939ea51c1893c7e3a/node_modules/@radix-ui/react-collection/dist/index.mjs",
          ),
          react_compose_refs_dist = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-compose-ref_09e46bdbfd85bd0bcf577db4590260b2/node_modules/@radix-ui/react-compose-refs/dist/index.mjs",
          ),
          react_context_dist = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-context@1.1_004a21dc100354e481e7301f1d8fdece/node_modules/@radix-ui/react-context/dist/index.mjs",
          ),
          react_direction_dist = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-direction@1_d9788233d4550f36bec220ab67edca5d/node_modules/@radix-ui/react-direction/dist/index.mjs",
          ),
          react_dismissable_layer_dist = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-dismissable_1a5c0df20643f8e9832f787b3d4e52d7/node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs",
          ),
          react_focus_guards_dist = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-focus-guard_8400462cd18c9e6ccd96cc5ea74f4fd8/node_modules/@radix-ui/react-focus-guards/dist/index.mjs",
          ),
          react_focus_scope_dist = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-focus-scope_f9f2e279a3d105fd4de3223953719ee7/node_modules/@radix-ui/react-focus-scope/dist/index.mjs",
          ),
          react_id_dist = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-id@1.1.1_@types+react@19.1.2_react@19.1.0/node_modules/@radix-ui/react-id/dist/index.mjs",
          ),
          react_popper_dist = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-popper@1.2._a128a11ffd1ff70497f383aa72d4b599/node_modules/@radix-ui/react-popper/dist/index.mjs",
          ),
          react_portal_dist = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-portal@1.1._2295a3d0ef089e0f4a9c06622332597d/node_modules/@radix-ui/react-portal/dist/index.mjs",
          ),
          react_primitive_dist = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-primitive@2_56c95403134da8494df5342ba255a4c7/node_modules/@radix-ui/react-primitive/dist/index.mjs",
          ),
          react_slot_dist = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-slot@1.2.0_@types+react@19.1.2_react@19.1.0/node_modules/@radix-ui/react-slot/dist/index.mjs",
          ),
          react_use_callback_ref_dist = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-use-callbac_5357c350f25489f343e1b278223a85d5/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs",
          ),
          react_use_controllable_state_dist = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-use-control_c9ce440065516d1e73f54b444c452442/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs",
          ),
          react_use_layout_effect_dist = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-use-layout-_5f69c47ab12fad839cfb8723a33e5e36/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs",
          ),
          react_use_previous_dist = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-use-previou_d6273884695acacf2afd2bd3cfd21173/node_modules/@radix-ui/react-use-previous/dist/index.mjs",
          ),
          react_visually_hidden_dist = __webpack_require__(
            "./node_modules/.pnpm/@radix-ui+react-visually-hi_52b9324108156fe3cfbcb349477180d1/node_modules/@radix-ui/react-visually-hidden/dist/index.mjs",
          ),
          es2015 = __webpack_require__(
            "./node_modules/.pnpm/aria-hidden@1.2.4/node_modules/aria-hidden/dist/es2015/index.js",
          ),
          Combination = __webpack_require__(
            "./node_modules/.pnpm/react-remove-scroll@2.6.3_@types+react@19.1.2_react@19.1.0/node_modules/react-remove-scroll/dist/es2015/Combination.js",
          ),
          jsx_runtime = __webpack_require__(
            "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react/jsx-runtime.js",
          ),
          OPEN_KEYS = [" ", "Enter", "ArrowUp", "ArrowDown"],
          SELECTION_KEYS = [" ", "Enter"],
          [Collection, useCollection, createCollectionScope] = (0, react_collection_dist.N)("Select"),
          [createSelectContext, createSelectScope] = (0, react_context_dist.A)("Select", [
            createCollectionScope,
            react_popper_dist.Bk,
          ]),
          usePopperScope = (0, react_popper_dist.Bk)(),
          [SelectProvider, useSelectContext] = createSelectContext("Select"),
          [SelectNativeOptionsProvider, useSelectNativeOptionsContext] = createSelectContext("Select"),
          Select = (props) => {
            const {
                __scopeSelect,
                children,
                open: openProp,
                defaultOpen,
                onOpenChange,
                value: valueProp,
                defaultValue,
                onValueChange,
                dir,
                name,
                autoComplete,
                disabled,
                required,
                form,
              } = props,
              popperScope = usePopperScope(__scopeSelect),
              [trigger, setTrigger] = react.useState(null),
              [valueNode, setValueNode] = react.useState(null),
              [valueNodeHasChildren, setValueNodeHasChildren] = react.useState(!1),
              direction = (0, react_direction_dist.jH)(dir),
              [open, setOpen] = (0, react_use_controllable_state_dist.i)({
                prop: openProp,
                defaultProp: defaultOpen ?? !1,
                onChange: onOpenChange,
                caller: "Select",
              }),
              [value, setValue] = (0, react_use_controllable_state_dist.i)({
                prop: valueProp,
                defaultProp: defaultValue,
                onChange: onValueChange,
                caller: "Select",
              }),
              triggerPointerDownPosRef = react.useRef(null),
              isFormControl = !trigger || form || !!trigger.closest("form"),
              [nativeOptionsSet, setNativeOptionsSet] = react.useState(new Set()),
              nativeSelectKey = Array.from(nativeOptionsSet)
                .map((option) => option.props.value)
                .join(";");
            return (0, jsx_runtime.jsx)(react_popper_dist.bL, {
              ...popperScope,
              children: (0, jsx_runtime.jsxs)(SelectProvider, {
                required,
                scope: __scopeSelect,
                trigger,
                onTriggerChange: setTrigger,
                valueNode,
                onValueNodeChange: setValueNode,
                valueNodeHasChildren,
                onValueNodeHasChildrenChange: setValueNodeHasChildren,
                contentId: (0, react_id_dist.B)(),
                value,
                onValueChange: setValue,
                open,
                onOpenChange: setOpen,
                dir: direction,
                triggerPointerDownPosRef,
                disabled,
                children: [
                  (0, jsx_runtime.jsx)(Collection.Provider, {
                    scope: __scopeSelect,
                    children: (0, jsx_runtime.jsx)(SelectNativeOptionsProvider, {
                      scope: props.__scopeSelect,
                      onNativeOptionAdd: react.useCallback((option) => {
                        setNativeOptionsSet((prev) => new Set(prev).add(option));
                      }, []),
                      onNativeOptionRemove: react.useCallback((option) => {
                        setNativeOptionsSet((prev) => {
                          const optionsSet = new Set(prev);
                          return optionsSet.delete(option), optionsSet;
                        });
                      }, []),
                      children,
                    }),
                  }),
                  isFormControl
                    ? (0, jsx_runtime.jsxs)(
                        SelectBubbleInput,
                        {
                          "aria-hidden": !0,
                          required,
                          tabIndex: -1,
                          name,
                          autoComplete,
                          value,
                          onChange: (event) => setValue(event.target.value),
                          disabled,
                          form,
                          children: [
                            void 0 === value ? (0, jsx_runtime.jsx)("option", { value: "" }) : null,
                            Array.from(nativeOptionsSet),
                          ],
                        },
                        nativeSelectKey,
                      )
                    : null,
                ],
              }),
            });
          };
        Select.displayName = "Select";
        var SelectTrigger = react.forwardRef((props, forwardedRef) => {
          const { __scopeSelect, disabled = !1, ...triggerProps } = props,
            popperScope = usePopperScope(__scopeSelect),
            context = useSelectContext("SelectTrigger", __scopeSelect),
            isDisabled = context.disabled || disabled,
            composedRefs = (0, react_compose_refs_dist.s)(forwardedRef, context.onTriggerChange),
            getItems = useCollection(__scopeSelect),
            pointerTypeRef = react.useRef("touch"),
            [searchRef, handleTypeaheadSearch, resetTypeahead] = useTypeaheadSearch((search) => {
              const enabledItems = getItems().filter((item) => !item.disabled),
                currentItem = enabledItems.find((item) => item.value === context.value),
                nextItem = findNextItem(enabledItems, search, currentItem);
              void 0 !== nextItem && context.onValueChange(nextItem.value);
            }),
            handleOpen = (pointerEvent) => {
              isDisabled || (context.onOpenChange(!0), resetTypeahead()),
                pointerEvent &&
                  (context.triggerPointerDownPosRef.current = {
                    x: Math.round(pointerEvent.pageX),
                    y: Math.round(pointerEvent.pageY),
                  });
            };
          return (0, jsx_runtime.jsx)(react_popper_dist.Mz, {
            asChild: !0,
            ...popperScope,
            children: (0, jsx_runtime.jsx)(react_primitive_dist.sG.button, {
              type: "button",
              role: "combobox",
              "aria-controls": context.contentId,
              "aria-expanded": context.open,
              "aria-required": context.required,
              "aria-autocomplete": "none",
              dir: context.dir,
              "data-state": context.open ? "open" : "closed",
              disabled: isDisabled,
              "data-disabled": isDisabled ? "" : void 0,
              "data-placeholder": shouldShowPlaceholder(context.value) ? "" : void 0,
              ...triggerProps,
              ref: composedRefs,
              onClick: (0, dist.m)(triggerProps.onClick, (event) => {
                event.currentTarget.focus(), "mouse" !== pointerTypeRef.current && handleOpen(event);
              }),
              onPointerDown: (0, dist.m)(triggerProps.onPointerDown, (event) => {
                pointerTypeRef.current = event.pointerType;
                const target = event.target;
                target.hasPointerCapture(event.pointerId) && target.releasePointerCapture(event.pointerId),
                  0 === event.button &&
                    !1 === event.ctrlKey &&
                    "mouse" === event.pointerType &&
                    (handleOpen(event), event.preventDefault());
              }),
              onKeyDown: (0, dist.m)(triggerProps.onKeyDown, (event) => {
                const isTypingAhead = "" !== searchRef.current;
                event.ctrlKey ||
                  event.altKey ||
                  event.metaKey ||
                  1 !== event.key.length ||
                  handleTypeaheadSearch(event.key),
                  (isTypingAhead && " " === event.key) ||
                    (OPEN_KEYS.includes(event.key) && (handleOpen(), event.preventDefault()));
              }),
            }),
          });
        });
        SelectTrigger.displayName = "SelectTrigger";
        var SelectValue = react.forwardRef((props, forwardedRef) => {
          const { __scopeSelect, className, style, children, placeholder = "", ...valueProps } = props,
            context = useSelectContext("SelectValue", __scopeSelect),
            { onValueNodeHasChildrenChange } = context,
            hasChildren = void 0 !== children,
            composedRefs = (0, react_compose_refs_dist.s)(forwardedRef, context.onValueNodeChange);
          return (
            (0, react_use_layout_effect_dist.N)(() => {
              onValueNodeHasChildrenChange(hasChildren);
            }, [onValueNodeHasChildrenChange, hasChildren]),
            (0, jsx_runtime.jsx)(react_primitive_dist.sG.span, {
              ...valueProps,
              ref: composedRefs,
              style: { pointerEvents: "none" },
              children: shouldShowPlaceholder(context.value)
                ? (0, jsx_runtime.jsx)(jsx_runtime.Fragment, { children: placeholder })
                : children,
            })
          );
        });
        SelectValue.displayName = "SelectValue";
        var SelectIcon = react.forwardRef((props, forwardedRef) => {
          const { __scopeSelect, children, ...iconProps } = props;
          return (0, jsx_runtime.jsx)(react_primitive_dist.sG.span, {
            "aria-hidden": !0,
            ...iconProps,
            ref: forwardedRef,
            children: children || "▼",
          });
        });
        SelectIcon.displayName = "SelectIcon";
        var SelectPortal = (props) => (0, jsx_runtime.jsx)(react_portal_dist.Z, { asChild: !0, ...props });
        SelectPortal.displayName = "SelectPortal";
        var SelectContent = react.forwardRef((props, forwardedRef) => {
          const context = useSelectContext("SelectContent", props.__scopeSelect),
            [fragment, setFragment] = react.useState();
          if (
            ((0, react_use_layout_effect_dist.N)(() => {
              setFragment(new DocumentFragment());
            }, []),
            !context.open)
          ) {
            const frag = fragment;
            return frag
              ? react_dom.createPortal(
                  (0, jsx_runtime.jsx)(SelectContentProvider, {
                    scope: props.__scopeSelect,
                    children: (0, jsx_runtime.jsx)(Collection.Slot, {
                      scope: props.__scopeSelect,
                      children: (0, jsx_runtime.jsx)("div", { children: props.children }),
                    }),
                  }),
                  frag,
                )
              : null;
          }
          return (0, jsx_runtime.jsx)(SelectContentImpl, { ...props, ref: forwardedRef });
        });
        SelectContent.displayName = "SelectContent";
        var CONTENT_MARGIN = 10,
          [SelectContentProvider, useSelectContentContext] = createSelectContext("SelectContent"),
          Slot = (0, react_slot_dist.TL)("SelectContent.RemoveScroll"),
          SelectContentImpl = react.forwardRef((props, forwardedRef) => {
            const {
                __scopeSelect,
                position = "item-aligned",
                onCloseAutoFocus,
                onEscapeKeyDown,
                onPointerDownOutside,
                side,
                sideOffset,
                align,
                alignOffset,
                arrowPadding,
                collisionBoundary,
                collisionPadding,
                sticky,
                hideWhenDetached,
                avoidCollisions,
                ...contentProps
              } = props,
              context = useSelectContext("SelectContent", __scopeSelect),
              [content, setContent] = react.useState(null),
              [viewport, setViewport] = react.useState(null),
              composedRefs = (0, react_compose_refs_dist.s)(forwardedRef, (node) => setContent(node)),
              [selectedItem, setSelectedItem] = react.useState(null),
              [selectedItemText, setSelectedItemText] = react.useState(null),
              getItems = useCollection(__scopeSelect),
              [isPositioned, setIsPositioned] = react.useState(!1),
              firstValidItemFoundRef = react.useRef(!1);
            react.useEffect(() => {
              if (content) return (0, es2015.Eq)(content);
            }, [content]),
              (0, react_focus_guards_dist.Oh)();
            const focusFirst = react.useCallback(
                (candidates) => {
                  const [firstItem, ...restItems] = getItems().map((item) => item.ref.current),
                    [lastItem] = restItems.slice(-1),
                    PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
                  for (const candidate of candidates) {
                    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
                    if (
                      (candidate?.scrollIntoView({ block: "nearest" }),
                      candidate === firstItem && viewport && (viewport.scrollTop = 0),
                      candidate === lastItem && viewport && (viewport.scrollTop = viewport.scrollHeight),
                      candidate?.focus(),
                      document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT)
                    )
                      return;
                  }
                },
                [getItems, viewport],
              ),
              focusSelectedItem = react.useCallback(
                () => focusFirst([selectedItem, content]),
                [focusFirst, selectedItem, content],
              );
            react.useEffect(() => {
              isPositioned && focusSelectedItem();
            }, [isPositioned, focusSelectedItem]);
            const { onOpenChange, triggerPointerDownPosRef } = context;
            react.useEffect(() => {
              if (content) {
                let pointerMoveDelta = { x: 0, y: 0 };
                const handlePointerMove = (event) => {
                    pointerMoveDelta = {
                      x: Math.abs(Math.round(event.pageX) - (triggerPointerDownPosRef.current?.x ?? 0)),
                      y: Math.abs(Math.round(event.pageY) - (triggerPointerDownPosRef.current?.y ?? 0)),
                    };
                  },
                  handlePointerUp = (event) => {
                    pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10
                      ? event.preventDefault()
                      : content.contains(event.target) || onOpenChange(!1),
                      document.removeEventListener("pointermove", handlePointerMove),
                      (triggerPointerDownPosRef.current = null);
                  };
                return (
                  null !== triggerPointerDownPosRef.current &&
                    (document.addEventListener("pointermove", handlePointerMove),
                    document.addEventListener("pointerup", handlePointerUp, { capture: !0, once: !0 })),
                  () => {
                    document.removeEventListener("pointermove", handlePointerMove),
                      document.removeEventListener("pointerup", handlePointerUp, { capture: !0 });
                  }
                );
              }
            }, [content, onOpenChange, triggerPointerDownPosRef]),
              react.useEffect(() => {
                const close = () => onOpenChange(!1);
                return (
                  window.addEventListener("blur", close),
                  window.addEventListener("resize", close),
                  () => {
                    window.removeEventListener("blur", close), window.removeEventListener("resize", close);
                  }
                );
              }, [onOpenChange]);
            const [searchRef, handleTypeaheadSearch] = useTypeaheadSearch((search) => {
                const enabledItems = getItems().filter((item) => !item.disabled),
                  currentItem = enabledItems.find((item) => item.ref.current === document.activeElement),
                  nextItem = findNextItem(enabledItems, search, currentItem);
                nextItem && setTimeout(() => nextItem.ref.current.focus());
              }),
              itemRefCallback = react.useCallback(
                (node, value, disabled) => {
                  const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
                  ((void 0 !== context.value && context.value === value) || isFirstValidItem) &&
                    (setSelectedItem(node), isFirstValidItem && (firstValidItemFoundRef.current = !0));
                },
                [context.value],
              ),
              handleItemLeave = react.useCallback(() => content?.focus(), [content]),
              itemTextRefCallback = react.useCallback(
                (node, value, disabled) => {
                  const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
                  ((void 0 !== context.value && context.value === value) || isFirstValidItem) &&
                    setSelectedItemText(node);
                },
                [context.value],
              ),
              SelectPosition = "popper" === position ? SelectPopperPosition : SelectItemAlignedPosition,
              popperContentProps =
                SelectPosition === SelectPopperPosition
                  ? {
                      side,
                      sideOffset,
                      align,
                      alignOffset,
                      arrowPadding,
                      collisionBoundary,
                      collisionPadding,
                      sticky,
                      hideWhenDetached,
                      avoidCollisions,
                    }
                  : {};
            return (0, jsx_runtime.jsx)(SelectContentProvider, {
              scope: __scopeSelect,
              content,
              viewport,
              onViewportChange: setViewport,
              itemRefCallback,
              selectedItem,
              onItemLeave: handleItemLeave,
              itemTextRefCallback,
              focusSelectedItem,
              selectedItemText,
              position,
              isPositioned,
              searchRef,
              children: (0, jsx_runtime.jsx)(Combination.A, {
                as: Slot,
                allowPinchZoom: !0,
                children: (0, jsx_runtime.jsx)(react_focus_scope_dist.n, {
                  asChild: !0,
                  trapped: context.open,
                  onMountAutoFocus: (event) => {
                    event.preventDefault();
                  },
                  onUnmountAutoFocus: (0, dist.m)(onCloseAutoFocus, (event) => {
                    context.trigger?.focus({ preventScroll: !0 }), event.preventDefault();
                  }),
                  children: (0, jsx_runtime.jsx)(react_dismissable_layer_dist.qW, {
                    asChild: !0,
                    disableOutsidePointerEvents: !0,
                    onEscapeKeyDown,
                    onPointerDownOutside,
                    onFocusOutside: (event) => event.preventDefault(),
                    onDismiss: () => context.onOpenChange(!1),
                    children: (0, jsx_runtime.jsx)(SelectPosition, {
                      role: "listbox",
                      id: context.contentId,
                      "data-state": context.open ? "open" : "closed",
                      dir: context.dir,
                      onContextMenu: (event) => event.preventDefault(),
                      ...contentProps,
                      ...popperContentProps,
                      onPlaced: () => setIsPositioned(!0),
                      ref: composedRefs,
                      style: { display: "flex", flexDirection: "column", outline: "none", ...contentProps.style },
                      onKeyDown: (0, dist.m)(contentProps.onKeyDown, (event) => {
                        const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
                        if (
                          ("Tab" === event.key && event.preventDefault(),
                          isModifierKey || 1 !== event.key.length || handleTypeaheadSearch(event.key),
                          ["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key))
                        ) {
                          let candidateNodes = getItems()
                            .filter((item) => !item.disabled)
                            .map((item) => item.ref.current);
                          if (
                            (["ArrowUp", "End"].includes(event.key) &&
                              (candidateNodes = candidateNodes.slice().reverse()),
                            ["ArrowUp", "ArrowDown"].includes(event.key))
                          ) {
                            const currentElement = event.target,
                              currentIndex = candidateNodes.indexOf(currentElement);
                            candidateNodes = candidateNodes.slice(currentIndex + 1);
                          }
                          setTimeout(() => focusFirst(candidateNodes)), event.preventDefault();
                        }
                      }),
                    }),
                  }),
                }),
              }),
            });
          });
        SelectContentImpl.displayName = "SelectContentImpl";
        var SelectItemAlignedPosition = react.forwardRef((props, forwardedRef) => {
          const { __scopeSelect, onPlaced, ...popperProps } = props,
            context = useSelectContext("SelectContent", __scopeSelect),
            contentContext = useSelectContentContext("SelectContent", __scopeSelect),
            [contentWrapper, setContentWrapper] = react.useState(null),
            [content, setContent] = react.useState(null),
            composedRefs = (0, react_compose_refs_dist.s)(forwardedRef, (node) => setContent(node)),
            getItems = useCollection(__scopeSelect),
            shouldExpandOnScrollRef = react.useRef(!1),
            shouldRepositionRef = react.useRef(!0),
            { viewport, selectedItem, selectedItemText, focusSelectedItem } = contentContext,
            position = react.useCallback(() => {
              if (
                context.trigger &&
                context.valueNode &&
                contentWrapper &&
                content &&
                viewport &&
                selectedItem &&
                selectedItemText
              ) {
                const triggerRect = context.trigger.getBoundingClientRect(),
                  contentRect = content.getBoundingClientRect(),
                  valueNodeRect = context.valueNode.getBoundingClientRect(),
                  itemTextRect = selectedItemText.getBoundingClientRect();
                if ("rtl" !== context.dir) {
                  const itemTextOffset = itemTextRect.left - contentRect.left,
                    left = valueNodeRect.left - itemTextOffset,
                    leftDelta = triggerRect.left - left,
                    minContentWidth = triggerRect.width + leftDelta,
                    contentWidth = Math.max(minContentWidth, contentRect.width),
                    rightEdge = window.innerWidth - CONTENT_MARGIN,
                    clampedLeft = clamp(left, [CONTENT_MARGIN, Math.max(CONTENT_MARGIN, rightEdge - contentWidth)]);
                  (contentWrapper.style.minWidth = minContentWidth + "px"),
                    (contentWrapper.style.left = clampedLeft + "px");
                } else {
                  const itemTextOffset = contentRect.right - itemTextRect.right,
                    right = window.innerWidth - valueNodeRect.right - itemTextOffset,
                    rightDelta = window.innerWidth - triggerRect.right - right,
                    minContentWidth = triggerRect.width + rightDelta,
                    contentWidth = Math.max(minContentWidth, contentRect.width),
                    leftEdge = window.innerWidth - CONTENT_MARGIN,
                    clampedRight = clamp(right, [CONTENT_MARGIN, Math.max(CONTENT_MARGIN, leftEdge - contentWidth)]);
                  (contentWrapper.style.minWidth = minContentWidth + "px"),
                    (contentWrapper.style.right = clampedRight + "px");
                }
                const items = getItems(),
                  availableHeight = window.innerHeight - 2 * CONTENT_MARGIN,
                  itemsHeight = viewport.scrollHeight,
                  contentStyles = window.getComputedStyle(content),
                  contentBorderTopWidth = parseInt(contentStyles.borderTopWidth, 10),
                  contentPaddingTop = parseInt(contentStyles.paddingTop, 10),
                  contentBorderBottomWidth = parseInt(contentStyles.borderBottomWidth, 10),
                  fullContentHeight =
                    contentBorderTopWidth +
                    contentPaddingTop +
                    itemsHeight +
                    parseInt(contentStyles.paddingBottom, 10) +
                    contentBorderBottomWidth,
                  minContentHeight = Math.min(5 * selectedItem.offsetHeight, fullContentHeight),
                  viewportStyles = window.getComputedStyle(viewport),
                  viewportPaddingTop = parseInt(viewportStyles.paddingTop, 10),
                  viewportPaddingBottom = parseInt(viewportStyles.paddingBottom, 10),
                  topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - CONTENT_MARGIN,
                  triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle,
                  selectedItemHalfHeight = selectedItem.offsetHeight / 2,
                  contentTopToItemMiddle =
                    contentBorderTopWidth + contentPaddingTop + (selectedItem.offsetTop + selectedItemHalfHeight),
                  itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;
                if (contentTopToItemMiddle <= topEdgeToTriggerMiddle) {
                  const isLastItem = items.length > 0 && selectedItem === items[items.length - 1].ref.current;
                  contentWrapper.style.bottom = "0px";
                  const viewportOffsetBottom = content.clientHeight - viewport.offsetTop - viewport.offsetHeight,
                    height =
                      contentTopToItemMiddle +
                      Math.max(
                        triggerMiddleToBottomEdge,
                        selectedItemHalfHeight +
                          (isLastItem ? viewportPaddingBottom : 0) +
                          viewportOffsetBottom +
                          contentBorderBottomWidth,
                      );
                  contentWrapper.style.height = height + "px";
                } else {
                  const isFirstItem = items.length > 0 && selectedItem === items[0].ref.current;
                  contentWrapper.style.top = "0px";
                  const height =
                    Math.max(
                      topEdgeToTriggerMiddle,
                      contentBorderTopWidth +
                        viewport.offsetTop +
                        (isFirstItem ? viewportPaddingTop : 0) +
                        selectedItemHalfHeight,
                    ) + itemMiddleToContentBottom;
                  (contentWrapper.style.height = height + "px"),
                    (viewport.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewport.offsetTop);
                }
                (contentWrapper.style.margin = `${CONTENT_MARGIN}px 0`),
                  (contentWrapper.style.minHeight = minContentHeight + "px"),
                  (contentWrapper.style.maxHeight = availableHeight + "px"),
                  onPlaced?.(),
                  requestAnimationFrame(() => (shouldExpandOnScrollRef.current = !0));
              }
            }, [
              getItems,
              context.trigger,
              context.valueNode,
              contentWrapper,
              content,
              viewport,
              selectedItem,
              selectedItemText,
              context.dir,
              onPlaced,
            ]);
          (0, react_use_layout_effect_dist.N)(() => position(), [position]);
          const [contentZIndex, setContentZIndex] = react.useState();
          (0, react_use_layout_effect_dist.N)(() => {
            content && setContentZIndex(window.getComputedStyle(content).zIndex);
          }, [content]);
          const handleScrollButtonChange = react.useCallback(
            (node) => {
              node &&
                !0 === shouldRepositionRef.current &&
                (position(), focusSelectedItem?.(), (shouldRepositionRef.current = !1));
            },
            [position, focusSelectedItem],
          );
          return (0, jsx_runtime.jsx)(SelectViewportProvider, {
            scope: __scopeSelect,
            contentWrapper,
            shouldExpandOnScrollRef,
            onScrollButtonChange: handleScrollButtonChange,
            children: (0, jsx_runtime.jsx)("div", {
              ref: setContentWrapper,
              style: { display: "flex", flexDirection: "column", position: "fixed", zIndex: contentZIndex },
              children: (0, jsx_runtime.jsx)(react_primitive_dist.sG.div, {
                ...popperProps,
                ref: composedRefs,
                style: { boxSizing: "border-box", maxHeight: "100%", ...popperProps.style },
              }),
            }),
          });
        });
        SelectItemAlignedPosition.displayName = "SelectItemAlignedPosition";
        var SelectPopperPosition = react.forwardRef((props, forwardedRef) => {
          const { __scopeSelect, align = "start", collisionPadding = CONTENT_MARGIN, ...popperProps } = props,
            popperScope = usePopperScope(__scopeSelect);
          return (0, jsx_runtime.jsx)(react_popper_dist.UC, {
            ...popperScope,
            ...popperProps,
            ref: forwardedRef,
            align,
            collisionPadding,
            style: {
              boxSizing: "border-box",
              ...popperProps.style,
              "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-select-content-available-width": "var(--radix-popper-available-width)",
              "--radix-select-content-available-height": "var(--radix-popper-available-height)",
              "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-select-trigger-height": "var(--radix-popper-anchor-height)",
            },
          });
        });
        SelectPopperPosition.displayName = "SelectPopperPosition";
        var [SelectViewportProvider, useSelectViewportContext] = createSelectContext("SelectContent", {}),
          SelectViewport = react.forwardRef((props, forwardedRef) => {
            const { __scopeSelect, nonce, ...viewportProps } = props,
              contentContext = useSelectContentContext("SelectViewport", __scopeSelect),
              viewportContext = useSelectViewportContext("SelectViewport", __scopeSelect),
              composedRefs = (0, react_compose_refs_dist.s)(forwardedRef, contentContext.onViewportChange),
              prevScrollTopRef = react.useRef(0);
            return (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
              children: [
                (0, jsx_runtime.jsx)("style", {
                  dangerouslySetInnerHTML: {
                    __html:
                      "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}",
                  },
                  nonce,
                }),
                (0, jsx_runtime.jsx)(Collection.Slot, {
                  scope: __scopeSelect,
                  children: (0, jsx_runtime.jsx)(react_primitive_dist.sG.div, {
                    "data-radix-select-viewport": "",
                    role: "presentation",
                    ...viewportProps,
                    ref: composedRefs,
                    style: { position: "relative", flex: 1, overflow: "hidden auto", ...viewportProps.style },
                    onScroll: (0, dist.m)(viewportProps.onScroll, (event) => {
                      const viewport = event.currentTarget,
                        { contentWrapper, shouldExpandOnScrollRef } = viewportContext;
                      if (shouldExpandOnScrollRef?.current && contentWrapper) {
                        const scrolledBy = Math.abs(prevScrollTopRef.current - viewport.scrollTop);
                        if (scrolledBy > 0) {
                          const availableHeight = window.innerHeight - 2 * CONTENT_MARGIN,
                            cssMinHeight = parseFloat(contentWrapper.style.minHeight),
                            cssHeight = parseFloat(contentWrapper.style.height),
                            prevHeight = Math.max(cssMinHeight, cssHeight);
                          if (prevHeight < availableHeight) {
                            const nextHeight = prevHeight + scrolledBy,
                              clampedNextHeight = Math.min(availableHeight, nextHeight),
                              heightDiff = nextHeight - clampedNextHeight;
                            (contentWrapper.style.height = clampedNextHeight + "px"),
                              "0px" === contentWrapper.style.bottom &&
                                ((viewport.scrollTop = heightDiff > 0 ? heightDiff : 0),
                                (contentWrapper.style.justifyContent = "flex-end"));
                          }
                        }
                      }
                      prevScrollTopRef.current = viewport.scrollTop;
                    }),
                  }),
                }),
              ],
            });
          });
        SelectViewport.displayName = "SelectViewport";
        var [SelectGroupContextProvider, useSelectGroupContext] = createSelectContext("SelectGroup"),
          SelectGroup = react.forwardRef((props, forwardedRef) => {
            const { __scopeSelect, ...groupProps } = props,
              groupId = (0, react_id_dist.B)();
            return (0, jsx_runtime.jsx)(SelectGroupContextProvider, {
              scope: __scopeSelect,
              id: groupId,
              children: (0, jsx_runtime.jsx)(react_primitive_dist.sG.div, {
                role: "group",
                "aria-labelledby": groupId,
                ...groupProps,
                ref: forwardedRef,
              }),
            });
          });
        SelectGroup.displayName = "SelectGroup";
        var SelectLabel = react.forwardRef((props, forwardedRef) => {
          const { __scopeSelect, ...labelProps } = props,
            groupContext = useSelectGroupContext("SelectLabel", __scopeSelect);
          return (0, jsx_runtime.jsx)(react_primitive_dist.sG.div, {
            id: groupContext.id,
            ...labelProps,
            ref: forwardedRef,
          });
        });
        SelectLabel.displayName = "SelectLabel";
        var [SelectItemContextProvider, useSelectItemContext] = createSelectContext("SelectItem"),
          SelectItem = react.forwardRef((props, forwardedRef) => {
            const { __scopeSelect, value, disabled = !1, textValue: textValueProp, ...itemProps } = props,
              context = useSelectContext("SelectItem", __scopeSelect),
              contentContext = useSelectContentContext("SelectItem", __scopeSelect),
              isSelected = context.value === value,
              [textValue, setTextValue] = react.useState(textValueProp ?? ""),
              [isFocused, setIsFocused] = react.useState(!1),
              composedRefs = (0, react_compose_refs_dist.s)(forwardedRef, (node) =>
                contentContext.itemRefCallback?.(node, value, disabled),
              ),
              textId = (0, react_id_dist.B)(),
              pointerTypeRef = react.useRef("touch"),
              handleSelect = () => {
                disabled || (context.onValueChange(value), context.onOpenChange(!1));
              };
            if ("" === value)
              throw new Error(
                "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.",
              );
            return (0, jsx_runtime.jsx)(SelectItemContextProvider, {
              scope: __scopeSelect,
              value,
              disabled,
              textId,
              isSelected,
              onItemTextChange: react.useCallback((node) => {
                setTextValue((prevTextValue) => prevTextValue || (node?.textContent ?? "").trim());
              }, []),
              children: (0, jsx_runtime.jsx)(Collection.ItemSlot, {
                scope: __scopeSelect,
                value,
                disabled,
                textValue,
                children: (0, jsx_runtime.jsx)(react_primitive_dist.sG.div, {
                  role: "option",
                  "aria-labelledby": textId,
                  "data-highlighted": isFocused ? "" : void 0,
                  "aria-selected": isSelected && isFocused,
                  "data-state": isSelected ? "checked" : "unchecked",
                  "aria-disabled": disabled || void 0,
                  "data-disabled": disabled ? "" : void 0,
                  tabIndex: disabled ? void 0 : -1,
                  ...itemProps,
                  ref: composedRefs,
                  onFocus: (0, dist.m)(itemProps.onFocus, () => setIsFocused(!0)),
                  onBlur: (0, dist.m)(itemProps.onBlur, () => setIsFocused(!1)),
                  onClick: (0, dist.m)(itemProps.onClick, () => {
                    "mouse" !== pointerTypeRef.current && handleSelect();
                  }),
                  onPointerUp: (0, dist.m)(itemProps.onPointerUp, () => {
                    "mouse" === pointerTypeRef.current && handleSelect();
                  }),
                  onPointerDown: (0, dist.m)(itemProps.onPointerDown, (event) => {
                    pointerTypeRef.current = event.pointerType;
                  }),
                  onPointerMove: (0, dist.m)(itemProps.onPointerMove, (event) => {
                    (pointerTypeRef.current = event.pointerType),
                      disabled
                        ? contentContext.onItemLeave?.()
                        : "mouse" === pointerTypeRef.current && event.currentTarget.focus({ preventScroll: !0 });
                  }),
                  onPointerLeave: (0, dist.m)(itemProps.onPointerLeave, (event) => {
                    event.currentTarget === document.activeElement && contentContext.onItemLeave?.();
                  }),
                  onKeyDown: (0, dist.m)(itemProps.onKeyDown, (event) => {
                    ("" !== contentContext.searchRef?.current && " " === event.key) ||
                      (SELECTION_KEYS.includes(event.key) && handleSelect(),
                      " " === event.key && event.preventDefault());
                  }),
                }),
              }),
            });
          });
        SelectItem.displayName = "SelectItem";
        var SelectItemText = react.forwardRef((props, forwardedRef) => {
          const { __scopeSelect, className, style, ...itemTextProps } = props,
            context = useSelectContext("SelectItemText", __scopeSelect),
            contentContext = useSelectContentContext("SelectItemText", __scopeSelect),
            itemContext = useSelectItemContext("SelectItemText", __scopeSelect),
            nativeOptionsContext = useSelectNativeOptionsContext("SelectItemText", __scopeSelect),
            [itemTextNode, setItemTextNode] = react.useState(null),
            composedRefs = (0, react_compose_refs_dist.s)(
              forwardedRef,
              (node) => setItemTextNode(node),
              itemContext.onItemTextChange,
              (node) => contentContext.itemTextRefCallback?.(node, itemContext.value, itemContext.disabled),
            ),
            textContent = itemTextNode?.textContent,
            nativeOption = react.useMemo(
              () =>
                (0, jsx_runtime.jsx)(
                  "option",
                  { value: itemContext.value, disabled: itemContext.disabled, children: textContent },
                  itemContext.value,
                ),
              [itemContext.disabled, itemContext.value, textContent],
            ),
            { onNativeOptionAdd, onNativeOptionRemove } = nativeOptionsContext;
          return (
            (0, react_use_layout_effect_dist.N)(
              () => (onNativeOptionAdd(nativeOption), () => onNativeOptionRemove(nativeOption)),
              [onNativeOptionAdd, onNativeOptionRemove, nativeOption],
            ),
            (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
              children: [
                (0, jsx_runtime.jsx)(react_primitive_dist.sG.span, {
                  id: itemContext.textId,
                  ...itemTextProps,
                  ref: composedRefs,
                }),
                itemContext.isSelected && context.valueNode && !context.valueNodeHasChildren
                  ? react_dom.createPortal(itemTextProps.children, context.valueNode)
                  : null,
              ],
            })
          );
        });
        SelectItemText.displayName = "SelectItemText";
        var SelectItemIndicator = react.forwardRef((props, forwardedRef) => {
          const { __scopeSelect, ...itemIndicatorProps } = props;
          return useSelectItemContext("SelectItemIndicator", __scopeSelect).isSelected
            ? (0, jsx_runtime.jsx)(react_primitive_dist.sG.span, {
                "aria-hidden": !0,
                ...itemIndicatorProps,
                ref: forwardedRef,
              })
            : null;
        });
        SelectItemIndicator.displayName = "SelectItemIndicator";
        var SelectScrollUpButton = react.forwardRef((props, forwardedRef) => {
          const contentContext = useSelectContentContext("SelectScrollUpButton", props.__scopeSelect),
            viewportContext = useSelectViewportContext("SelectScrollUpButton", props.__scopeSelect),
            [canScrollUp, setCanScrollUp] = react.useState(!1),
            composedRefs = (0, react_compose_refs_dist.s)(forwardedRef, viewportContext.onScrollButtonChange);
          return (
            (0, react_use_layout_effect_dist.N)(() => {
              if (contentContext.viewport && contentContext.isPositioned) {
                let handleScroll2 = function () {
                  const canScrollUp2 = viewport.scrollTop > 0;
                  setCanScrollUp(canScrollUp2);
                };
                const viewport = contentContext.viewport;
                return (
                  handleScroll2(),
                  viewport.addEventListener("scroll", handleScroll2),
                  () => viewport.removeEventListener("scroll", handleScroll2)
                );
              }
            }, [contentContext.viewport, contentContext.isPositioned]),
            canScrollUp
              ? (0, jsx_runtime.jsx)(SelectScrollButtonImpl, {
                  ...props,
                  ref: composedRefs,
                  onAutoScroll: () => {
                    const { viewport, selectedItem } = contentContext;
                    viewport && selectedItem && (viewport.scrollTop = viewport.scrollTop - selectedItem.offsetHeight);
                  },
                })
              : null
          );
        });
        SelectScrollUpButton.displayName = "SelectScrollUpButton";
        var SelectScrollDownButton = react.forwardRef((props, forwardedRef) => {
          const contentContext = useSelectContentContext("SelectScrollDownButton", props.__scopeSelect),
            viewportContext = useSelectViewportContext("SelectScrollDownButton", props.__scopeSelect),
            [canScrollDown, setCanScrollDown] = react.useState(!1),
            composedRefs = (0, react_compose_refs_dist.s)(forwardedRef, viewportContext.onScrollButtonChange);
          return (
            (0, react_use_layout_effect_dist.N)(() => {
              if (contentContext.viewport && contentContext.isPositioned) {
                let handleScroll2 = function () {
                  const maxScroll = viewport.scrollHeight - viewport.clientHeight,
                    canScrollDown2 = Math.ceil(viewport.scrollTop) < maxScroll;
                  setCanScrollDown(canScrollDown2);
                };
                const viewport = contentContext.viewport;
                return (
                  handleScroll2(),
                  viewport.addEventListener("scroll", handleScroll2),
                  () => viewport.removeEventListener("scroll", handleScroll2)
                );
              }
            }, [contentContext.viewport, contentContext.isPositioned]),
            canScrollDown
              ? (0, jsx_runtime.jsx)(SelectScrollButtonImpl, {
                  ...props,
                  ref: composedRefs,
                  onAutoScroll: () => {
                    const { viewport, selectedItem } = contentContext;
                    viewport && selectedItem && (viewport.scrollTop = viewport.scrollTop + selectedItem.offsetHeight);
                  },
                })
              : null
          );
        });
        SelectScrollDownButton.displayName = "SelectScrollDownButton";
        var SelectScrollButtonImpl = react.forwardRef((props, forwardedRef) => {
            const { __scopeSelect, onAutoScroll, ...scrollIndicatorProps } = props,
              contentContext = useSelectContentContext("SelectScrollButton", __scopeSelect),
              autoScrollTimerRef = react.useRef(null),
              getItems = useCollection(__scopeSelect),
              clearAutoScrollTimer = react.useCallback(() => {
                null !== autoScrollTimerRef.current &&
                  (window.clearInterval(autoScrollTimerRef.current), (autoScrollTimerRef.current = null));
              }, []);
            return (
              react.useEffect(() => () => clearAutoScrollTimer(), [clearAutoScrollTimer]),
              (0, react_use_layout_effect_dist.N)(() => {
                const activeItem = getItems().find((item) => item.ref.current === document.activeElement);
                activeItem?.ref.current?.scrollIntoView({ block: "nearest" });
              }, [getItems]),
              (0, jsx_runtime.jsx)(react_primitive_dist.sG.div, {
                "aria-hidden": !0,
                ...scrollIndicatorProps,
                ref: forwardedRef,
                style: { flexShrink: 0, ...scrollIndicatorProps.style },
                onPointerDown: (0, dist.m)(scrollIndicatorProps.onPointerDown, () => {
                  null === autoScrollTimerRef.current &&
                    (autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50));
                }),
                onPointerMove: (0, dist.m)(scrollIndicatorProps.onPointerMove, () => {
                  contentContext.onItemLeave?.(),
                    null === autoScrollTimerRef.current &&
                      (autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50));
                }),
                onPointerLeave: (0, dist.m)(scrollIndicatorProps.onPointerLeave, () => {
                  clearAutoScrollTimer();
                }),
              })
            );
          }),
          SelectSeparator = react.forwardRef((props, forwardedRef) => {
            const { __scopeSelect, ...separatorProps } = props;
            return (0, jsx_runtime.jsx)(react_primitive_dist.sG.div, {
              "aria-hidden": !0,
              ...separatorProps,
              ref: forwardedRef,
            });
          });
        SelectSeparator.displayName = "SelectSeparator";
        var SelectArrow = react.forwardRef((props, forwardedRef) => {
          const { __scopeSelect, ...arrowProps } = props,
            popperScope = usePopperScope(__scopeSelect),
            context = useSelectContext("SelectArrow", __scopeSelect),
            contentContext = useSelectContentContext("SelectArrow", __scopeSelect);
          return context.open && "popper" === contentContext.position
            ? (0, jsx_runtime.jsx)(react_popper_dist.i3, { ...popperScope, ...arrowProps, ref: forwardedRef })
            : null;
        });
        SelectArrow.displayName = "SelectArrow";
        var SelectBubbleInput = react.forwardRef(({ __scopeSelect, value, ...props }, forwardedRef) => {
          const ref = react.useRef(null),
            composedRefs = (0, react_compose_refs_dist.s)(forwardedRef, ref),
            prevValue = (0, react_use_previous_dist.Z)(value);
          return (
            react.useEffect(() => {
              const select = ref.current;
              if (!select) return;
              const selectProto = window.HTMLSelectElement.prototype,
                setValue = Object.getOwnPropertyDescriptor(selectProto, "value").set;
              if (prevValue !== value && setValue) {
                const event = new Event("change", { bubbles: !0 });
                setValue.call(select, value), select.dispatchEvent(event);
              }
            }, [prevValue, value]),
            (0, jsx_runtime.jsx)(react_primitive_dist.sG.select, {
              ...props,
              style: { ...react_visually_hidden_dist.Qg, ...props.style },
              ref: composedRefs,
              defaultValue: value,
            })
          );
        });
        function shouldShowPlaceholder(value) {
          return "" === value || void 0 === value;
        }
        function useTypeaheadSearch(onSearchChange) {
          const handleSearchChange = (0, react_use_callback_ref_dist.c)(onSearchChange),
            searchRef = react.useRef(""),
            timerRef = react.useRef(0),
            handleTypeaheadSearch = react.useCallback(
              (key) => {
                const search = searchRef.current + key;
                handleSearchChange(search),
                  (function updateSearch(value) {
                    (searchRef.current = value),
                      window.clearTimeout(timerRef.current),
                      "" !== value && (timerRef.current = window.setTimeout(() => updateSearch(""), 1e3));
                  })(search);
              },
              [handleSearchChange],
            ),
            resetTypeahead = react.useCallback(() => {
              (searchRef.current = ""), window.clearTimeout(timerRef.current);
            }, []);
          return (
            react.useEffect(() => () => window.clearTimeout(timerRef.current), []),
            [searchRef, handleTypeaheadSearch, resetTypeahead]
          );
        }
        function findNextItem(items, search, currentItem) {
          const normalizedSearch =
              search.length > 1 && Array.from(search).every((char) => char === search[0]) ? search[0] : search,
            currentItemIndex = currentItem ? items.indexOf(currentItem) : -1;
          let wrappedItems = (function wrapArray(array, startIndex) {
            return array.map((_, index) => array[(startIndex + index) % array.length]);
          })(items, Math.max(currentItemIndex, 0));
          1 === normalizedSearch.length && (wrappedItems = wrappedItems.filter((v) => v !== currentItem));
          const nextItem = wrappedItems.find((item) =>
            item.textValue.toLowerCase().startsWith(normalizedSearch.toLowerCase()),
          );
          return nextItem !== currentItem ? nextItem : void 0;
        }
        SelectBubbleInput.displayName = "SelectBubbleInput";
        var Root2 = Select,
          Trigger = SelectTrigger,
          Value = SelectValue,
          Icon = SelectIcon,
          Portal = SelectPortal,
          Content2 = SelectContent,
          Viewport = SelectViewport,
          Item = SelectItem,
          ItemText = SelectItemText,
          ItemIndicator = SelectItemIndicator,
          ScrollUpButton = SelectScrollUpButton,
          ScrollDownButton = SelectScrollDownButton;
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
    "./node_modules/.pnpm/lucide-react@0.503.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/check.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.d(__webpack_exports__, { A: () => Check });
      const Check = (0,
      __webpack_require__(
        "./node_modules/.pnpm/lucide-react@0.503.0_react@19.1.0/node_modules/lucide-react/dist/esm/createLucideIcon.js",
      ).A)("check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
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
    "./node_modules/.pnpm/lucide-react@0.503.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/chevron-up.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.d(__webpack_exports__, { A: () => ChevronUp });
      const ChevronUp = (0,
      __webpack_require__(
        "./node_modules/.pnpm/lucide-react@0.503.0_react@19.1.0/node_modules/lucide-react/dist/esm/createLucideIcon.js",
      ).A)("chevron-up", [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]]);
    },
    "./node_modules/.pnpm/lucide-react@0.503.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/eye-off.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.d(__webpack_exports__, { A: () => EyeOff });
      const EyeOff = (0,
      __webpack_require__(
        "./node_modules/.pnpm/lucide-react@0.503.0_react@19.1.0/node_modules/lucide-react/dist/esm/createLucideIcon.js",
      ).A)("eye-off", [
        [
          "path",
          {
            d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
            key: "ct8e1f",
          },
        ],
        ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
        [
          "path",
          {
            d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
            key: "13bj9a",
          },
        ],
        ["path", { d: "m2 2 20 20", key: "1ooewy" }],
      ]);
    },
    "./node_modules/.pnpm/lucide-react@0.503.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/eye.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.d(__webpack_exports__, { A: () => Eye });
      const Eye = (0,
      __webpack_require__(
        "./node_modules/.pnpm/lucide-react@0.503.0_react@19.1.0/node_modules/lucide-react/dist/esm/createLucideIcon.js",
      ).A)("eye", [
        [
          "path",
          {
            d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
            key: "1nclc0",
          },
        ],
        ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
      ]);
    },
    "./node_modules/.pnpm/lucide-react@0.503.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/house.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.d(__webpack_exports__, { A: () => House });
      const House = (0,
      __webpack_require__(
        "./node_modules/.pnpm/lucide-react@0.503.0_react@19.1.0/node_modules/lucide-react/dist/esm/createLucideIcon.js",
      ).A)("house", [
        ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
        [
          "path",
          {
            d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
            key: "1d0kgt",
          },
        ],
      ]);
    },
    "./node_modules/.pnpm/react-hook-form@7.56.1_react@19.1.0/node_modules/react-hook-form/dist/index.esm.mjs": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        Op: () => FormProvider,
        mN: () => useForm,
        xI: () => Controller,
        xW: () => useFormContext,
      });
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react/index.js",
        ),
        isCheckBoxInput = (element) => "checkbox" === element.type,
        isDateObject = (value) => value instanceof Date,
        isNullOrUndefined = (value) => null == value;
      const isObjectType = (value) => "object" == typeof value;
      var isObject = (value) =>
          !isNullOrUndefined(value) && !Array.isArray(value) && isObjectType(value) && !isDateObject(value),
        getEventValue = (event) =>
          isObject(event) && event.target
            ? isCheckBoxInput(event.target)
              ? event.target.checked
              : event.target.value
            : event,
        isNameInFieldArray = (names, name) =>
          names.has(((name) => name.substring(0, name.search(/\.\d+(\.|$)/)) || name)(name)),
        isPlainObject = (tempObject) => {
          const prototypeCopy = tempObject.constructor && tempObject.constructor.prototype;
          return isObject(prototypeCopy) && prototypeCopy.hasOwnProperty("isPrototypeOf");
        },
        isWeb = "undefined" != typeof window && void 0 !== window.HTMLElement && "undefined" != typeof document;
      function cloneObject(data) {
        let copy;
        const isArray = Array.isArray(data),
          isFileListInstance = "undefined" != typeof FileList && data instanceof FileList;
        if (data instanceof Date) copy = new Date(data);
        else if (data instanceof Set) copy = new Set(data);
        else {
          if ((isWeb && (data instanceof Blob || isFileListInstance)) || (!isArray && !isObject(data))) return data;
          if (((copy = isArray ? [] : {}), isArray || isPlainObject(data)))
            for (const key in data) data.hasOwnProperty(key) && (copy[key] = cloneObject(data[key]));
          else copy = data;
        }
        return copy;
      }
      var compact = (value) => (Array.isArray(value) ? value.filter(Boolean) : []),
        isUndefined = (val) => void 0 === val,
        get = (object, path, defaultValue) => {
          if (!path || !isObject(object)) return defaultValue;
          const result = compact(path.split(/[,[\].]+?/)).reduce(
            (result, key) => (isNullOrUndefined(result) ? result : result[key]),
            object,
          );
          return isUndefined(result) || result === object
            ? isUndefined(object[path])
              ? defaultValue
              : object[path]
            : result;
        },
        isBoolean = (value) => "boolean" == typeof value,
        isKey = (value) => /^\w*$/.test(value),
        stringToPath = (input) => compact(input.replace(/["|']|\]/g, "").split(/\.|\[/)),
        set = (object, path, value) => {
          let index = -1;
          const tempPath = isKey(path) ? [path] : stringToPath(path),
            length = tempPath.length,
            lastIndex = length - 1;
          for (; ++index < length; ) {
            const key = tempPath[index];
            let newValue = value;
            if (index !== lastIndex) {
              const objValue = object[key];
              newValue =
                isObject(objValue) || Array.isArray(objValue) ? objValue : isNaN(+tempPath[index + 1]) ? {} : [];
            }
            if ("__proto__" === key || "constructor" === key || "prototype" === key) return;
            (object[key] = newValue), (object = object[key]);
          }
        };
      const EVENTS = { BLUR: "blur", FOCUS_OUT: "focusout", CHANGE: "change" },
        VALIDATION_MODE = {
          onBlur: "onBlur",
          onChange: "onChange",
          onSubmit: "onSubmit",
          onTouched: "onTouched",
          all: "all",
        },
        INPUT_VALIDATION_RULES_max = "max",
        INPUT_VALIDATION_RULES_min = "min",
        INPUT_VALIDATION_RULES_maxLength = "maxLength",
        INPUT_VALIDATION_RULES_minLength = "minLength",
        INPUT_VALIDATION_RULES_pattern = "pattern",
        INPUT_VALIDATION_RULES_required = "required",
        INPUT_VALIDATION_RULES_validate = "validate",
        HookFormContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null),
        useFormContext = () => react__WEBPACK_IMPORTED_MODULE_0__.useContext(HookFormContext),
        FormProvider = (props) => {
          const { children, ...data } = props;
          return react__WEBPACK_IMPORTED_MODULE_0__.createElement(HookFormContext.Provider, { value: data }, children);
        };
      var getProxyFormState = (formState, control, localProxyFormState, isRoot = !0) => {
          const result = { defaultValues: control._defaultValues };
          for (const key in formState)
            Object.defineProperty(result, key, {
              get: () => {
                const _key = key;
                return (
                  control._proxyFormState[_key] !== VALIDATION_MODE.all &&
                    (control._proxyFormState[_key] = !isRoot || VALIDATION_MODE.all),
                  localProxyFormState && (localProxyFormState[_key] = !0),
                  formState[_key]
                );
              },
            });
          return result;
        },
        isPrimitive = (value) => isNullOrUndefined(value) || !isObjectType(value);
      function deepEqual(object1, object2) {
        if (isPrimitive(object1) || isPrimitive(object2)) return object1 === object2;
        if (isDateObject(object1) && isDateObject(object2)) return object1.getTime() === object2.getTime();
        const keys1 = Object.keys(object1),
          keys2 = Object.keys(object2);
        if (keys1.length !== keys2.length) return !1;
        for (const key of keys1) {
          const val1 = object1[key];
          if (!keys2.includes(key)) return !1;
          if ("ref" !== key) {
            const val2 = object2[key];
            if (
              (isDateObject(val1) && isDateObject(val2)) ||
              (isObject(val1) && isObject(val2)) ||
              (Array.isArray(val1) && Array.isArray(val2))
                ? !deepEqual(val1, val2)
                : val1 !== val2
            )
              return !1;
          }
        }
        return !0;
      }
      const useDeepEqualEffect = (effect, deps) => {
        const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(deps);
        deepEqual(deps, ref.current) || (ref.current = deps),
          react__WEBPACK_IMPORTED_MODULE_0__.useEffect(effect, ref.current);
      };
      var isString = (value) => "string" == typeof value,
        generateWatchOutput = (names, _names, formValues, isGlobal, defaultValue) =>
          isString(names)
            ? (isGlobal && _names.watch.add(names), get(formValues, names, defaultValue))
            : Array.isArray(names)
              ? names.map((fieldName) => (isGlobal && _names.watch.add(fieldName), get(formValues, fieldName)))
              : (isGlobal && (_names.watchAll = !0), formValues);
      function useController(props) {
        const methods = useFormContext(),
          { name, disabled, control = methods.control, shouldUnregister } = props,
          isArrayField = isNameInFieldArray(control._names.array, name),
          value = (function useWatch(props) {
            const methods = useFormContext(),
              { control = methods.control, name, defaultValue, disabled, exact } = props || {},
              [value, updateValue] = react__WEBPACK_IMPORTED_MODULE_0__.useState(control._getWatch(name, defaultValue));
            return (
              useDeepEqualEffect(
                () =>
                  control._subscribe({
                    name,
                    formState: { values: !0 },
                    exact,
                    callback: (formState) =>
                      !disabled &&
                      updateValue(
                        generateWatchOutput(
                          name,
                          control._names,
                          formState.values || control._formValues,
                          !1,
                          defaultValue,
                        ),
                      ),
                  }),
                [name, defaultValue, disabled, exact],
              ),
              react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => control._removeUnmounted()),
              value
            );
          })({
            control,
            name,
            defaultValue: get(control._formValues, name, get(control._defaultValues, name, props.defaultValue)),
            exact: !0,
          }),
          formState = (function useFormState(props) {
            const methods = useFormContext(),
              { control = methods.control, disabled, name, exact } = props || {},
              [formState, updateFormState] = react__WEBPACK_IMPORTED_MODULE_0__.useState(control._formState),
              _localProxyFormState = react__WEBPACK_IMPORTED_MODULE_0__.useRef({
                isDirty: !1,
                isLoading: !1,
                dirtyFields: !1,
                touchedFields: !1,
                validatingFields: !1,
                isValidating: !1,
                isValid: !1,
                errors: !1,
              });
            return (
              useDeepEqualEffect(
                () =>
                  control._subscribe({
                    name,
                    formState: _localProxyFormState.current,
                    exact,
                    callback: (formState) => {
                      !disabled && updateFormState({ ...control._formState, ...formState });
                    },
                  }),
                [name, disabled, exact],
              ),
              react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
                _localProxyFormState.current.isValid && control._setValid(!0);
              }, [control]),
              react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
                () => getProxyFormState(formState, control, _localProxyFormState.current, !1),
                [formState, control],
              )
            );
          })({ control, name, exact: !0 }),
          _props = react__WEBPACK_IMPORTED_MODULE_0__.useRef(props),
          _registerProps = react__WEBPACK_IMPORTED_MODULE_0__.useRef(
            control.register(name, {
              ...props.rules,
              value,
              ...(isBoolean(props.disabled) ? { disabled: props.disabled } : {}),
            }),
          ),
          fieldState = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
            () =>
              Object.defineProperties(
                {},
                {
                  invalid: { enumerable: !0, get: () => !!get(formState.errors, name) },
                  isDirty: { enumerable: !0, get: () => !!get(formState.dirtyFields, name) },
                  isTouched: { enumerable: !0, get: () => !!get(formState.touchedFields, name) },
                  isValidating: { enumerable: !0, get: () => !!get(formState.validatingFields, name) },
                  error: { enumerable: !0, get: () => get(formState.errors, name) },
                },
              ),
            [formState, name],
          ),
          onChange = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
            (event) =>
              _registerProps.current.onChange({ target: { value: getEventValue(event), name }, type: EVENTS.CHANGE }),
            [name],
          ),
          onBlur = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
            () =>
              _registerProps.current.onBlur({
                target: { value: get(control._formValues, name), name },
                type: EVENTS.BLUR,
              }),
            [name, control._formValues],
          ),
          ref = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
            (elm) => {
              const field = get(control._fields, name);
              field &&
                elm &&
                (field._f.ref = {
                  focus: () => elm.focus(),
                  select: () => elm.select(),
                  setCustomValidity: (message) => elm.setCustomValidity(message),
                  reportValidity: () => elm.reportValidity(),
                });
            },
            [control._fields, name],
          ),
          field = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
            () => ({
              name,
              value,
              ...(isBoolean(disabled) || formState.disabled ? { disabled: formState.disabled || disabled } : {}),
              onChange,
              onBlur,
              ref,
            }),
            [name, disabled, formState.disabled, onChange, onBlur, ref, value],
          );
        return (
          react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
            const _shouldUnregisterField = control._options.shouldUnregister || shouldUnregister;
            control.register(name, {
              ..._props.current.rules,
              ...(isBoolean(_props.current.disabled) ? { disabled: _props.current.disabled } : {}),
            });
            const updateMounted = (name, value) => {
              const field = get(control._fields, name);
              field && field._f && (field._f.mount = value);
            };
            if ((updateMounted(name, !0), _shouldUnregisterField)) {
              const value = cloneObject(get(control._options.defaultValues, name));
              set(control._defaultValues, name, value),
                isUndefined(get(control._formValues, name)) && set(control._formValues, name, value);
            }
            return (
              !isArrayField && control.register(name),
              () => {
                (isArrayField ? _shouldUnregisterField && !control._state.action : _shouldUnregisterField)
                  ? control.unregister(name)
                  : updateMounted(name, !1);
              }
            );
          }, [name, control, isArrayField, shouldUnregister]),
          react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
            control._setDisabledField({ disabled, name });
          }, [disabled, name, control]),
          react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
            () => ({ field, formState, fieldState }),
            [field, formState, fieldState],
          )
        );
      }
      const Controller = (props) => props.render(useController(props));
      var appendErrors = (name, validateAllFieldCriteria, errors, type, message) =>
          validateAllFieldCriteria
            ? {
                ...errors[name],
                types: { ...(errors[name] && errors[name].types ? errors[name].types : {}), [type]: message || !0 },
              }
            : {},
        convertToArrayPayload = (value) => (Array.isArray(value) ? value : [value]),
        createSubject = () => {
          let _observers = [];
          return {
            get observers() {
              return _observers;
            },
            next: (value) => {
              for (const observer of _observers) observer.next && observer.next(value);
            },
            subscribe: (observer) => (
              _observers.push(observer),
              {
                unsubscribe: () => {
                  _observers = _observers.filter((o) => o !== observer);
                },
              }
            ),
            unsubscribe: () => {
              _observers = [];
            },
          };
        },
        isEmptyObject = (value) => isObject(value) && !Object.keys(value).length,
        isFileInput = (element) => "file" === element.type,
        isFunction = (value) => "function" == typeof value,
        isHTMLElement = (value) => {
          if (!isWeb) return !1;
          const owner = value ? value.ownerDocument : 0;
          return value instanceof (owner && owner.defaultView ? owner.defaultView.HTMLElement : HTMLElement);
        },
        isMultipleSelect = (element) => "select-multiple" === element.type,
        isRadioInput = (element) => "radio" === element.type,
        isRadioOrCheckbox = (ref) => isRadioInput(ref) || isCheckBoxInput(ref),
        live = (ref) => isHTMLElement(ref) && ref.isConnected;
      function unset(object, path) {
        const paths = Array.isArray(path) ? path : isKey(path) ? [path] : stringToPath(path),
          childObject =
            1 === paths.length
              ? object
              : (function baseGet(object, updatePath) {
                  const length = updatePath.slice(0, -1).length;
                  let index = 0;
                  for (; index < length; ) object = isUndefined(object) ? index++ : object[updatePath[index++]];
                  return object;
                })(object, paths),
          index = paths.length - 1,
          key = paths[index];
        return (
          childObject && delete childObject[key],
          0 !== index &&
            ((isObject(childObject) && isEmptyObject(childObject)) ||
              (Array.isArray(childObject) &&
                (function isEmptyArray(obj) {
                  for (const key in obj) if (obj.hasOwnProperty(key) && !isUndefined(obj[key])) return !1;
                  return !0;
                })(childObject))) &&
            unset(object, paths.slice(0, -1)),
          object
        );
      }
      var objectHasFunction = (data) => {
        for (const key in data) if (isFunction(data[key])) return !0;
        return !1;
      };
      function markFieldsDirty(data, fields = {}) {
        const isParentNodeArray = Array.isArray(data);
        if (isObject(data) || isParentNodeArray)
          for (const key in data)
            Array.isArray(data[key]) || (isObject(data[key]) && !objectHasFunction(data[key]))
              ? ((fields[key] = Array.isArray(data[key]) ? [] : {}), markFieldsDirty(data[key], fields[key]))
              : isNullOrUndefined(data[key]) || (fields[key] = !0);
        return fields;
      }
      function getDirtyFieldsFromDefaultValues(data, formValues, dirtyFieldsFromValues) {
        const isParentNodeArray = Array.isArray(data);
        if (isObject(data) || isParentNodeArray)
          for (const key in data)
            Array.isArray(data[key]) || (isObject(data[key]) && !objectHasFunction(data[key]))
              ? isUndefined(formValues) || isPrimitive(dirtyFieldsFromValues[key])
                ? (dirtyFieldsFromValues[key] = Array.isArray(data[key])
                    ? markFieldsDirty(data[key], [])
                    : { ...markFieldsDirty(data[key]) })
                : getDirtyFieldsFromDefaultValues(
                    data[key],
                    isNullOrUndefined(formValues) ? {} : formValues[key],
                    dirtyFieldsFromValues[key],
                  )
              : (dirtyFieldsFromValues[key] = !deepEqual(data[key], formValues[key]));
        return dirtyFieldsFromValues;
      }
      var getDirtyFields = (defaultValues, formValues) =>
        getDirtyFieldsFromDefaultValues(defaultValues, formValues, markFieldsDirty(formValues));
      const defaultResult = { value: !1, isValid: !1 },
        validResult = { value: !0, isValid: !0 };
      var getCheckboxValue = (options) => {
          if (Array.isArray(options)) {
            if (options.length > 1) {
              const values = options
                .filter((option) => option && option.checked && !option.disabled)
                .map((option) => option.value);
              return { value: values, isValid: !!values.length };
            }
            return options[0].checked && !options[0].disabled
              ? options[0].attributes && !isUndefined(options[0].attributes.value)
                ? isUndefined(options[0].value) || "" === options[0].value
                  ? validResult
                  : { value: options[0].value, isValid: !0 }
                : validResult
              : defaultResult;
          }
          return defaultResult;
        },
        getFieldValueAs = (value, { valueAsNumber, valueAsDate, setValueAs }) =>
          isUndefined(value)
            ? value
            : valueAsNumber
              ? "" === value
                ? NaN
                : value
                  ? +value
                  : value
              : valueAsDate && isString(value)
                ? new Date(value)
                : setValueAs
                  ? setValueAs(value)
                  : value;
      const defaultReturn = { isValid: !1, value: null };
      var getRadioValue = (options) =>
        Array.isArray(options)
          ? options.reduce(
              (previous, option) =>
                option && option.checked && !option.disabled ? { isValid: !0, value: option.value } : previous,
              defaultReturn,
            )
          : defaultReturn;
      function getFieldValue(_f) {
        const ref = _f.ref;
        return isFileInput(ref)
          ? ref.files
          : isRadioInput(ref)
            ? getRadioValue(_f.refs).value
            : isMultipleSelect(ref)
              ? [...ref.selectedOptions].map(({ value }) => value)
              : isCheckBoxInput(ref)
                ? getCheckboxValue(_f.refs).value
                : getFieldValueAs(isUndefined(ref.value) ? _f.ref.value : ref.value, _f);
      }
      var getResolverOptions = (fieldsNames, _fields, criteriaMode, shouldUseNativeValidation) => {
          const fields = {};
          for (const name of fieldsNames) {
            const field = get(_fields, name);
            field && set(fields, name, field._f);
          }
          return { criteriaMode, names: [...fieldsNames], fields, shouldUseNativeValidation };
        },
        isRegex = (value) => value instanceof RegExp,
        getRuleValue = (rule) =>
          isUndefined(rule)
            ? rule
            : isRegex(rule)
              ? rule.source
              : isObject(rule)
                ? isRegex(rule.value)
                  ? rule.value.source
                  : rule.value
                : rule,
        getValidationModes = (mode) => ({
          isOnSubmit: !mode || mode === VALIDATION_MODE.onSubmit,
          isOnBlur: mode === VALIDATION_MODE.onBlur,
          isOnChange: mode === VALIDATION_MODE.onChange,
          isOnAll: mode === VALIDATION_MODE.all,
          isOnTouch: mode === VALIDATION_MODE.onTouched,
        });
      var hasPromiseValidation = (fieldReference) =>
          !!fieldReference &&
          !!fieldReference.validate &&
          !!(
            (isFunction(fieldReference.validate) && "AsyncFunction" === fieldReference.validate.constructor.name) ||
            (isObject(fieldReference.validate) &&
              Object.values(fieldReference.validate).find(
                (validateFunction) => "AsyncFunction" === validateFunction.constructor.name,
              ))
          ),
        hasValidation = (options) =>
          options.mount &&
          (options.required ||
            options.min ||
            options.max ||
            options.maxLength ||
            options.minLength ||
            options.pattern ||
            options.validate),
        isWatched = (name, _names, isBlurEvent) =>
          !isBlurEvent &&
          (_names.watchAll ||
            _names.watch.has(name) ||
            [..._names.watch].some(
              (watchName) => name.startsWith(watchName) && /^\.\w+/.test(name.slice(watchName.length)),
            ));
      const iterateFieldsByAction = (fields, action, fieldsNames, abortEarly) => {
        for (const key of fieldsNames || Object.keys(fields)) {
          const field = get(fields, key);
          if (field) {
            const { _f, ...currentField } = field;
            if (_f) {
              if (_f.refs && _f.refs[0] && action(_f.refs[0], key) && !abortEarly) return !0;
              if (_f.ref && action(_f.ref, _f.name) && !abortEarly) return !0;
              if (iterateFieldsByAction(currentField, action)) break;
            } else if (isObject(currentField) && iterateFieldsByAction(currentField, action)) break;
          }
        }
      };
      function schemaErrorLookup(errors, _fields, name) {
        const error = get(errors, name);
        if (error || isKey(name)) return { error, name };
        const names = name.split(".");
        for (; names.length; ) {
          const fieldName = names.join("."),
            field = get(_fields, fieldName),
            foundError = get(errors, fieldName);
          if (field && !Array.isArray(field) && name !== fieldName) return { name };
          if (foundError && foundError.type) return { name: fieldName, error: foundError };
          names.pop();
        }
        return { name };
      }
      var shouldRenderFormState = (formStateData, _proxyFormState, updateFormState, isRoot) => {
          updateFormState(formStateData);
          const { name, ...formState } = formStateData;
          return (
            isEmptyObject(formState) ||
            Object.keys(formState).length >= Object.keys(_proxyFormState).length ||
            Object.keys(formState).find((key) => _proxyFormState[key] === (!isRoot || VALIDATION_MODE.all))
          );
        },
        shouldSubscribeByName = (name, signalName, exact) =>
          !name ||
          !signalName ||
          name === signalName ||
          convertToArrayPayload(name).some(
            (currentName) =>
              currentName &&
              (exact
                ? currentName === signalName
                : currentName.startsWith(signalName) || signalName.startsWith(currentName)),
          ),
        skipValidation = (isBlurEvent, isTouched, isSubmitted, reValidateMode, mode) =>
          !mode.isOnAll &&
          (!isSubmitted && mode.isOnTouch
            ? !(isTouched || isBlurEvent)
            : (isSubmitted ? reValidateMode.isOnBlur : mode.isOnBlur)
              ? !isBlurEvent
              : !(isSubmitted ? reValidateMode.isOnChange : mode.isOnChange) || isBlurEvent),
        unsetEmptyArray = (ref, name) => !compact(get(ref, name)).length && unset(ref, name),
        updateFieldArrayRootError = (errors, error, name) => {
          const fieldArrayErrors = convertToArrayPayload(get(errors, name));
          return set(fieldArrayErrors, "root", error[name]), set(errors, name, fieldArrayErrors), errors;
        },
        isMessage = (value) => isString(value);
      function getValidateError(result, ref, type = "validate") {
        if (isMessage(result) || (Array.isArray(result) && result.every(isMessage)) || (isBoolean(result) && !result))
          return { type, message: isMessage(result) ? result : "", ref };
      }
      var getValueAndMessage = (validationData) =>
          isObject(validationData) && !isRegex(validationData)
            ? validationData
            : { value: validationData, message: "" },
        validateField = async (
          field,
          disabledFieldNames,
          formValues,
          validateAllFieldCriteria,
          shouldUseNativeValidation,
          isFieldArray,
        ) => {
          const { ref, refs, required, maxLength, minLength, min, max, pattern, validate, name, valueAsNumber, mount } =
              field._f,
            inputValue = get(formValues, name);
          if (!mount || disabledFieldNames.has(name)) return {};
          const inputRef = refs ? refs[0] : ref,
            setCustomValidity = (message) => {
              shouldUseNativeValidation &&
                inputRef.reportValidity &&
                (inputRef.setCustomValidity(isBoolean(message) ? "" : message || ""), inputRef.reportValidity());
            },
            error = {},
            isRadio = isRadioInput(ref),
            isCheckBox = isCheckBoxInput(ref),
            isRadioOrCheckbox = isRadio || isCheckBox,
            isEmpty =
              ((valueAsNumber || isFileInput(ref)) && isUndefined(ref.value) && isUndefined(inputValue)) ||
              (isHTMLElement(ref) && "" === ref.value) ||
              "" === inputValue ||
              (Array.isArray(inputValue) && !inputValue.length),
            appendErrorsCurry = appendErrors.bind(null, name, validateAllFieldCriteria, error),
            getMinMaxMessage = (
              exceedMax,
              maxLengthMessage,
              minLengthMessage,
              maxType = INPUT_VALIDATION_RULES_maxLength,
              minType = INPUT_VALIDATION_RULES_minLength,
            ) => {
              const message = exceedMax ? maxLengthMessage : minLengthMessage;
              error[name] = {
                type: exceedMax ? maxType : minType,
                message,
                ref,
                ...appendErrorsCurry(exceedMax ? maxType : minType, message),
              };
            };
          if (
            isFieldArray
              ? !Array.isArray(inputValue) || !inputValue.length
              : required &&
                ((!isRadioOrCheckbox && (isEmpty || isNullOrUndefined(inputValue))) ||
                  (isBoolean(inputValue) && !inputValue) ||
                  (isCheckBox && !getCheckboxValue(refs).isValid) ||
                  (isRadio && !getRadioValue(refs).isValid))
          ) {
            const { value, message } = isMessage(required)
              ? { value: !!required, message: required }
              : getValueAndMessage(required);
            if (
              value &&
              ((error[name] = {
                type: INPUT_VALIDATION_RULES_required,
                message,
                ref: inputRef,
                ...appendErrorsCurry(INPUT_VALIDATION_RULES_required, message),
              }),
              !validateAllFieldCriteria)
            )
              return setCustomValidity(message), error;
          }
          if (!(isEmpty || (isNullOrUndefined(min) && isNullOrUndefined(max)))) {
            let exceedMax, exceedMin;
            const maxOutput = getValueAndMessage(max),
              minOutput = getValueAndMessage(min);
            if (isNullOrUndefined(inputValue) || isNaN(inputValue)) {
              const valueDate = ref.valueAsDate || new Date(inputValue),
                convertTimeToDate = (time) => new Date(new Date().toDateString() + " " + time),
                isTime = "time" == ref.type,
                isWeek = "week" == ref.type;
              isString(maxOutput.value) &&
                inputValue &&
                (exceedMax = isTime
                  ? convertTimeToDate(inputValue) > convertTimeToDate(maxOutput.value)
                  : isWeek
                    ? inputValue > maxOutput.value
                    : valueDate > new Date(maxOutput.value)),
                isString(minOutput.value) &&
                  inputValue &&
                  (exceedMin = isTime
                    ? convertTimeToDate(inputValue) < convertTimeToDate(minOutput.value)
                    : isWeek
                      ? inputValue < minOutput.value
                      : valueDate < new Date(minOutput.value));
            } else {
              const valueNumber = ref.valueAsNumber || (inputValue ? +inputValue : inputValue);
              isNullOrUndefined(maxOutput.value) || (exceedMax = valueNumber > maxOutput.value),
                isNullOrUndefined(minOutput.value) || (exceedMin = valueNumber < minOutput.value);
            }
            if (
              (exceedMax || exceedMin) &&
              (getMinMaxMessage(
                !!exceedMax,
                maxOutput.message,
                minOutput.message,
                INPUT_VALIDATION_RULES_max,
                INPUT_VALIDATION_RULES_min,
              ),
              !validateAllFieldCriteria)
            )
              return setCustomValidity(error[name].message), error;
          }
          if (
            (maxLength || minLength) &&
            !isEmpty &&
            (isString(inputValue) || (isFieldArray && Array.isArray(inputValue)))
          ) {
            const maxLengthOutput = getValueAndMessage(maxLength),
              minLengthOutput = getValueAndMessage(minLength),
              exceedMax = !isNullOrUndefined(maxLengthOutput.value) && inputValue.length > +maxLengthOutput.value,
              exceedMin = !isNullOrUndefined(minLengthOutput.value) && inputValue.length < +minLengthOutput.value;
            if (
              (exceedMax || exceedMin) &&
              (getMinMaxMessage(exceedMax, maxLengthOutput.message, minLengthOutput.message), !validateAllFieldCriteria)
            )
              return setCustomValidity(error[name].message), error;
          }
          if (pattern && !isEmpty && isString(inputValue)) {
            const { value: patternValue, message } = getValueAndMessage(pattern);
            if (
              isRegex(patternValue) &&
              !inputValue.match(patternValue) &&
              ((error[name] = {
                type: INPUT_VALIDATION_RULES_pattern,
                message,
                ref,
                ...appendErrorsCurry(INPUT_VALIDATION_RULES_pattern, message),
              }),
              !validateAllFieldCriteria)
            )
              return setCustomValidity(message), error;
          }
          if (validate)
            if (isFunction(validate)) {
              const validateError = getValidateError(await validate(inputValue, formValues), inputRef);
              if (
                validateError &&
                ((error[name] = {
                  ...validateError,
                  ...appendErrorsCurry(INPUT_VALIDATION_RULES_validate, validateError.message),
                }),
                !validateAllFieldCriteria)
              )
                return setCustomValidity(validateError.message), error;
            } else if (isObject(validate)) {
              let validationResult = {};
              for (const key in validate) {
                if (!isEmptyObject(validationResult) && !validateAllFieldCriteria) break;
                const validateError = getValidateError(await validate[key](inputValue, formValues), inputRef, key);
                validateError &&
                  ((validationResult = { ...validateError, ...appendErrorsCurry(key, validateError.message) }),
                  setCustomValidity(validateError.message),
                  validateAllFieldCriteria && (error[name] = validationResult));
              }
              if (
                !isEmptyObject(validationResult) &&
                ((error[name] = { ref: inputRef, ...validationResult }), !validateAllFieldCriteria)
              )
                return error;
            }
          return setCustomValidity(!0), error;
        };
      const defaultOptions = {
        mode: VALIDATION_MODE.onSubmit,
        reValidateMode: VALIDATION_MODE.onChange,
        shouldFocusError: !0,
      };
      function createFormControl(props = {}) {
        let _options = { ...defaultOptions, ...props },
          _formState = {
            submitCount: 0,
            isDirty: !1,
            isReady: !1,
            isLoading: isFunction(_options.defaultValues),
            isValidating: !1,
            isSubmitted: !1,
            isSubmitting: !1,
            isSubmitSuccessful: !1,
            isValid: !1,
            touchedFields: {},
            dirtyFields: {},
            validatingFields: {},
            errors: _options.errors || {},
            disabled: _options.disabled || !1,
          };
        const _fields = {};
        let delayErrorCallback,
          _defaultValues =
            ((isObject(_options.defaultValues) || isObject(_options.values)) &&
              cloneObject(_options.values || _options.defaultValues)) ||
            {},
          _formValues = _options.shouldUnregister ? {} : cloneObject(_defaultValues),
          _state = { action: !1, mount: !1, watch: !1 },
          _names = { mount: new Set(), disabled: new Set(), unMount: new Set(), array: new Set(), watch: new Set() },
          timer = 0;
        const _proxyFormState = {
          isDirty: !1,
          dirtyFields: !1,
          validatingFields: !1,
          touchedFields: !1,
          isValidating: !1,
          isValid: !1,
          errors: !1,
        };
        let _proxySubscribeFormState = { ..._proxyFormState };
        const _subjects = { array: createSubject(), state: createSubject() },
          validationModeBeforeSubmit = getValidationModes(_options.mode),
          validationModeAfterSubmit = getValidationModes(_options.reValidateMode),
          shouldDisplayAllAssociatedErrors = _options.criteriaMode === VALIDATION_MODE.all,
          _setValid = async (shouldUpdateValid) => {
            if (
              !_options.disabled &&
              (_proxyFormState.isValid || _proxySubscribeFormState.isValid || shouldUpdateValid)
            ) {
              const isValid = _options.resolver
                ? isEmptyObject((await _runSchema()).errors)
                : await executeBuiltInValidation(_fields, !0);
              isValid !== _formState.isValid && _subjects.state.next({ isValid });
            }
          },
          _updateIsValidating = (names, isValidating) => {
            !_options.disabled &&
              (_proxyFormState.isValidating ||
                _proxyFormState.validatingFields ||
                _proxySubscribeFormState.isValidating ||
                _proxySubscribeFormState.validatingFields) &&
              ((names || Array.from(_names.mount)).forEach((name) => {
                name &&
                  (isValidating
                    ? set(_formState.validatingFields, name, isValidating)
                    : unset(_formState.validatingFields, name));
              }),
              _subjects.state.next({
                validatingFields: _formState.validatingFields,
                isValidating: !isEmptyObject(_formState.validatingFields),
              }));
          },
          updateValidAndValue = (name, shouldSkipSetValueAs, value, ref) => {
            const field = get(_fields, name);
            if (field) {
              const defaultValue = get(_formValues, name, isUndefined(value) ? get(_defaultValues, name) : value);
              isUndefined(defaultValue) || (ref && ref.defaultChecked) || shouldSkipSetValueAs
                ? set(_formValues, name, shouldSkipSetValueAs ? defaultValue : getFieldValue(field._f))
                : setFieldValue(name, defaultValue),
                _state.mount && _setValid();
            }
          },
          updateTouchAndDirty = (name, fieldValue, isBlurEvent, shouldDirty, shouldRender) => {
            let shouldUpdateField = !1,
              isPreviousDirty = !1;
            const output = { name };
            if (!_options.disabled) {
              if (!isBlurEvent || shouldDirty) {
                (_proxyFormState.isDirty || _proxySubscribeFormState.isDirty) &&
                  ((isPreviousDirty = _formState.isDirty),
                  (_formState.isDirty = output.isDirty = _getDirty()),
                  (shouldUpdateField = isPreviousDirty !== output.isDirty));
                const isCurrentFieldPristine = deepEqual(get(_defaultValues, name), fieldValue);
                (isPreviousDirty = !!get(_formState.dirtyFields, name)),
                  isCurrentFieldPristine ? unset(_formState.dirtyFields, name) : set(_formState.dirtyFields, name, !0),
                  (output.dirtyFields = _formState.dirtyFields),
                  (shouldUpdateField =
                    shouldUpdateField ||
                    ((_proxyFormState.dirtyFields || _proxySubscribeFormState.dirtyFields) &&
                      isPreviousDirty !== !isCurrentFieldPristine));
              }
              if (isBlurEvent) {
                const isPreviousFieldTouched = get(_formState.touchedFields, name);
                isPreviousFieldTouched ||
                  (set(_formState.touchedFields, name, isBlurEvent),
                  (output.touchedFields = _formState.touchedFields),
                  (shouldUpdateField =
                    shouldUpdateField ||
                    ((_proxyFormState.touchedFields || _proxySubscribeFormState.touchedFields) &&
                      isPreviousFieldTouched !== isBlurEvent)));
              }
              shouldUpdateField && shouldRender && _subjects.state.next(output);
            }
            return shouldUpdateField ? output : {};
          },
          shouldRenderByError = (name, isValid, error, fieldState) => {
            const previousFieldError = get(_formState.errors, name),
              shouldUpdateValid =
                (_proxyFormState.isValid || _proxySubscribeFormState.isValid) &&
                isBoolean(isValid) &&
                _formState.isValid !== isValid;
            var callback;
            if (
              (_options.delayError && error
                ? ((callback = () =>
                    ((name, error) => {
                      set(_formState.errors, name, error), _subjects.state.next({ errors: _formState.errors });
                    })(name, error)),
                  (delayErrorCallback = (wait) => {
                    clearTimeout(timer), (timer = setTimeout(callback, wait));
                  }),
                  delayErrorCallback(_options.delayError))
                : (clearTimeout(timer),
                  (delayErrorCallback = null),
                  error ? set(_formState.errors, name, error) : unset(_formState.errors, name)),
              (error ? !deepEqual(previousFieldError, error) : previousFieldError) ||
                !isEmptyObject(fieldState) ||
                shouldUpdateValid)
            ) {
              const updatedFormState = {
                ...fieldState,
                ...(shouldUpdateValid && isBoolean(isValid) ? { isValid } : {}),
                errors: _formState.errors,
                name,
              };
              (_formState = { ..._formState, ...updatedFormState }), _subjects.state.next(updatedFormState);
            }
          },
          _runSchema = async (name) => {
            _updateIsValidating(name, !0);
            const result = await _options.resolver(
              _formValues,
              _options.context,
              getResolverOptions(
                name || _names.mount,
                _fields,
                _options.criteriaMode,
                _options.shouldUseNativeValidation,
              ),
            );
            return _updateIsValidating(name), result;
          },
          executeBuiltInValidation = async (fields, shouldOnlyCheckValid, context = { valid: !0 }) => {
            for (const name in fields) {
              const field = fields[name];
              if (field) {
                const { _f, ...fieldValue } = field;
                if (_f) {
                  const isFieldArrayRoot = _names.array.has(_f.name),
                    isPromiseFunction = field._f && hasPromiseValidation(field._f);
                  isPromiseFunction && _proxyFormState.validatingFields && _updateIsValidating([name], !0);
                  const fieldError = await validateField(
                    field,
                    _names.disabled,
                    _formValues,
                    shouldDisplayAllAssociatedErrors,
                    _options.shouldUseNativeValidation && !shouldOnlyCheckValid,
                    isFieldArrayRoot,
                  );
                  if (
                    (isPromiseFunction && _proxyFormState.validatingFields && _updateIsValidating([name]),
                    fieldError[_f.name] && ((context.valid = !1), shouldOnlyCheckValid))
                  )
                    break;
                  !shouldOnlyCheckValid &&
                    (get(fieldError, _f.name)
                      ? isFieldArrayRoot
                        ? updateFieldArrayRootError(_formState.errors, fieldError, _f.name)
                        : set(_formState.errors, _f.name, fieldError[_f.name])
                      : unset(_formState.errors, _f.name));
                }
                !isEmptyObject(fieldValue) &&
                  (await executeBuiltInValidation(fieldValue, shouldOnlyCheckValid, context));
              }
            }
            return context.valid;
          },
          _getDirty = (name, data) =>
            !_options.disabled &&
            (name && data && set(_formValues, name, data), !deepEqual(getValues(), _defaultValues)),
          _getWatch = (names, defaultValue, isGlobal) =>
            generateWatchOutput(
              names,
              _names,
              {
                ...(_state.mount
                  ? _formValues
                  : isUndefined(defaultValue)
                    ? _defaultValues
                    : isString(names)
                      ? { [names]: defaultValue }
                      : defaultValue),
              },
              isGlobal,
              defaultValue,
            ),
          setFieldValue = (name, value, options = {}) => {
            const field = get(_fields, name);
            let fieldValue = value;
            if (field) {
              const fieldReference = field._f;
              fieldReference &&
                (!fieldReference.disabled && set(_formValues, name, getFieldValueAs(value, fieldReference)),
                (fieldValue = isHTMLElement(fieldReference.ref) && isNullOrUndefined(value) ? "" : value),
                isMultipleSelect(fieldReference.ref)
                  ? [...fieldReference.ref.options].forEach(
                      (optionRef) => (optionRef.selected = fieldValue.includes(optionRef.value)),
                    )
                  : fieldReference.refs
                    ? isCheckBoxInput(fieldReference.ref)
                      ? fieldReference.refs.length > 1
                        ? fieldReference.refs.forEach(
                            (checkboxRef) =>
                              (!checkboxRef.defaultChecked || !checkboxRef.disabled) &&
                              (checkboxRef.checked = Array.isArray(fieldValue)
                                ? !!fieldValue.find((data) => data === checkboxRef.value)
                                : fieldValue === checkboxRef.value),
                          )
                        : fieldReference.refs[0] && (fieldReference.refs[0].checked = !!fieldValue)
                      : fieldReference.refs.forEach((radioRef) => (radioRef.checked = radioRef.value === fieldValue))
                    : isFileInput(fieldReference.ref)
                      ? (fieldReference.ref.value = "")
                      : ((fieldReference.ref.value = fieldValue),
                        fieldReference.ref.type || _subjects.state.next({ name, values: cloneObject(_formValues) })));
            }
            (options.shouldDirty || options.shouldTouch) &&
              updateTouchAndDirty(name, fieldValue, options.shouldTouch, options.shouldDirty, !0),
              options.shouldValidate && trigger(name);
          },
          setValues = (name, value, options) => {
            for (const fieldKey in value) {
              const fieldValue = value[fieldKey],
                fieldName = `${name}.${fieldKey}`,
                field = get(_fields, fieldName);
              (_names.array.has(name) || isObject(fieldValue) || (field && !field._f)) && !isDateObject(fieldValue)
                ? setValues(fieldName, fieldValue, options)
                : setFieldValue(fieldName, fieldValue, options);
            }
          },
          setValue = (name, value, options = {}) => {
            const field = get(_fields, name),
              isFieldArray = _names.array.has(name),
              cloneValue = cloneObject(value);
            set(_formValues, name, cloneValue),
              isFieldArray
                ? (_subjects.array.next({ name, values: cloneObject(_formValues) }),
                  (_proxyFormState.isDirty ||
                    _proxyFormState.dirtyFields ||
                    _proxySubscribeFormState.isDirty ||
                    _proxySubscribeFormState.dirtyFields) &&
                    options.shouldDirty &&
                    _subjects.state.next({
                      name,
                      dirtyFields: getDirtyFields(_defaultValues, _formValues),
                      isDirty: _getDirty(name, cloneValue),
                    }))
                : !field || field._f || isNullOrUndefined(cloneValue)
                  ? setFieldValue(name, cloneValue, options)
                  : setValues(name, cloneValue, options),
              isWatched(name, _names) && _subjects.state.next({ ..._formState }),
              _subjects.state.next({ name: _state.mount ? name : void 0, values: cloneObject(_formValues) });
          },
          onChange = async (event) => {
            _state.mount = !0;
            const target = event.target;
            let name = target.name,
              isFieldValueUpdated = !0;
            const field = get(_fields, name),
              _updateIsFieldValueUpdated = (fieldValue) => {
                isFieldValueUpdated =
                  Number.isNaN(fieldValue) ||
                  (isDateObject(fieldValue) && isNaN(fieldValue.getTime())) ||
                  deepEqual(fieldValue, get(_formValues, name, fieldValue));
              };
            if (field) {
              let error, isValid;
              const fieldValue = target.type ? getFieldValue(field._f) : getEventValue(event),
                isBlurEvent = event.type === EVENTS.BLUR || event.type === EVENTS.FOCUS_OUT,
                shouldSkipValidation =
                  (!hasValidation(field._f) && !_options.resolver && !get(_formState.errors, name) && !field._f.deps) ||
                  skipValidation(
                    isBlurEvent,
                    get(_formState.touchedFields, name),
                    _formState.isSubmitted,
                    validationModeAfterSubmit,
                    validationModeBeforeSubmit,
                  ),
                watched = isWatched(name, _names, isBlurEvent);
              set(_formValues, name, fieldValue),
                isBlurEvent
                  ? (field._f.onBlur && field._f.onBlur(event), delayErrorCallback && delayErrorCallback(0))
                  : field._f.onChange && field._f.onChange(event);
              const fieldState = updateTouchAndDirty(name, fieldValue, isBlurEvent),
                shouldRender = !isEmptyObject(fieldState) || watched;
              if (
                (!isBlurEvent && _subjects.state.next({ name, type: event.type, values: cloneObject(_formValues) }),
                shouldSkipValidation)
              )
                return (
                  (_proxyFormState.isValid || _proxySubscribeFormState.isValid) &&
                    ("onBlur" === _options.mode ? isBlurEvent && _setValid() : isBlurEvent || _setValid()),
                  shouldRender && _subjects.state.next({ name, ...(watched ? {} : fieldState) })
                );
              if ((!isBlurEvent && watched && _subjects.state.next({ ..._formState }), _options.resolver)) {
                const { errors } = await _runSchema([name]);
                if ((_updateIsFieldValueUpdated(fieldValue), isFieldValueUpdated)) {
                  const previousErrorLookupResult = schemaErrorLookup(_formState.errors, _fields, name),
                    errorLookupResult = schemaErrorLookup(errors, _fields, previousErrorLookupResult.name || name);
                  (error = errorLookupResult.error), (name = errorLookupResult.name), (isValid = isEmptyObject(errors));
                }
              } else
                _updateIsValidating([name], !0),
                  (error = (
                    await validateField(
                      field,
                      _names.disabled,
                      _formValues,
                      shouldDisplayAllAssociatedErrors,
                      _options.shouldUseNativeValidation,
                    )
                  )[name]),
                  _updateIsValidating([name]),
                  _updateIsFieldValueUpdated(fieldValue),
                  isFieldValueUpdated &&
                    (error
                      ? (isValid = !1)
                      : (_proxyFormState.isValid || _proxySubscribeFormState.isValid) &&
                        (isValid = await executeBuiltInValidation(_fields, !0)));
              isFieldValueUpdated &&
                (field._f.deps && trigger(field._f.deps), shouldRenderByError(name, isValid, error, fieldState));
            }
          },
          _focusInput = (ref, key) => {
            if (get(_formState.errors, key) && ref.focus) return ref.focus(), 1;
          },
          trigger = async (name, options = {}) => {
            let isValid, validationResult;
            const fieldNames = convertToArrayPayload(name);
            if (_options.resolver) {
              const errors = await (async (names) => {
                const { errors } = await _runSchema(names);
                if (names)
                  for (const name of names) {
                    const error = get(errors, name);
                    error ? set(_formState.errors, name, error) : unset(_formState.errors, name);
                  }
                else _formState.errors = errors;
                return errors;
              })(isUndefined(name) ? name : fieldNames);
              (isValid = isEmptyObject(errors)),
                (validationResult = name ? !fieldNames.some((name) => get(errors, name)) : isValid);
            } else
              name
                ? ((validationResult = (
                    await Promise.all(
                      fieldNames.map(async (fieldName) => {
                        const field = get(_fields, fieldName);
                        return await executeBuiltInValidation(field && field._f ? { [fieldName]: field } : field);
                      }),
                    )
                  ).every(Boolean)),
                  (validationResult || _formState.isValid) && _setValid())
                : (validationResult = isValid = await executeBuiltInValidation(_fields));
            return (
              _subjects.state.next({
                ...(!isString(name) ||
                ((_proxyFormState.isValid || _proxySubscribeFormState.isValid) && isValid !== _formState.isValid)
                  ? {}
                  : { name }),
                ...(_options.resolver || !name ? { isValid } : {}),
                errors: _formState.errors,
              }),
              options.shouldFocus &&
                !validationResult &&
                iterateFieldsByAction(_fields, _focusInput, name ? fieldNames : _names.mount),
              validationResult
            );
          },
          getValues = (fieldNames) => {
            const values = { ...(_state.mount ? _formValues : _defaultValues) };
            return isUndefined(fieldNames)
              ? values
              : isString(fieldNames)
                ? get(values, fieldNames)
                : fieldNames.map((name) => get(values, name));
          },
          getFieldState = (name, formState) => ({
            invalid: !!get((formState || _formState).errors, name),
            isDirty: !!get((formState || _formState).dirtyFields, name),
            error: get((formState || _formState).errors, name),
            isValidating: !!get(_formState.validatingFields, name),
            isTouched: !!get((formState || _formState).touchedFields, name),
          }),
          setError = (name, error, options) => {
            const ref = (get(_fields, name, { _f: {} })._f || {}).ref,
              currentError = get(_formState.errors, name) || {},
              { ref: currentRef, message, type, ...restOfErrorTree } = currentError;
            set(_formState.errors, name, { ...restOfErrorTree, ...error, ref }),
              _subjects.state.next({ name, errors: _formState.errors, isValid: !1 }),
              options && options.shouldFocus && ref && ref.focus && ref.focus();
          },
          _subscribe = (props) =>
            _subjects.state.subscribe({
              next: (formState) => {
                shouldSubscribeByName(props.name, formState.name, props.exact) &&
                  shouldRenderFormState(
                    formState,
                    props.formState || _proxyFormState,
                    _setFormState,
                    props.reRenderRoot,
                  ) &&
                  props.callback({ values: { ..._formValues }, ..._formState, ...formState });
              },
            }).unsubscribe,
          unregister = (name, options = {}) => {
            for (const fieldName of name ? convertToArrayPayload(name) : _names.mount)
              _names.mount.delete(fieldName),
                _names.array.delete(fieldName),
                options.keepValue || (unset(_fields, fieldName), unset(_formValues, fieldName)),
                !options.keepError && unset(_formState.errors, fieldName),
                !options.keepDirty && unset(_formState.dirtyFields, fieldName),
                !options.keepTouched && unset(_formState.touchedFields, fieldName),
                !options.keepIsValidating && unset(_formState.validatingFields, fieldName),
                !_options.shouldUnregister && !options.keepDefaultValue && unset(_defaultValues, fieldName);
            _subjects.state.next({ values: cloneObject(_formValues) }),
              _subjects.state.next({ ..._formState, ...(options.keepDirty ? { isDirty: _getDirty() } : {}) }),
              !options.keepIsValid && _setValid();
          },
          _setDisabledField = ({ disabled, name }) => {
            ((isBoolean(disabled) && _state.mount) || disabled || _names.disabled.has(name)) &&
              (disabled ? _names.disabled.add(name) : _names.disabled.delete(name));
          },
          register = (name, options = {}) => {
            let field = get(_fields, name);
            const disabledIsDefined = isBoolean(options.disabled) || isBoolean(_options.disabled);
            return (
              set(_fields, name, {
                ...(field || {}),
                _f: { ...(field && field._f ? field._f : { ref: { name } }), name, mount: !0, ...options },
              }),
              _names.mount.add(name),
              field
                ? _setDisabledField({
                    disabled: isBoolean(options.disabled) ? options.disabled : _options.disabled,
                    name,
                  })
                : updateValidAndValue(name, !0, options.value),
              {
                ...(disabledIsDefined ? { disabled: options.disabled || _options.disabled } : {}),
                ...(_options.progressive
                  ? {
                      required: !!options.required,
                      min: getRuleValue(options.min),
                      max: getRuleValue(options.max),
                      minLength: getRuleValue(options.minLength),
                      maxLength: getRuleValue(options.maxLength),
                      pattern: getRuleValue(options.pattern),
                    }
                  : {}),
                name,
                onChange,
                onBlur: onChange,
                ref: (ref) => {
                  if (ref) {
                    register(name, options), (field = get(_fields, name));
                    const fieldRef =
                        (isUndefined(ref.value) &&
                          ref.querySelectorAll &&
                          ref.querySelectorAll("input,select,textarea")[0]) ||
                        ref,
                      radioOrCheckbox = isRadioOrCheckbox(fieldRef),
                      refs = field._f.refs || [];
                    if (radioOrCheckbox ? refs.find((option) => option === fieldRef) : fieldRef === field._f.ref)
                      return;
                    set(_fields, name, {
                      _f: {
                        ...field._f,
                        ...(radioOrCheckbox
                          ? {
                              refs: [
                                ...refs.filter(live),
                                fieldRef,
                                ...(Array.isArray(get(_defaultValues, name)) ? [{}] : []),
                              ],
                              ref: { type: fieldRef.type, name },
                            }
                          : { ref: fieldRef }),
                      },
                    }),
                      updateValidAndValue(name, !1, void 0, fieldRef);
                  } else
                    (field = get(_fields, name, {})),
                      field._f && (field._f.mount = !1),
                      (_options.shouldUnregister || options.shouldUnregister) &&
                        (!isNameInFieldArray(_names.array, name) || !_state.action) &&
                        _names.unMount.add(name);
                },
              }
            );
          },
          _focusError = () => _options.shouldFocusError && iterateFieldsByAction(_fields, _focusInput, _names.mount),
          handleSubmit = (onValid, onInvalid) => async (e) => {
            let onValidError;
            e && (e.preventDefault && e.preventDefault(), e.persist && e.persist());
            let fieldValues = cloneObject(_formValues);
            if ((_subjects.state.next({ isSubmitting: !0 }), _options.resolver)) {
              const { errors, values } = await _runSchema();
              (_formState.errors = errors), (fieldValues = values);
            } else await executeBuiltInValidation(_fields);
            if (_names.disabled.size) for (const name of _names.disabled) set(fieldValues, name, void 0);
            if ((unset(_formState.errors, "root"), isEmptyObject(_formState.errors))) {
              _subjects.state.next({ errors: {} });
              try {
                await onValid(fieldValues, e);
              } catch (error) {
                onValidError = error;
              }
            } else onInvalid && (await onInvalid({ ..._formState.errors }, e)), _focusError(), setTimeout(_focusError);
            if (
              (_subjects.state.next({
                isSubmitted: !0,
                isSubmitting: !1,
                isSubmitSuccessful: isEmptyObject(_formState.errors) && !onValidError,
                submitCount: _formState.submitCount + 1,
                errors: _formState.errors,
              }),
              onValidError)
            )
              throw onValidError;
          },
          _reset = (formValues, keepStateOptions = {}) => {
            const updatedValues = formValues ? cloneObject(formValues) : _defaultValues,
              cloneUpdatedValues = cloneObject(updatedValues),
              isEmptyResetValues = isEmptyObject(formValues),
              values = isEmptyResetValues ? _defaultValues : cloneUpdatedValues;
            if (
              (keepStateOptions.keepDefaultValues || (_defaultValues = updatedValues), !keepStateOptions.keepValues)
            ) {
              if (keepStateOptions.keepDirtyValues) {
                const fieldsToCheck = new Set([
                  ..._names.mount,
                  ...Object.keys(getDirtyFields(_defaultValues, _formValues)),
                ]);
                for (const fieldName of Array.from(fieldsToCheck))
                  get(_formState.dirtyFields, fieldName)
                    ? set(values, fieldName, get(_formValues, fieldName))
                    : setValue(fieldName, get(values, fieldName));
              } else {
                if (isWeb && isUndefined(formValues))
                  for (const name of _names.mount) {
                    const field = get(_fields, name);
                    if (field && field._f) {
                      const fieldReference = Array.isArray(field._f.refs) ? field._f.refs[0] : field._f.ref;
                      if (isHTMLElement(fieldReference)) {
                        const form = fieldReference.closest("form");
                        if (form) {
                          form.reset();
                          break;
                        }
                      }
                    }
                  }
                for (const fieldName of _names.mount) setValue(fieldName, get(values, fieldName));
              }
              (_formValues = cloneObject(values)),
                _subjects.array.next({ values: { ...values } }),
                _subjects.state.next({ values: { ...values } });
            }
            (_names = {
              mount: keepStateOptions.keepDirtyValues ? _names.mount : new Set(),
              unMount: new Set(),
              array: new Set(),
              disabled: new Set(),
              watch: new Set(),
              watchAll: !1,
              focus: "",
            }),
              (_state.mount =
                !_proxyFormState.isValid || !!keepStateOptions.keepIsValid || !!keepStateOptions.keepDirtyValues),
              (_state.watch = !!_options.shouldUnregister),
              _subjects.state.next({
                submitCount: keepStateOptions.keepSubmitCount ? _formState.submitCount : 0,
                isDirty:
                  !isEmptyResetValues &&
                  (keepStateOptions.keepDirty
                    ? _formState.isDirty
                    : !(!keepStateOptions.keepDefaultValues || deepEqual(formValues, _defaultValues))),
                isSubmitted: !!keepStateOptions.keepIsSubmitted && _formState.isSubmitted,
                dirtyFields: isEmptyResetValues
                  ? {}
                  : keepStateOptions.keepDirtyValues
                    ? keepStateOptions.keepDefaultValues && _formValues
                      ? getDirtyFields(_defaultValues, _formValues)
                      : _formState.dirtyFields
                    : keepStateOptions.keepDefaultValues && formValues
                      ? getDirtyFields(_defaultValues, formValues)
                      : keepStateOptions.keepDirty
                        ? _formState.dirtyFields
                        : {},
                touchedFields: keepStateOptions.keepTouched ? _formState.touchedFields : {},
                errors: keepStateOptions.keepErrors ? _formState.errors : {},
                isSubmitSuccessful: !!keepStateOptions.keepIsSubmitSuccessful && _formState.isSubmitSuccessful,
                isSubmitting: !1,
              });
          },
          reset = (formValues, keepStateOptions) =>
            _reset(isFunction(formValues) ? formValues(_formValues) : formValues, keepStateOptions),
          _setFormState = (updatedFormState) => {
            _formState = { ..._formState, ...updatedFormState };
          },
          methods = {
            control: {
              register,
              unregister,
              getFieldState,
              handleSubmit,
              setError,
              _subscribe,
              _runSchema,
              _getWatch,
              _getDirty,
              _setValid,
              _setFieldArray: (
                name,
                values = [],
                method,
                args,
                shouldSetValues = !0,
                shouldUpdateFieldsAndState = !0,
              ) => {
                if (args && method && !_options.disabled) {
                  if (((_state.action = !0), shouldUpdateFieldsAndState && Array.isArray(get(_fields, name)))) {
                    const fieldValues = method(get(_fields, name), args.argA, args.argB);
                    shouldSetValues && set(_fields, name, fieldValues);
                  }
                  if (shouldUpdateFieldsAndState && Array.isArray(get(_formState.errors, name))) {
                    const errors = method(get(_formState.errors, name), args.argA, args.argB);
                    shouldSetValues && set(_formState.errors, name, errors), unsetEmptyArray(_formState.errors, name);
                  }
                  if (
                    (_proxyFormState.touchedFields || _proxySubscribeFormState.touchedFields) &&
                    shouldUpdateFieldsAndState &&
                    Array.isArray(get(_formState.touchedFields, name))
                  ) {
                    const touchedFields = method(get(_formState.touchedFields, name), args.argA, args.argB);
                    shouldSetValues && set(_formState.touchedFields, name, touchedFields);
                  }
                  (_proxyFormState.dirtyFields || _proxySubscribeFormState.dirtyFields) &&
                    (_formState.dirtyFields = getDirtyFields(_defaultValues, _formValues)),
                    _subjects.state.next({
                      name,
                      isDirty: _getDirty(name, values),
                      dirtyFields: _formState.dirtyFields,
                      errors: _formState.errors,
                      isValid: _formState.isValid,
                    });
                } else set(_formValues, name, values);
              },
              _setDisabledField,
              _setErrors: (errors) => {
                (_formState.errors = errors), _subjects.state.next({ errors: _formState.errors, isValid: !1 });
              },
              _getFieldArray: (name) =>
                compact(
                  get(
                    _state.mount ? _formValues : _defaultValues,
                    name,
                    _options.shouldUnregister ? get(_defaultValues, name, []) : [],
                  ),
                ),
              _reset,
              _resetDefaultValues: () =>
                isFunction(_options.defaultValues) &&
                _options.defaultValues().then((values) => {
                  reset(values, _options.resetOptions), _subjects.state.next({ isLoading: !1 });
                }),
              _removeUnmounted: () => {
                for (const name of _names.unMount) {
                  const field = get(_fields, name);
                  field &&
                    (field._f.refs ? field._f.refs.every((ref) => !live(ref)) : !live(field._f.ref)) &&
                    unregister(name);
                }
                _names.unMount = new Set();
              },
              _disableForm: (disabled) => {
                isBoolean(disabled) &&
                  (_subjects.state.next({ disabled }),
                  iterateFieldsByAction(
                    _fields,
                    (ref, name) => {
                      const currentField = get(_fields, name);
                      currentField &&
                        ((ref.disabled = currentField._f.disabled || disabled),
                        Array.isArray(currentField._f.refs) &&
                          currentField._f.refs.forEach((inputRef) => {
                            inputRef.disabled = currentField._f.disabled || disabled;
                          }));
                    },
                    0,
                    !1,
                  ));
              },
              _subjects,
              _proxyFormState,
              get _fields() {
                return _fields;
              },
              get _formValues() {
                return _formValues;
              },
              get _state() {
                return _state;
              },
              set _state(value) {
                _state = value;
              },
              get _defaultValues() {
                return _defaultValues;
              },
              get _names() {
                return _names;
              },
              set _names(value) {
                _names = value;
              },
              get _formState() {
                return _formState;
              },
              get _options() {
                return _options;
              },
              set _options(value) {
                _options = { ..._options, ...value };
              },
            },
            subscribe: (props) => (
              (_state.mount = !0),
              (_proxySubscribeFormState = { ..._proxySubscribeFormState, ...props.formState }),
              _subscribe({ ...props, formState: _proxySubscribeFormState })
            ),
            trigger,
            register,
            handleSubmit,
            watch: (name, defaultValue) =>
              isFunction(name)
                ? _subjects.state.subscribe({ next: (payload) => name(_getWatch(void 0, defaultValue), payload) })
                : _getWatch(name, defaultValue, !0),
            setValue,
            getValues,
            reset,
            resetField: (name, options = {}) => {
              get(_fields, name) &&
                (isUndefined(options.defaultValue)
                  ? setValue(name, cloneObject(get(_defaultValues, name)))
                  : (setValue(name, options.defaultValue),
                    set(_defaultValues, name, cloneObject(options.defaultValue))),
                options.keepTouched || unset(_formState.touchedFields, name),
                options.keepDirty ||
                  (unset(_formState.dirtyFields, name),
                  (_formState.isDirty = options.defaultValue
                    ? _getDirty(name, cloneObject(get(_defaultValues, name)))
                    : _getDirty())),
                options.keepError || (unset(_formState.errors, name), _proxyFormState.isValid && _setValid()),
                _subjects.state.next({ ..._formState }));
            },
            clearErrors: (name) => {
              name && convertToArrayPayload(name).forEach((inputName) => unset(_formState.errors, inputName)),
                _subjects.state.next({ errors: name ? _formState.errors : {} });
            },
            unregister,
            setError,
            setFocus: (name, options = {}) => {
              const field = get(_fields, name),
                fieldReference = field && field._f;
              if (fieldReference) {
                const fieldRef = fieldReference.refs ? fieldReference.refs[0] : fieldReference.ref;
                fieldRef.focus &&
                  (fieldRef.focus(), options.shouldSelect && isFunction(fieldRef.select) && fieldRef.select());
              }
            },
            getFieldState,
          };
        return { ...methods, formControl: methods };
      }
      const useIsomorphicLayoutEffect =
        "undefined" != typeof window
          ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect
          : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;
      function useForm(props = {}) {
        const _formControl = react__WEBPACK_IMPORTED_MODULE_0__.useRef(void 0),
          _values = react__WEBPACK_IMPORTED_MODULE_0__.useRef(void 0),
          [formState, updateFormState] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
            isDirty: !1,
            isValidating: !1,
            isLoading: isFunction(props.defaultValues),
            isSubmitted: !1,
            isSubmitting: !1,
            isSubmitSuccessful: !1,
            isValid: !1,
            submitCount: 0,
            dirtyFields: {},
            touchedFields: {},
            validatingFields: {},
            errors: props.errors || {},
            disabled: props.disabled || !1,
            isReady: !1,
            defaultValues: isFunction(props.defaultValues) ? void 0 : props.defaultValues,
          });
        _formControl.current ||
          ((_formControl.current = {
            ...(props.formControl ? props.formControl : createFormControl(props)),
            formState,
          }),
          props.formControl &&
            props.defaultValues &&
            !isFunction(props.defaultValues) &&
            props.formControl.reset(props.defaultValues, props.resetOptions));
        const control = _formControl.current.control;
        return (
          (control._options = props),
          useIsomorphicLayoutEffect(() => {
            const sub = control._subscribe({
              formState: control._proxyFormState,
              callback: () => updateFormState({ ...control._formState }),
              reRenderRoot: !0,
            });
            return updateFormState((data) => ({ ...data, isReady: !0 })), (control._formState.isReady = !0), sub;
          }, [control]),
          react__WEBPACK_IMPORTED_MODULE_0__.useEffect(
            () => control._disableForm(props.disabled),
            [control, props.disabled],
          ),
          react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
            props.mode && (control._options.mode = props.mode),
              props.reValidateMode && (control._options.reValidateMode = props.reValidateMode),
              props.errors && !isEmptyObject(props.errors) && control._setErrors(props.errors);
          }, [control, props.errors, props.mode, props.reValidateMode]),
          react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
            props.shouldUnregister && control._subjects.state.next({ values: control._getWatch() });
          }, [control, props.shouldUnregister]),
          react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
            if (control._proxyFormState.isDirty) {
              const isDirty = control._getDirty();
              isDirty !== formState.isDirty && control._subjects.state.next({ isDirty });
            }
          }, [control, formState.isDirty]),
          react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
            props.values && !deepEqual(props.values, _values.current)
              ? (control._reset(props.values, control._options.resetOptions),
                (_values.current = props.values),
                updateFormState((state) => ({ ...state })))
              : control._resetDefaultValues();
          }, [control, props.values]),
          react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
            control._state.mount || (control._setValid(), (control._state.mount = !0)),
              control._state.watch &&
                ((control._state.watch = !1), control._subjects.state.next({ ...control._formState })),
              control._removeUnmounted();
          }),
          (_formControl.current.formState = getProxyFormState(formState, control)),
          _formControl.current
        );
      }
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
