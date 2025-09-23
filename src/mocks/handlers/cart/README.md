# Cart Mock System

This directory contains the Mock Service Worker (MSW) implementation for cart functionality in the Ski Shop application.

## Overview

The cart mock system provides a complete cart workflow with localStorage persistence, similar to the save items mock. It includes:

- **Cart Handlers**: MSW handlers for all cart API endpoints
- **Cart Storage Hook**: React hook for localStorage management
- **Enhanced Cart Hook**: Combined API and localStorage functionality
- **Cart Button Component**: Example component demonstrating usage

## Features

- ✅ localStorage persistence
- ✅ Optimistic updates
- ✅ Real-time cart state management
- ✅ Error handling with toast notifications
- ✅ Loading states
- ✅ Cart totals calculation
- ✅ Checkout functionality

## File Structure

```
src/mocks/handlers/cart/
├── cart.ts                    # MSW handlers for cart endpoints
├── use-cart-storage.ts        # localStorage management hook
├── use-cart-enhanced.ts       # Enhanced cart hook (API + localStorage)
├── cart-button.tsx           # Example cart button component
└── README.md                 # This documentation
```

## Usage

### 1. Basic Cart Button

```tsx
import { CartButton } from "@/mocks/handlers/cart/cart-button";

function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <CartButton productId={product.id} product={product} quantity={1} />
    </div>
  );
}
```

### 2. Using the Enhanced Cart Hook

```tsx
import { useCartEnhanced } from "@/mocks/handlers/cart/use-cart-enhanced";

function ProductPage({ product }: { product: Product }) {
  const { isInCart, quantity, cartTotals, isAddingToCart, addToCart, removeFromCart, toggleCart, checkoutCart } =
    useCartEnhanced(product.id, product);

  return (
    <div>
      <h1>{product.name}</h1>

      {/* Add/Remove from cart */}
      <button onClick={() => toggleCart(1)} disabled={isAddingToCart}>
        {isInCart ? "Remove from Cart" : "Add to Cart"}
      </button>

      {/* Cart info */}
      {isInCart && (
        <div>
          <p>Quantity in cart: {quantity}</p>
          <button onClick={() => removeFromCart()}>Remove</button>
        </div>
      )}

      {/* Cart totals */}
      <div>
        <p>Total items: {cartTotals.totalItems}</p>
        <p>Total amount: ${cartTotals.totalAmount}</p>
      </div>

      {/* Checkout */}
      <button onClick={() => checkoutCart("paystack")}>Checkout</button>
    </div>
  );
}
```

### 3. Using Cart Storage Hook Directly

```tsx
import { useCartStorage } from "@/mocks/handlers/cart/use-cart-storage";

function CartManager() {
  const { cartItems, isLoaded, addToCart, updateCartItemQuantity, removeFromCart, clearCart, cartTotals } =
    useCartStorage();

  if (!isLoaded) {
    return <div>Loading cart...</div>;
  }

  return (
    <div>
      {cartItems.map((item) => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.price}</p>

          <button onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}>+</button>
          <button onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}>-</button>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}

      <div>
        <p>Total: ${cartTotals().totalAmount}</p>
        <button onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  );
}
```

## API Endpoints

The cart mock handles the following endpoints:

- `GET /carts` - Get cart items
- `GET /carts/:id` - Get specific cart item
- `POST /carts` - Add item to cart
- `PATCH /carts/:id` - Update cart item quantity
- `DELETE /carts/:id` - Remove item from cart
- `POST /carts/checkout` - Checkout cart

## localStorage Structure

Cart data is stored in localStorage under the key `"ski_shop_cart"`:

```json
[
  {
    "id": "product-id-timestamp",
    "product": {
      "id": "product-id",
      "name": "Product Name",
      "price": 100,
      "images": ["image-url"]
      // ... other product properties
    },
    "name": "Product Name",
    "price": 100,
    "quantity": 2,
    "image": "image-url"
  }
]
```

## Error Handling

The cart system includes comprehensive error handling:

- **Network errors**: Toast notifications for API failures
- **Validation errors**: Proper HTTP status codes and error messages
- **localStorage errors**: Graceful fallback when storage is unavailable
- **Optimistic updates**: Automatic rollback on API failures

## Loading States

All cart operations provide loading states:

- `isAddingToCart` - When adding items to cart
- `isUpdatingCart` - When updating cart item quantities
- `isRemovingFromCart` - When removing items from cart
- `isCheckingOut` - When processing checkout

## Best Practices

1. **Use the Enhanced Hook**: For most use cases, use `useCartEnhanced` as it provides the best user experience with optimistic updates.

2. **Handle Loading States**: Always show loading indicators during cart operations.

3. **Error Handling**: Implement proper error handling with user-friendly messages.

4. **Persistence**: The system automatically persists cart data to localStorage, so no additional setup is required.

5. **Checkout Flow**: Use the `checkoutCart` function to process orders and clear the cart.

## Integration with Existing Code

The cart mock system is designed to work seamlessly with the existing app service:

```tsx
// This will work with both real API and mock
const { useGetCart, useAddToCart } = useAppService();
```

When mocks are enabled, the cart operations will use the mock handlers. When disabled, they will use the real API endpoints.
