import { delay, http, HttpResponse } from "msw";

// Helper functions for localStorage persistence
const STORAGE_KEY = "ski_shop_cart";

const getCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    // Silently handle localStorage errors
    return [];
  }
};

const saveCartToStorage = (cartItems: CartItem[]): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  } catch {
    // Silently handle localStorage errors
  }
};

// Initialize cart from localStorage
let cartItems: CartItem[] = getCartFromStorage();

// Sample products for cart operations
const sampleProducts: Product[] = [
  {
    id: "f509b52a-0178-4342-a241-0796987e01b2",
    name: "Tasty Plastic Towels",
    status: "published",
    category: "clothings",
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    discountPrice: 123,
    images: ["https://res.cloudinary.com/kingsleysolomon/image/upload/v1742989695/byte-alley/hwqfbog9bbrubto2v0te.svg"],
    price: 498,
    stockCount: 28,
    store: {
      id: "cfb0e5cb-0fd3-4384-815c-d41bd26486e8",
      name: "Morar, Kutch and Doyle",
    },
    user: {
      id: "206a1fc8-8f66-4c3a-8d90-f823d4286173",
      name: "Kayla Kutch",
    },
    createdAt: "2024-09-14T10:22:24.937Z",
    updateAt: "2025-07-20T17:56:10.525Z",
  },
  {
    id: "f509b52a-0178-4342-a241-0596989e01b2",
    name: "Premium Ski Jacket",
    status: "published",
    category: "clothings",
    description: "High-quality ski jacket perfect for winter sports",
    discountPrice: null,
    images: ["https://res.cloudinary.com/kingsleysolomon/image/upload/v1742989695/byte-alley/hwqfbog9bbrubto2v0te.svg"],
    price: 299,
    stockCount: 15,
    store: {
      id: "cfb0e5cb-0fd3-4384-815c-d41bd26486e8",
      name: "Ski Equipment Store",
    },
    user: {
      id: "206a1fc8-8f66-4c3a-8d90-f823d4286173",
      name: "John Doe",
    },
    createdAt: "2024-09-14T10:22:24.937Z",
    updateAt: "2025-07-20T17:56:10.525Z",
  },
  {
    id: "f509b52a-0178-4342-a241-0796989e01f2",
    name: "Ski Boots Pro",
    status: "published",
    category: "footwear",
    description: "Professional grade ski boots for advanced skiers",
    discountPrice: 89,
    images: ["https://res.cloudinary.com/kingsleysolomon/image/upload/v1742989695/byte-alley/hwqfbog9bbrubto2v0te.svg"],
    price: 199,
    stockCount: 8,
    store: {
      id: "cfb0e5cb-0fd3-4384-815c-d41bd26486e8",
      name: "Ski Equipment Store",
    },
    user: {
      id: "206a1fc8-8f66-4c3a-8d90-f823d4286173",
      name: "Jane Smith",
    },
    createdAt: "2024-09-14T10:22:24.937Z",
    updateAt: "2025-07-20T17:56:10.525Z",
  },
];

// Helper function to find product by ID
const findProductById = (productId: string): Product | undefined => {
  return sampleProducts.find((product) => product.id === productId);
};

// Helper function to create cart item from product
const createCartItem = (product: Product, quantity: number): CartItem => {
  return {
    id: `${product.id}-${Date.now()}`, // Generate unique cart item ID
    product,
    name: product.name,
    price: product.discountPrice || product.price,
    quantity,
    image: product.images[0],
  };
};

