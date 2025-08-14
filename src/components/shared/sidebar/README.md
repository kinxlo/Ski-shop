# Enhanced DashboardSidebar Component

A highly customizable and robust sidebar component with collapsible menus, submenus, and state persistence.

## Features

- ✅ **Collapsible Menu Items**: Support for expandable/collapsible parent items
- ✅ **Nested Submenus**: Multiple levels of navigation hierarchy
- ✅ **Active State Management**: Smart active state detection for parent and child items
- ✅ **State Persistence**: Optional localStorage persistence for expanded states
- ✅ **Auto-Expansion**: Automatically expand parent items when child is active
- ✅ **Badge Support**: Multiple badge variants (danger, success, warning, info)
- ✅ **Responsive Design**: Works on mobile and desktop
- ✅ **TypeScript Support**: Full type safety with proper interfaces
- ✅ **Customizable Styling**: Maintains existing look and feel while being extensible
- ✅ **Utility Functions**: Helper functions for easy navigation item creation

## Basic Usage

```tsx
import { createNavItem, createNavItemWithChildren, DashboardSidebar } from "@/components/shared/sidebar";
import { TbHome, TbShoppingCart, TbUsers } from "react-icons/tb";

const navItems = [
  createNavItem("dashboard", "Dashboard", "/dashboard", { icon: TbHome }),
  createNavItem("orders", "Orders", "/orders", { icon: TbShoppingCart }),
  createNavItem("users", "Users", "/users", { icon: TbUsers }),
];

function MySidebar() {
  return <DashboardSidebar navItems={navItems} />;
}
```

## Advanced Usage with Nested Items

```tsx
import {
  createDivider,
  createNavItem,
  createNavItemWithChildren,
  dangerBadge,
  DashboardSidebar,
  successBadge,
} from "@/components/shared/sidebar";

const navItems = [
  createNavItem("dashboard", "Dashboard", "/dashboard", { icon: TbHome }),

  createDivider("divider-1"),

  createNavItemWithChildren(
    "ecommerce",
    "E-commerce",
    "/dashboard/ecommerce",
    [
      createNavItem("orders", "Orders", "/dashboard/orders", {
        icon: TbShoppingCart,
        badge: dangerBadge(12),
      }),
      createNavItem("products", "Products", "/dashboard/products", {
        icon: TbShoppingCart,
      }),
    ],
    { icon: TbShoppingCart },
  ),
];

function AdvancedSidebar() {
  return (
    <DashboardSidebar
      navItems={navItems}
      defaultExpandedItems={["ecommerce"]}
      autoExpandOnActiveChild={true}
      persistExpandedState={true}
      logoProperties={{ width: 120, height: 60 }}
    />
  );
}
```

## Props

### DashboardSidebarProperties

| Prop                      | Type        | Default                     | Description                             |
| ------------------------- | ----------- | --------------------------- | --------------------------------------- |
| `navItems`                | `NavItem[]` | **required**                | Array of navigation items               |
| `className`               | `string`    | `undefined`                 | Additional CSS classes                  |
| `logoProperties`          | `LogoProps` | `{ width: 80, height: 47 }` | Logo configuration                      |
| `defaultExpandedItems`    | `string[]`  | `[]`                        | Items to expand by default              |
| `autoExpandOnActiveChild` | `boolean`   | `true`                      | Auto-expand parent when child is active |
| `persistExpandedState`    | `boolean`   | `false`                     | Save expanded state to localStorage     |

### LogoProps

| Prop        | Type     | Description                     |
| ----------- | -------- | ------------------------------- |
| `width`     | `number` | Logo width                      |
| `height`    | `number` | Logo height                     |
| `className` | `string` | Additional CSS classes for logo |

## Navigation Item Types

### NavItem

```typescript
type NavItem = NavItemWithChildren | NavItemWithoutChildren;
```

### NavItemWithoutChildren (Simple Item)

```typescript
interface NavItemWithoutChildren {
  id: string; // Unique identifier
  route: string; // Display name
  link: string; // Navigation URL
  icon?: React.ComponentType; // Icon component
  badge?: BadgeConfig; // Optional badge
  divider?: boolean; // Whether this is a divider
  collapsible?: false; // Not collapsible
}
```

### NavItemWithChildren (Parent Item)

```typescript
interface NavItemWithChildren {
  id: string; // Unique identifier
  route: string; // Display name
  link: string; // Navigation URL (for parent)
  children: NavItem[]; // Child navigation items
  icon?: React.ComponentType; // Icon component
  badge?: BadgeConfig; // Optional badge
  collapsible: true; // Always collapsible
}
```

### BadgeConfig

```typescript
interface BadgeConfig {
  variant: "danger" | "success" | "warning" | "info";
  count: number;
}
```

## Utility Functions

