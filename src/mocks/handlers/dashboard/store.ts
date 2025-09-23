import { delay, http, HttpResponse } from "msw";

// Store info mock data
const storeInfo: StoreApiResponse = {
  success: true,
  data: {
    id: "store-123",
    name: "Ski Shop Store",
    description: "Premium ski equipment and accessories",
    logo: "https://res.cloudinary.com/kingsleysolomon/image/upload/v1742989695/byte-alley/hwqfbog9bbrubto2v0te.svg",
  },
};

// Product creation mock data
const createProductResponse = {
  success: true,
  data: {
    id: "product-123",
    name: "New Product",
    status: "draft",
    category: "electronics",
    description: "Product description",
    discountPrice: null,
    images: ["https://res.cloudinary.com/kingsleysolomon/image/upload/v1742989695/byte-alley/hwqfbog9bbrubto2v0te.svg"],
    price: 0,
    stockCount: 0,
    store: {
      id: "store-123",
      name: "Ski Shop Store",
    },
    user: {
      id: "user-123",
      name: "John Doe",
    },
    createdAt: new Date().toISOString(),
    updateAt: new Date().toISOString(),
  },
};

export const dashboardStoreHandler = [
  // Get store info
  http.get(`/stores/current`, async () => {
    await delay(150);
    return HttpResponse.json(storeInfo, { status: 200 });
  }),

  // Create product
  http.post(`/products`, async ({ request }) => {
    await delay(200);

    try {
      const formData = await request.formData();
      const storeId = formData.get("storeId") as string;
      const images = formData.getAll("images[]") as File[];

      // Validate required fields
      if (!storeId) {
        return HttpResponse.json({ success: false, message: "Store ID is required" }, { status: 400 });
      }

      if (!images || images.length === 0) {
        return HttpResponse.json({ success: false, message: "At least one image is required" }, { status: 400 });
      }

      const productData = {
        name: formData.get("name") as string,
        price: Number(formData.get("price")),
        discountPrice: formData.get("discountPrice") ? Number(formData.get("discountPrice")) : null,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        stockCount: Number(formData.get("stockCount")),
        status: formData.get("status") as string,
        storeId: storeId,
        images: images,
      };

      // Update the response with the actual product data
      const response = {
        ...createProductResponse,
        data: {
          ...createProductResponse.data,
          ...productData,
          id: `product-${Date.now()}`,
          store: {
            id: storeId,
            name: "Ski Shop Store",
          },
        },
      };

      return HttpResponse.json(response, { status: 201 });
    } catch {
      return HttpResponse.json({ success: false, message: "Failed to create product" }, { status: 400 });
    }
  }),
];
