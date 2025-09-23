import { delay, http, HttpResponse } from "msw";

const orders: OrderApiResponse = {
  success: true,
  data: {
    items: [
      {
        id: "65ccfd94-00f7-431a-8a96-3828be395d7b",
        status: "pending",
        buyer: {
          id: "3ce6a457-5673-43fe-92ce-3c110223116e",
          name: "Tobi customer",
        },
        products: [
          {
            id: "3ce6a457-5673-43fe-92ce-3c110223116e",
            name: "Licensed Frozen Pizza",
            images: [
              "https://res.cloudinary.com/kingsleysolomon/image/upload/v1742989695/byte-alley/hwqfbog9bbrubto2v0te.svg",
            ],
            price: 500,
            quantity: 2,
            vendor: {
              id: "bb44b936-10ad-4a3c-87f1-5e25be8b6071",
              name: "Callie Kessler",
            },
          },
        ],
        createdAt: "2025-07-27T07:40:44.000Z",
      },
      {
        id: "2aa394b3-733b-4764-937f-ed7efd45f65d",
        status: "paid",
        buyer: {
          id: "3ce6a457-5673-43fe-92ce-3c110223116e",
          name: "Tobi customer",
        },
        products: [
          {
            id: "3ce6a457-5673-43fe-92ce-3c110223116e",
            name: "Licensed Frozen Pizza",
            images: [
              "https://res.cloudinary.com/kingsleysolomon/image/upload/v1742989695/byte-alley/hwqfbog9bbrubto2v0te.svg",
            ],
            price: 500,
            quantity: 2,
            vendor: {
              id: "bb44b936-10ad-4a3c-87f1-5e25be8b6071",
              name: "Callie Kessler",
            },
          },
        ],
        createdAt: "2025-07-21T08:49:20.000Z",
      },
      {
        id: "400f4bd4-4059-4b5d-8f68-6a093739f0bc",
        status: "pending",
        buyer: {
          id: "3ce6a457-5673-43fe-92ce-3c110223116e",
          name: "Tobi customer",
        },
        products: [
          {
            id: "3ce6a457-5673-43fe-92ce-3c110223116e",
            name: "Licensed Frozen Pizza",
            images: [
              "https://res.cloudinary.com/kingsleysolomon/image/upload/v1742989695/byte-alley/hwqfbog9bbrubto2v0te.svg",
            ],
            price: 500,
            quantity: 2,
            vendor: {
              id: "bb44b936-10ad-4a3c-87f1-5e25be8b6071",
              name: "Callie Kessler",
            },
          },
        ],
        createdAt: "2025-07-21T08:48:13.000Z",
      },
      {
        id: "80229277-00fd-4107-98b2-c7ef77eb2f8c",
        status: "paid",
        buyer: {
          id: "3ce6a457-5673-43fe-92ce-3c110223116e",
          name: "Tobi customer",
        },
        products: [
          {
            id: "3ce6a457-5673-43fe-92ce-3c110223116e",
            name: "Licensed Frozen Pizza",
            images: [
              "https://res.cloudinary.com/kingsleysolomon/image/upload/v1742989695/byte-alley/hwqfbog9bbrubto2v0te.svg",
            ],
            price: 500,
            quantity: 2,
            vendor: {
              id: "bb44b936-10ad-4a3c-87f1-5e25be8b6071",
              name: "Callie Kessler",
            },
          },
        ],
        createdAt: "2025-07-21T08:44:23.000Z",
      },
      {
        id: "e1b16c99-cc04-4d49-9058-fa7e5dc07bb3",
        status: "pending",
        buyer: {
          id: "3ce6a457-5673-43fe-92ce-3c110223116e",
          name: "Tobi customer",
        },
        products: [
          {
            id: "3ce6a457-5673-43fe-92ce-3c110223116e",
            name: "Licensed Frozen Pizza",
            images: [
              "https://res.cloudinary.com/kingsleysolomon/image/upload/v1742989695/byte-alley/hwqfbog9bbrubto2v0te.svg",
            ],
            price: 500,
            quantity: 2,
            vendor: {
              id: "bb44b936-10ad-4a3c-87f1-5e25be8b6071",
              name: "Callie Kessler",
            },
          },
        ],
        createdAt: "2025-07-21T08:40:41.000Z",
      },
      {
        id: "17efac11-ce21-4dc2-aa4a-a9249e610a6c",
        status: "paid",
        buyer: {
          id: "3ce6a457-5673-43fe-92ce-3c110223116e",
          name: "Tobi customer",
        },
        products: [
          {
            id: "3ce6a457-5673-43fe-92ce-3c110223116e",
            name: "Licensed Frozen Pizza",
            images: [
              "https://res.cloudinary.com/kingsleysolomon/image/upload/v1742989695/byte-alley/hwqfbog9bbrubto2v0te.svg",
            ],
            price: 500,
            quantity: 2,
            vendor: {
              id: "bb44b936-10ad-4a3c-87f1-5e25be8b6071",
              name: "Callie Kessler",
            },
          },
        ],
        createdAt: "2025-07-21T08:38:54.000Z",
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

export const orderHandlers = [
  // Get all products
  http.get(`/orders`, async ({ request }) => {
    const url = new URL(request.url);
    url.searchParams.get("page") || "1";

    await delay(150); // optional delay to simulate network latency
    return HttpResponse.json(orders, { status: 200 });
  }),

  // Get single order by ID
  http.get(`/orders/:id`, async ({ params }) => {
    const { id } = params;
    const order = orders.data.items.find((order) => order.id === id);

    await delay(150); // optional delay to simulate network latency

    if (!order) {
      return HttpResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    return HttpResponse.json({ success: true, data: order }, { status: 200 });
  }),
];