### Creating Navigation Items

```typescript
// Simple navigation item
const dashboardItem = createNavItem(
  "dashboard", // id
  "Dashboard", // route name
  "/dashboard", // link
  { icon: TbHome }, // options
);

// Parent item with children
const ecommerceItem = createNavItemWithChildren(
  "ecommerce", // id
  "E-commerce", // route name
  "/ecommerce", // link
  [
    // children
    createNavItem("orders", "Orders", "/orders", { icon: TbShoppingCart }),
    createNavItem("products", "Products", "/products", { icon: TbBox }),
  ],
  { icon: TbShoppingCart }, // options
);

// Divider
const divider = createDivider("my-divider");
```

### Creating Badges

```typescript
import { dangerBadge, infoBadge, successBadge, warningBadge } from "@/components/shared/sidebar";

const orderItem = createNavItem("orders", "Orders", "/orders", {
  icon: TbShoppingCart,
  badge: dangerBadge(5), // Red badge with count 5
});
```

## Examples

### Role-Based Navigation

```typescript
function getRoleBasedNavigation(userRole: "admin" | "vendor" | "user") {
  const commonItems = [createNavItem("dashboard", "Dashboard", "/dashboard", { icon: TbHome })];

  switch (userRole) {
    case "admin":
      return [
        ...commonItems,
        createNavItemWithChildren(
          "management",
          "Management",
          "/admin",
          [
            createNavItem("users", "Users", "/admin/users", { icon: TbUsers }),
            createNavItem("orders", "Orders", "/admin/orders", { icon: TbShoppingCart }),
          ],
          { icon: TbSettings },
        ),
      ];

    case "vendor":
      return [
        ...commonItems,
        createNavItem("orders", "My Orders", "/vendor/orders", {
          icon: TbShoppingCart,
          badge: dangerBadge(3),
        }),
        createNavItem("products", "My Products", "/vendor/products", { icon: TbBox }),
      ];

    default:
      return [...commonItems, createNavItem("profile", "Profile", "/profile", { icon: TbUser })];
  }
}
```

### Dynamic Badge Updates

```typescript
function NavigationWithDynamicBadges() {
  const [orderCount, setOrderCount] = useState(0);

  const navItems = useMemo(() => [
    createNavItem("dashboard", "Dashboard", "/dashboard", { icon: TbHome }),
    createNavItem("orders", "Orders", "/orders", {
      icon: TbShoppingCart,
      badge: orderCount > 0 ? dangerBadge(orderCount) : undefined
    }),
  ], [orderCount]);

  return <DashboardSidebar navItems={navItems} />;
}
```

## Styling Customization

The sidebar maintains your existing styling while providing new functionality. You can customize it further:

```typescript
<DashboardSidebar
  navItems={navItems}
  className="custom-sidebar-styles"
  logoProperties={{
    width: 100,
    height: 50,
    className: "custom-logo-styles"
  }}
/>
```

## Migration from Old Sidebar

1. **Update Props**: Change `logoProps` to `logoProperties` if you were using it
2. **Add Types**: Import the new types for better TypeScript support
3. **Use Utilities**: Replace manual object creation with utility functions
4. **Enable Features**: Add `autoExpandOnActiveChild` and `persistExpandedState` as needed

```typescript
// Old way
const navItems = [
  {
    id: "dashboard",
    route: "Dashboard",
    link: "/dashboard",
    icon: TbHome,
  },
];

// New way
const navItems = [createNavItem("dashboard", "Dashboard", "/dashboard", { icon: TbHome })];
```

## Best Practices

1. **Use Utility Functions**: Always use `createNavItem` and `createNavItemWithChildren` for consistency
2. **Unique IDs**: Ensure all navigation item IDs are unique across the entire navigation tree
3. **Icon Consistency**: Use the same icon library throughout your navigation
4. **Badge Management**: Keep badge counts updated and hide badges when count is 0
5. **State Persistence**: Only enable `persistExpandedState` when needed to avoid localStorage clutter
6. **Responsive Design**: Test your navigation on both mobile and desktop devices

## Troubleshooting

### Common Issues

1. **Items not expanding**: Check that `collapsible: true` is set for parent items
2. **Active states not working**: Ensure your route IDs match the patterns in your URLs
3. **Persistence not working**: Check that localStorage is available and not blocked
4. **Icons not showing**: Verify icon imports and that they're React components

### Debug Mode

You can add console logging to debug navigation states:

```typescript
const navItems = [createNavItem("dashboard", "Dashboard", "/dashboard", { icon: TbHome })];

// Add this to debug
console.log("Navigation items:", navItems);
```

## Contributing

When extending this component:

1. Maintain backward compatibility
2. Add proper TypeScript types
3. Update documentation
4. Follow the existing styling patterns
5. Add utility functions for common use cases
