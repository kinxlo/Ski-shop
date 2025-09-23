import { http } from "msw";

const mockOrders = [
  {
    id: "1",
    orderId: "SK20231045",
    status: "pending" as const,
    products: [
      {
        id: "1",
        name: "Sony PlayStation VR2 Accessories",
        image: "https://via.placeholder.com/150x150/2563eb/ffffff?text=PS5",
        price: 299.99,
        quantity: 1,
      },
      {
        id: "2",
        name: "Gaming Controller",
        image: "https://via.placeholder.com/150x150/7c3aed/ffffff?text=Controller",
        price: 59.99,
        quantity: 2,
      },
      {
        id: "3",
        name: "VR Headset",
        image: "https://via.placeholder.com/150x150/059669/ffffff?text=VR",
        price: 399.99,
        quantity: 1,
      },
    ],
    buyer: {
      name: "Adetola Akinwumi",
      email: "adetola@example.com",
    },
    delivery: {
      address: "12 Yaba Crescent, Lagos",
      city: "Lagos",
      state: "Lagos",
    },
    totalAmount: 819.96,
    createdAt: "2025-01-14T10:30:00Z",
    updatedAt: "2025-01-14T10:30:00Z",
  },
  {
    id: "2",
    orderId: "SK20231046",
    status: "delivered" as const,
    products: [
      {
        id: "4",
        name: "Greek Yogurt Premium",
        image: "https://via.placeholder.com/150x150/f59e0b/ffffff?text=Yogurt",
        price: 4.99,
        quantity: 3,
      },
      {
        id: "5",
        name: "Organic Honey",
        image: "https://via.placeholder.com/150x150/d97706/ffffff?text=Honey",
        price: 8.99,
        quantity: 1,
      },
    ],
    buyer: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
    },
    delivery: {
      address: "45 Victoria Island, Lagos",
      city: "Lagos",
      state: "Lagos",
    },
    totalAmount: 23.96,
    createdAt: "2025-01-13T15:45:00Z",
    updatedAt: "2025-01-14T09:20:00Z",
  },
  {
    id: "3",
    orderId: "SK20231047",
    status: "pending" as const,
    products: [
      {
        id: "6",
        name: "Wireless Bluetooth Headphones",
        image: "https://via.placeholder.com/150x150/0891b2/ffffff?text=Headphones",
        price: 129.99,
        quantity: 1,
      },
    ],
    buyer: {
      name: "Michael Chen",
      email: "michael@example.com",
    },
    delivery: {
      address: "78 Ikeja Avenue, Lagos",
      city: "Lagos",
      state: "Lagos",
    },
    totalAmount: 129.99,
    createdAt: "2025-01-14T08:15:00Z",
    updatedAt: "2025-01-14T08:15:00Z",
  },
  {
    id: "4",
    orderId: "SK20231048",
    status: "delivered" as const,
    products: [
      {
        id: "7",
        name: "Smart Fitness Watch",
        image: "https://via.placeholder.com/150x150/be185d/ffffff?text=Watch",
        price: 199.99,
        quantity: 1,
      },
      {
        id: "8",
        name: "Fitness Band",
        image: "https://via.placeholder.com/150x150/7c2d12/ffffff?text=Band",
        price: 29.99,
        quantity: 2,
      },
    ],
    buyer: {
      name: "Emma Wilson",
      email: "emma@example.com",
    },
    delivery: {
      address: "23 Lekki Phase 1, Lagos",
      city: "Lagos",
      state: "Lagos",
    },
    totalAmount: 259.97,
    createdAt: "2025-01-12T14:20:00Z",
    updatedAt: "2025-01-13T16:30:00Z",
  },
  {
    id: "5",
    orderId: "SK20231049",
    status: "pending" as const,
    products: [
      {
        id: "9",
        name: "Coffee Maker Pro",
        image: "https://via.placeholder.com/150x150/92400e/ffffff?text=Coffee",
        price: 89.99,
        quantity: 1,
      },
      {
        id: "10",
        name: "Coffee Beans Premium",
        image: "https://via.placeholder.com/150x150/78350f/ffffff?text=Beans",
        price: 19.99,
        quantity: 2,
      },
    ],
    buyer: {
      name: "David Brown",
      email: "david@example.com",
    },
    delivery: {
      address: "67 Surulere Street, Lagos",
      city: "Lagos",
      state: "Lagos",
    },
    totalAmount: 129.97,
    createdAt: "2025-01-14T11:00:00Z",
    updatedAt: "2025-01-14T11:00:00Z",
  },
];

export const orderHandlers = [
  // Get all orders
  http.get("/api/dashboard/orders", ({ request }) => {
    const url = new URL(request.url);
    const page = Number.parseInt(url.searchParams.get("page") || "1");
    const limit = Number.parseInt(url.searchParams.get("limit") || "10");
    const status = url.searchParams.get("status");
    const search = url.searchParams.get("search");

    let filteredOrders = [...mockOrders];

    // Filter by status
    if (status && status !== "all") {
      filteredOrders = filteredOrders.filter((order) => order.status === status);
    }

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.orderId.toLowerCase().includes(searchLower) ||
          order.buyer.name.toLowerCase().includes(searchLower) ||
          order.products.some((product) => product.name.toLowerCase().includes(searchLower)),
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

    const total = filteredOrders.length;
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return Response.json({
      data: {
        items: paginatedOrders,
        metadata: {
          total,
          totalPages,
          currentPage: page,
          hasNextPage,
          hasPreviousPage,
        },
      },
    });
  }),

  // Get order by ID
  http.get("/api/dashboard/orders/:id", ({ params }) => {
    const { id } = params;
    const order = mockOrders.find((o) => o.id === id);

    if (!order) {
      return Response.json({ message: "Order not found" }, { status: 404 });
    }

    return Response.json({
      data: order,
    });
  }),

  // Update order status
  http.patch("/api/dashboard/orders/:id/status", async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as { status: "pending" | "delivered" | "cancelled" };
    const { status } = body;

    const orderIndex = mockOrders.findIndex((o) => o.id === id);

    if (orderIndex === -1) {
      return Response.json({ message: "Order not found" }, { status: 404 });
    }

    mockOrders[orderIndex].status = status;
    mockOrders[orderIndex].updatedAt = new Date().toISOString();

    return Response.json({
      data: mockOrders[orderIndex],
    });
  }),
];