// Helper function to calculate cart total
const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const cartHandlers = [
  // Get cart
  http.get("/carts", async () => {
    await delay(150);

    return HttpResponse.json({
      success: true,
      data: {
        items: cartItems,
        metadata: {
          total: cartItems.length,
          totalAmount: calculateCartTotal(cartItems),
          itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        },
      },
    });
  }),

  // Get cart item by ID
  http.get("/carts/:id", async ({ params }) => {
    const { id } = params;
    await delay(150);

    const cartItem = cartItems.find((item) => item.id === id);

    if (cartItem) {
      return HttpResponse.json({
        success: true,
        data: cartItem,
      });
    }

    return HttpResponse.json(
      {
        success: false,
        message: "Cart item not found",
      },
      { status: 404 },
    );
  }),

  // Add item to cart
  http.post("/carts", async ({ request }) => {
    const body = (await request.json()) as { productId: string; quantity: number };
    const { productId, quantity } = body;

    await delay(150);

    if (!productId || !quantity) {
      return HttpResponse.json(
        {
          success: false,
          message: "Product ID and quantity are required",
        },
        { status: 400 },
      );
    }

    if (quantity < 1) {
      return HttpResponse.json(
        {
          success: false,
          message: "Quantity must be at least 1",
        },
        { status: 400 },
      );
    }

    // Check if product exists
    const product = findProductById(productId);
    if (!product) {
      return HttpResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 },
      );
    }

    // Check if product is already in cart
    const existingItemIndex = cartItems.findIndex((item) => item.product.id === productId);

    if (existingItemIndex === -1) {
      // Add new item to cart
      const newCartItem = createCartItem(product, quantity);
      cartItems.push(newCartItem);
    } else {
      // Update existing item quantity
      cartItems[existingItemIndex].quantity += quantity;
    }

    // Save to localStorage
    saveCartToStorage(cartItems);

    return HttpResponse.json(
      {
        success: true,
        data: {
          items: cartItems,
          metadata: {
            total: cartItems.length,
            totalAmount: calculateCartTotal(cartItems),
            itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
          },
        },
      },
      { status: 201 },
    );
  }),

  // Update cart item quantity
  http.patch("/carts/:id", async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as { quantity: number };
    const { quantity } = body;

    await delay(150);

    if (!quantity || quantity < 1) {
      return HttpResponse.json(
        {
          success: false,
          message: "Quantity must be at least 1",
        },
        { status: 400 },
      );
    }

    const itemIndex = cartItems.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return HttpResponse.json(
        {
          success: false,
          message: "Cart item not found",
        },
        { status: 404 },
      );
    }

    // Update quantity
    cartItems[itemIndex].quantity = quantity;

    // Save to localStorage
    saveCartToStorage(cartItems);

    return HttpResponse.json({
      success: true,
      data: {
        items: cartItems,
        metadata: {
          total: cartItems.length,
          totalAmount: calculateCartTotal(cartItems),
          itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        },
      },
    });
  }),

  // Remove item from cart
  http.delete("/carts/:id", async ({ params }) => {
    const { id } = params;
    await delay(150);

    const itemIndex = cartItems.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return HttpResponse.json(
        {
          success: false,
          message: "Cart item not found",
        },
        { status: 404 },
      );
    }

    // Remove item
    cartItems.splice(itemIndex, 1);

    // Save to localStorage
    saveCartToStorage(cartItems);

    return HttpResponse.json({
      success: true,
      data: {
        items: cartItems,
        metadata: {
          total: cartItems.length,
          totalAmount: calculateCartTotal(cartItems),
          itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        },
      },
    });
  }),

  // Checkout cart
  http.post("/carts/checkout", async ({ request }) => {
    const body = (await request.json()) as { paymentMethod: string };
    const { paymentMethod } = body;

    await delay(300);

    if (cartItems.length === 0) {
      return HttpResponse.json(
        {
          success: false,
          message: "Cart is empty",
        },
        { status: 400 },
      );
    }

    if (!paymentMethod) {
      return HttpResponse.json(
        {
          success: false,
          message: "Payment method is required",
        },
        { status: 400 },
      );
    }

    // Generate order ID
    const orderId = `order-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

    // Clear cart after successful checkout
    cartItems = [];
    saveCartToStorage(cartItems);

    return HttpResponse.json(
      {
        success: true,
        data: {
          orderId,
          status: "pending",
          paymentMethod,
          totalAmount: calculateCartTotal(cartItems),
          message: "Order placed successfully",
        },
      },
      { status: 201 },
    );
  }),
];
