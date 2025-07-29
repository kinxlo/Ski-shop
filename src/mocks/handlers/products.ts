import { delay, http, HttpResponse } from "msw";

// In-memory storage for saved products
let savedProducts: string[] = [];

const products: ProductApiResponse = {
  success: true,
  data: {
    items: [
      {
        id: "f509b52a-0178-4342-a241-0796987e01b2",
        name: "Tasty Plastic Towels",
        status: "draft",
        category: "clothings",
        description:
          "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
        discountPrice: 123,
        images: [
          "https://res.cloudinary.com/kingsleysolomon/image/upload/v1742989695/byte-alley/hwqfbog9bbrubto2v0te.svg",
        ],
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
        name: "Tasty Plastic Towels",
        status: "draft",
        category: "clothings",
        description:
          "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
        discountPrice: null,
        images: [
          "https://res.cloudinary.com/kingsleysolomon/image/upload/v1742989695/byte-alley/hwqfbog9bbrubto2v0te.svg",
        ],
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
        id: "f509b52a-0178-4342-a241-0796989e01f2",
        name: "Tasty Plastic Towels",
        status: "draft",
        category: "clothings",
        description:
          "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
        discountPrice: null,
        images: [
          "https://res.cloudinary.com/kingsleysolomon/image/upload/v1742989695/byte-alley/hwqfbog9bbrubto2v0te.svg",
        ],
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
        id: "f509b52a-0178-4342-a241-0796989e01b4",
        name: "Tasty Plastic Towels",
        status: "draft",
        category: "clothings",
        description:
          "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
        discountPrice: null,
        images: [
          "https://res.cloudinary.com/kingsleysolomon/image/upload/v1742989695/byte-alley/hwqfbog9bbrubto2v0te.svg",
        ],
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
      // ... include all the other products from your JSON
    ],
    metadata: {
      total: 16,
      page: 1,
      limit: 10,
      totalPages: 2,
      hasNextPage: true,
      hasPreviousPage: false,
    },
  },
};

export const productHandlers = [
  // Get all products
  http.get(`/products`, async ({ request }) => {
    const url = new URL(request.url);
    url.searchParams.get("page") || "1";

    await delay(150); // optional delay to simulate network latency
    return HttpResponse.json(products, { status: 200 });
  }),

  // Get single product
  http.get(
    "/products/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})",
    async ({ params }) => {
      const { id } = params;
      const product = products.data.items.find((item) => item.id === id);
      await delay(150);
      if (product) {
        return HttpResponse.json(
          {
            success: true,
            data: product,
          },
          { status: 200 },
        );
      }

      return HttpResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 },
      );
    },
  ),

  // Get all product categories
  http.get(`/products/categories`, async () => {
    await delay(150);
    return HttpResponse.json({
      success: true,
      data: [
        "clothings",
        "gadgets",
        "watchesAndAccessories",
        "footwear",
        "electronics",
        "books",
        "gaming",
        "sportsAndOutdoors",
      ],
    });
  }),

  // Get saved products
  http.get(`/products/saves`, async () => {
    await delay(150);
    return HttpResponse.json({
      success: true,
      data: {
        items: products.data.items.filter((product) => savedProducts.includes(product.id)),
        metadata: {
          total: savedProducts.length,
          page: 1,
          limit: 10,
          totalPages: Math.ceil(savedProducts.length / 10),
          hasNextPage: false,
          hasPreviousPage: false,
        },
      },
    });
  }),

  // Save product to favorites/wishlist
  http.post(`/products/saves`, async ({ request }) => {
    const body = (await request.json()) as { productId: string };
    const { productId } = body;

    await delay(150);

    if (!productId) {
      return HttpResponse.json(
        {
          success: false,
          message: "Product ID is required",
        },
        { status: 400 },
      );
    }

    // Check if product exists
    const product = products.data.items.find((item) => item.id === productId);
    if (!product) {
      return HttpResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 },
      );
    }

    // Add to saved products if not already saved
    if (savedProducts.includes(productId)) {
      // Product already saved, return success
      return HttpResponse.json(
        {
          success: true,
          data: {
            id: productId,
            savedAt: new Date().toISOString(),
            message: "Product already saved",
          },
        },
        { status: 200 },
      );
    }

    // Add to saved products
    savedProducts.push(productId);

    return HttpResponse.json(
      {
        success: true,
        data: {
          id: productId,
          savedAt: new Date().toISOString(),
          message: "Product saved successfully",
        },
      },
      { status: 201 },
    );
  }),

  http.delete(
    `/products/saves/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})`,
    async ({ params }) => {
      const { id } = params;
      await delay(150);

      // Remove from saved products
      savedProducts = savedProducts.filter((productId) => productId !== id);

      return HttpResponse.json({
        success: true,
        message: "Product removed from favorites",
      });
    },
  ),
];
