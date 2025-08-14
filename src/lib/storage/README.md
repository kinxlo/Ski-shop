# Data Persistence Options for Saved Products

This document explains the different ways to persist saved products data in your Ski Shop application.

## Overview

There are three main approaches for persisting saved products data:

1. **localStorage** - Simple client-side storage (Recommended for most use cases)
2. **IndexedDB** - Advanced client-side storage for larger datasets
3. **Cookies** - Server-side accessible storage with size limitations

## 1. localStorage (Recommended)

### Features:

- ✅ Simple to implement
- ✅ Works offline
- ✅ No size limitations (within browser limits)
- ✅ Fast access
- ❌ Client-side only
- ❌ Data lost when user clears browser data

### Usage:

```tsx
import { SaveProductButton } from "@/components/shared/save-product-button";
import { useSaveProductEnhanced } from "@/hooks/use-save-product-enhanced";

// In your component
const MyComponent = ({ product }) => {
  const { isSaved, toggleSave, savedProductsCount } = useSaveProductEnhanced(product.id, product);

  return (
    <div>
      <SaveProductButton productId={product.id} product={product} />
      <p>Saved products: {savedProductsCount}</p>
    </div>
  );
};
```

### Implementation:

- **Hook**: `src/hooks/use-save-product-enhanced.ts`
- **Storage Hook**: `src/hooks/use-saved-products-storage.ts`
- **Mock Handler**: Updated `src/mocks/handlers/products.ts`

## 2. IndexedDB

### Features:

- ✅ Large storage capacity
- ✅ Complex data structures
- ✅ Works offline
- ✅ Fast queries
- ❌ More complex implementation
- ❌ Client-side only

### Usage:

```tsx
import { indexedDBStorage } from "@/lib/storage/indexed-database";

// Add a product
await indexedDBStorage.addProduct(product);

// Remove a product
await indexedDBStorage.removeProduct(productId);

// Get all saved products
const products = await indexedDBStorage.getProducts();

// Check if product is saved
const isSaved = await indexedDBStorage.isProductSaved(productId);
```

## 3. Cookies

### Features:

- ✅ Server-side accessible
- ✅ Works with SSR
- ✅ Sent with every request
- ❌ Size limitations (4KB)
- ❌ Sent with every request (performance impact)

### Usage:

```tsx
import { CookieStorage } from "@/lib/storage/cookie-storage";

// Client-side
CookieStorage.addSavedProduct(productId);
CookieStorage.removeSavedProduct(productId);
const isSaved = CookieStorage.isProductSaved(productId);

// Server-side (in Server Components or API routes)
const savedProductIds = await CookieStorage.getSavedProductsServer();
```

## Recommended Implementation

For most use cases, we recommend using the **localStorage approach** with the enhanced hook:

### 1. Update your existing components:

```tsx
// Before
import { useSaveProduct } from "@/hooks/use-save-product";
// After
import { useSaveProductEnhanced } from "@/hooks/use-save-product-enhanced";
```

### 2. Use the SaveProductButton component:

```tsx
import { SaveProductButton } from "@/components/shared/save-product-button";

<SaveProductButton productId={product.id} product={product} size="sm" variant="ghost" />;
```

### 3. For saved products page:

```tsx
import { useSavedProductsStorage } from "@/hooks/use-saved-products-storage";

const SavedProductsPage = () => {
  const { savedProducts, isLoaded, clearSavedProducts } = useSavedProductsStorage();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Saved Products ({savedProducts.length})</h1>
      {savedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <button onClick={clearSavedProducts}>Clear All</button>
    </div>
  );
};
```

## Migration Guide

If you're currently using the basic `useSaveProduct` hook:

1. **Replace the hook import**:

   ```tsx
   // Old
   import { useSaveProduct } from "@/hooks/use-save-product";
   // New
   import { useSaveProductEnhanced } from "@/hooks/use-save-product-enhanced";
   ```

2. **Update the hook usage**:

   ```tsx
   // Old
   const { isSaved, toggleSave } = useSaveProduct(productId);

   // New
   const { isSaved, toggleSave, savedProductsCount } = useSaveProductEnhanced(productId, product);
   ```

3. **The API calls will still work** - the enhanced hook maintains backward compatibility with your existing API endpoints.

## Benefits of the Enhanced Approach

1. **Immediate UI Updates**: Changes are reflected instantly using localStorage
2. **Offline Support**: Works even when the network is down
3. **Better UX**: No loading states for saved/unsaved status
4. **API Sync**: Automatically syncs with your backend when online
5. **Persistence**: Data survives page refreshes and browser sessions

## Troubleshooting

### localStorage not working:

- Check if the browser supports localStorage
- Ensure you're not in an incognito/private browsing mode
- Check browser storage settings

### Data not persisting:

- Verify the storage key is consistent
- Check for JavaScript errors in the console
- Ensure the component is client-side rendered

### API sync issues:

- Check network connectivity
- Verify API endpoints are working
- Check browser console for errors
