# Type Definitions Organization

This directory contains all global TypeScript type definitions for the Ski Shop application, organized by category for better maintainability and discoverability.

## File Structure

```
src/types/
├── index.d.ts          # Main entry point that imports all type files
├── core.d.ts           # Core types and utilities
├── auth.d.ts           # Authentication types
├── business.d.ts       # Business domain types
├── forms.d.ts          # Form data types
├── components.d.ts     # Component prop interfaces
├── legacy.d.ts         # Legacy types for backward compatibility
└── README.md           # This documentation file
```

## Type Categories

### Core Types (`core.d.ts`)

- Generic data structures (`DataItem`, `ApiResponse`, etc.)
- HTTP and API types (`HttpResponse`, `QueryParameters`, etc.)
- Pagination types (`PaginationMetadata`, `PaginationLink`, etc.)
- Dependency injection types (`DependencyContainer`, etc.)
- Filter and query types (`Filters`)
- Update and mutation types (`UpdateUserProfile`)

### Authentication Types (`auth.d.ts`)

- User authentication entities (`AuthUser`, `AuthTokens`, etc.)
- NextAuth extensions (`NextAuthUser`, `NextAuthSession`, `NextAuthJWT`)
- Authentication response types (`AuthResponseData`, `UserResponse`)

### Business Domain Types (`business.d.ts`)

- Core business entities (`Product`, `Store`, `UserProfile`, etc.)
- Order and cart types (`Order`, `CartItem`, `OrderStatus`, etc.)
- API response types for business entities
- Supporting types (`Address`, `Location`, `Country`, etc.)

### Form Data Types (`forms.d.ts`)

- All form data interfaces derived from Zod schemas
- Authentication forms (`LoginFormData`, `RegisterFormData`, etc.)
- Business forms (`ProductFormData`, `StoreFormData`, etc.)
- User profile forms (`ProfileFormData`, `PasswordFormData`, etc.)

### Component Prop Interfaces (`components.d.ts`)

- UI component properties (`ButtonProperties`, `InputProperties`, etc.)
- Layout component props (`NavbarProperties`, `ModalProperties`, etc.)
- Business component props (`ProductCardProperties`, `OrderCardProperties`, etc.)
- Context and provider props (`LoadingContextProperties`, etc.)

### Legacy Types (`legacy.d.ts`)

- Deprecated interfaces for backward compatibility
- All prefixed with `I` (e.g., `IColumnDefinition`, `IOrder`, etc.)
- These should be gradually replaced with the new type names

## Usage

All types are globally available throughout the application. No imports are needed:

```typescript
// ✅ Correct - types are globally available
const product: Product = {
  id: "1",
  name: "Ski Equipment",
  // ... other properties
};

// ❌ Not needed - types are global
// import { Product } from '@/types';
```

## Migration from Local Types

The following files had their local type definitions moved to the global types:

- `src/schemas/index.ts` - Form data types
- `src/services/auth/auth.service.ts` - Authentication types
- `src/services/dashboard/vendor/orders/order.service.ts` - Order types
- `src/lib/next-auth/auth.ts` - NextAuth extensions
- `src/lib/tools/dependencies.ts` - Dependency injection types
- `src/lib/http/http-adapter.ts` - HTTP types
- `src/hooks/use-countries.ts` - Country types
- `src/hooks/use-breadcrumbs.tsx` - Breadcrumb types
- `src/components/shared/button/index.tsx` - Button props

## Benefits

1. **No Imports Required**: All types are globally available
2. **Better Organization**: Types are categorized by purpose
3. **Reduced Duplication**: Common types are defined once
4. **Easier Maintenance**: Related types are grouped together
5. **Backward Compatibility**: Legacy types are preserved
6. **Type Safety**: Improved TypeScript support across the application

## Adding New Types

When adding new types:

1. **Choose the appropriate category file** based on the type's purpose
2. **Add the type definition** within the `declare global` block
3. **Include JSDoc comments** for better documentation
4. **Consider backward compatibility** if replacing existing types

Example:

```typescript
// In business.d.ts
declare global {
  /** New business entity */
  interface NewEntity {
    id: string;
    name: string;
    // ... other properties
  }
}
```

## Best Practices

1. **Use descriptive names** for types and interfaces
2. **Include JSDoc comments** for complex types
3. **Group related types** together
4. **Use consistent naming conventions**
5. **Mark deprecated types** with `@deprecated` comments
6. **Keep types focused** on a single responsibility
