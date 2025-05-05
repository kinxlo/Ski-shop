/*! For license information please see app-(external-pages)-(home)-_components-shop-card-Shopcard-stories.30a8e057.iframe.bundle.js.LICENSE.txt */
"use strict";
(self.webpackChunktsa_app = self.webpackChunktsa_app || []).push([
  [812],
  {
    "./src/app/(external-pages)/(home)/_components/shop-card/Shopcard.stories.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          WithSalesTag: () => WithSalesTag,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => Shopcard_stories,
        });
      var jsx_runtime = __webpack_require__(
          "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/dist/compiled/react/jsx-runtime.js",
        ),
        utils = __webpack_require__("./src/lib/utils.ts");
      const Star = (0,
      __webpack_require__(
        "./node_modules/.pnpm/lucide-react@0.503.0_react@19.1.0/node_modules/lucide-react/dist/esm/createLucideIcon.js",
      ).A)("star", [
        [
          "path",
          {
            d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
            key: "r04s7s",
          },
        ],
      ]);
      var next_image = __webpack_require__(
          "./node_modules/.pnpm/@storybook+nextjs@8.6.12_es_efd1545d91a71caf7c9c4fad0b344f57/node_modules/@storybook/nextjs/dist/images/next-image.mjs",
        ),
        next_link = __webpack_require__(
          "./node_modules/.pnpm/next@15.3.1_@babel+core@7.2_0935266f8bc21613be474333bb18d40a/node_modules/next/link.js",
        ),
        link_default = __webpack_require__.n(next_link);
      const ShopCard = ({ id, category, title, rating, price, oldPrice, image, className, isStarSeller = !0 }) =>
        (0, jsx_runtime.jsxs)(link_default(), {
          href: `/products/${id}`,
          className: (0, utils.cn)(
            "block rounded-lg border bg-no-repeat p-4",
            isStarSeller && "bg-[url('/images/star-seller.svg')]",
            className,
          ),
          children: [
            (0, jsx_runtime.jsx)("div", {
              className: "relative z-[-1] mb-3 aspect-square overflow-hidden rounded-lg",
              children: (0, jsx_runtime.jsx)(next_image.A, {
                src: image,
                alt: title,
                width: 400,
                height: 400,
                className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-110",
              }),
            }),
            (0, jsx_runtime.jsxs)("div", {
              className: "space-y-2",
              children: [
                (0, jsx_runtime.jsx)("p", { className: "text-sm text-gray-500 capitalize", children: category }),
                (0, jsx_runtime.jsx)("p", { className: "line-clamp-2 font-medium", children: title }),
                (0, jsx_runtime.jsx)("div", {
                  className: "flex gap-0.5",
                  children: Array.from({ length: 5 }).map((_, index) =>
                    (0, jsx_runtime.jsx)(
                      Star,
                      {
                        size: 14,
                        className: "" + (index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"),
                      },
                      index,
                    ),
                  ),
                }),
                (0, jsx_runtime.jsx)("p", { className: "text-mid-grey-II text-sm underline", children: "By Skicom" }),
                (0, jsx_runtime.jsxs)("div", {
                  className: "flex items-baseline gap-2",
                  children: [
                    (0, jsx_runtime.jsxs)("p", {
                      className: "text-primary text-sm font-medium lg:text-[16px]",
                      children: ["₦", price.toLocaleString()],
                    }),
                    oldPrice &&
                      (0, jsx_runtime.jsxs)("p", {
                        className: "text-xs text-gray-500 line-through lg:text-sm",
                        children: ["₦", oldPrice.toLocaleString()],
                      }),
                  ],
                }),
              ],
            }),
          ],
        });
      try {
        (ShopCard.displayName = "ShopCard"),
          (ShopCard.__docgenInfo = {
            description: "",
            displayName: "ShopCard",
            props: {
              id: {
                defaultValue: null,
                description: "",
                name: "id",
                required: !0,
                type: { name: "string | undefined" },
              },
              category: {
                defaultValue: null,
                description: "",
                name: "category",
                required: !0,
                type: { name: "string" },
              },
              title: { defaultValue: null, description: "", name: "title", required: !0, type: { name: "string" } },
              rating: { defaultValue: null, description: "", name: "rating", required: !0, type: { name: "number" } },
              price: { defaultValue: null, description: "", name: "price", required: !0, type: { name: "number" } },
              oldPrice: {
                defaultValue: null,
                description: "",
                name: "oldPrice",
                required: !1,
                type: { name: "number" },
              },
              image: { defaultValue: null, description: "", name: "image", required: !0, type: { name: "string" } },
              isStarSeller: {
                defaultValue: { value: "true" },
                description: "",
                name: "isStarSeller",
                required: !1,
                type: { name: "boolean" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES["src/app/(external-pages)/(home)/_components/shop-card/shop-card.tsx#ShopCard"] = {
              docgenInfo: ShopCard.__docgenInfo,
              name: "ShopCard",
              path: "src/app/(external-pages)/(home)/_components/shop-card/shop-card.tsx#ShopCard",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      const Shopcard_stories = { title: "Molecules/Shop Card", component: ShopCard },
        Default = {
          args: {
            id: "1",
            category: "gaming",
            title: "Sony PlayStation VR2 Headset, 110° FOV, 4K HDR Display",
            rating: 5,
            price: 55e3,
            oldPrice: 8e5,
            image: "/images/shop/hero.svg",
            isStarSeller: !1,
            className: "max-w-[300px]",
          },
        },
        WithSalesTag = {
          args: {
            id: "1",
            category: "gaming",
            title: "Sony PlayStation VR2 Headset, 110° FOV, 4K HDR Display",
            rating: 2,
            price: 55e3,
            oldPrice: 8e5,
            image: "/images/shop/hero.svg",
            isStarSeller: !0,
            className: "max-w-[300px]",
          },
        },
        __namedExportsOrder = ["Default", "WithSalesTag"];
      (Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              '{\n  args: {\n    id: "1",\n    category: "gaming",\n    title: "Sony PlayStation VR2 Headset, 110° FOV, 4K HDR Display",\n    rating: 5,\n    price: 55_000,\n    oldPrice: 800_000,\n    image: "/images/shop/hero.svg",\n    isStarSeller: false,\n    className: "max-w-[300px]"\n  }\n}',
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (WithSalesTag.parameters = {
          ...WithSalesTag.parameters,
          docs: {
            ...WithSalesTag.parameters?.docs,
            source: {
              originalSource:
                '{\n  args: {\n    id: "1",\n    category: "gaming",\n    title: "Sony PlayStation VR2 Headset, 110° FOV, 4K HDR Display",\n    rating: 2,\n    price: 55_000,\n    oldPrice: 800_000,\n    image: "/images/shop/hero.svg",\n    isStarSeller: true,\n    className: "max-w-[300px]"\n  }\n}',
              ...WithSalesTag.parameters?.docs?.source,
            },
          },
        });
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
