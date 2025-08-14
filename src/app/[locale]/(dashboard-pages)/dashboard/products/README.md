# Product Management Pages

This directory contains the product management pages for the dashboard.

## Pages

### `/products` - All Products List

- Displays a table of all products with search and pagination
- **Click anywhere on a table row** to navigate to product detail page
- Uses `all-products.tsx` component

### `/products/[id]` - Product Detail Page

- Responsive product detail page based on mobile design
- Features:
  - Product images with thumbnails
  - Product information (name, category, description)
  - Specifications list
  - Pricing with discount support
  - Stock information
  - Action buttons (Promote, Unpublish, Edit, Delete, Mark Out of Stock)
  - Product metadata (store, user, dates)

## Components

### `_components/promote-product-modal.tsx`

- Modal for promoting products
- Features:
  - Promotion type selection
  - Price input
  - Warning message for basic vendors
  - Promotion details summary

### `_components/product-actions-dropdown.tsx`

- Dropdown menu for product actions
- Actions: Edit, Promote, Unpublish, Mark Out of Stock, Delete
- Styled with appropriate colors for each action

### `[id]/loading.tsx`

- Loading skeleton for product detail page
- Matches the layout of the actual page

## Features

### Responsive Design

- Mobile-first design that scales to desktop
- Grid layout that adapts to screen size
- Sticky header with navigation

### Product Actions

- **Promote Product**: Opens modal to select promotion type and price
- **Unpublish Product**: Removes product from public view
- **Edit Product**: Navigate to edit page (to be implemented)
- **Delete Product**: Remove product permanently
- **Mark Out of Stock**: Update stock status

### Image Gallery

- Main product image with Star Seller badge
- **Star Seller Banner**: Background image banner for star seller products
- Thumbnail images for additional views
- Fallback for missing images

### Product Information

- Complete product details display
- Formatted currency and dates
- Status indicators with appropriate styling
- Store and user information
- **Star Seller Detection**: Automatically detects and displays star seller status based on store name

### Table Row Click Navigation

- **Desktop**: Click anywhere on a table row to navigate to product details
- **Mobile**: Tap anywhere on a product card to navigate to product details
- Hover effects indicate clickable rows
- Works across all product list pages (All Products, Published, Unpublished, Out of Stock)

## Navigation

From the products list page, users can:

1. **Click anywhere on a table row** to view product details
2. Use the back button to return to the list
3. Access product actions via the dropdown menu

## Data Structure

The product detail page expects a product object with the following structure:

```typescript
{
  id: string;
  name: string;
  status: string;
  category: string;
  description: string;
  discountPrice?: number;
  images: string[];
  price: number;
  stockCount: number;
  store: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    name: string;
  };
  createdAt: string;
  updateAt?: string;
}
```

## Integration

The page integrates with:

- `useAppService` for fetching product data
- `formatCurrency` and `formatDate` utilities for formatting
- `BlurImage` component for optimized image loading
- `SkiButton` component for consistent button styling
- `EmptyState` component for error handling
