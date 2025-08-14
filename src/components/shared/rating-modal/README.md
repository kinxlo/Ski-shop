# Rating Modal Component

A reusable rating modal component that allows users to rate products and write reviews. The component includes both the rating form and a success confirmation modal.

## Features

- ⭐ Interactive star rating system (1-5 stars)
- 📝 Optional review text input
- ✅ Success confirmation modal
- 🎨 Responsive design
- 🔄 Auto-reset functionality

## Usage

```tsx
import SkiButton from "@/components/shared/button";
import { RatingModal } from "@/components/shared/rating-modal";

const MyComponent = () => {
  const handleRatingSubmit = (rating: number, review: string) => {
    // Handle the rating submission
    console.log("Rating:", rating, "Review:", review);
  };

  return (
    <RatingModal
      product={{
        id: "1",
        name: "Product Name",
        images: ["/path/to/image.jpg"],
        description: "Product description",
      }}
      onRatingSubmit={handleRatingSubmit}
      triggerStructure={
        <SkiButton variant="primary" size="lg">
          Rate Product
        </SkiButton>
      }
    />
  );
};
```

## Props

| Prop               | Type                                       | Required | Description                                 |
| ------------------ | ------------------------------------------ | -------- | ------------------------------------------- |
| `product`          | `Product`                                  | Yes      | Product information to display in the modal |
| `onRatingSubmit`   | `(rating: number, review: string) => void` | No       | Callback function when rating is submitted  |
| `triggerStructure` | `ReactNode`                                | Yes      | The element that triggers the modal         |

### Product Interface

```tsx
interface Product {
  id: string;
  name: string;
  images: string[];
  description?: string;
}
```

## Design

The component follows the design from the provided screenshot:

1. **Rating Modal**: Shows product details, star rating interface, and review input
2. **Success Modal**: Displays confirmation message with checkmark icon

## Styling

The component uses Tailwind CSS classes and integrates with the existing design system:

- Uses the existing `Modal` component from the admin dashboard
- Integrates with `SkiButton` component
- Follows the color scheme and spacing patterns

## Accessibility

- Keyboard navigation support for star rating
- Proper ARIA labels and roles
- Focus management
- Screen reader friendly

## Examples

See the Storybook stories in `RatingModal.stories.tsx` for more usage examples.
