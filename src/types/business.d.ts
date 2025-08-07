/**
 * Business domain types for the Ski Shop application
 */

declare global {
  // ============================================================================
  // BUSINESS DOMAIN TYPES
  // ============================================================================

  /** Product entity */
  interface Product {
    id: string;
    name: string;
    status: "draft" | "published";
    category: string;
    description: string;
    discountPrice: number | null;
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
    updatedAt: string;
    [key: string]: unknown;
  }

  /** Store entity */
  interface Store {
    id: string;
    name: string;
    description: string;
    logo?: File | string;
    isStarSeller?: boolean;
    createdAt?: string;
    updatedAt?: string;
    type?: string;
  }

  /** User profile entity */
  interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    role: string;
    businessInfo?: BusinessInfo;
    createdAt: string;
    updatedAt: string;
  }

  /** Business information */
  interface BusinessInfo {
    type: string;
    registrationNumber?: string;
    contactNumber: string;
    address: string;
    country: string;
    state: string;
    kycVerificationType: string;
    identificationNumber: string;
  }

  /** Cart item */
  interface CartItem {
    id: string;
    product: Product;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    [key: string]: unknown;
  }

  /** Order entity */
  interface Order {
    id: string;
    status: OrderStatus;
    buyer: OrderBuyer;
    products: OrderProduct[];
    createdAt: string;
    [key: string]: unknown;
  }

  /** Order status types */
  type OrderStatus = "paid" | "pending" | "cancelled" | "delivered";

  /** Order buyer information */
  interface OrderBuyer {
    id: string;
    name: string;
  }

  /** Order vendor information */
  interface OrderVendor {
    id: string;
    name: string;
  }

  /** Order product information */
  interface OrderProduct {
    id: string;
    name: string;
    images: string[];
    price: number;
    quantity: number;
    vendor: OrderVendor;
  }

  /** Review entity */
  interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }

  /** Product dimensions */
  interface Dimensions {
    width: number;
    height: number;
    depth: number;
  }

  /** Product image */
  interface ProductImage {
    id: string;
    url: string;
    alt?: string;
    order?: number;
  }

  /** Address entity */
  interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }

  /** Location entity */
  interface Location {
    lat: number;
    lng: number;
  }

  /** Country entity */
  interface Country {
    code: string;
    name: string;
    flag: string;
  }

  /** Saved product for storage */
  interface SavedProduct {
    id: string;
    product: Product;
    savedAt: string;
  }

  /** Dashboard overview data */
  interface DashboardOverview {
    totalSales: number;
    totalOrders: number;
    totalProducts: number;
    totalCustomers: number;
  }

  // ============================================================================
  // API RESPONSE TYPES
  // ============================================================================

  /** Product API response */
  interface ProductApiResponse extends PaginatedApiResponse<Product> {}

  /** Store API response */
  interface StoreApiResponse extends PaginatedApiResponse<Store> {}

  /** User API response */
  interface UserApiResponse extends PaginatedApiResponse<UserProfile> {}

  /** Vendor API response */
  interface VendorApiResponse extends PaginatedApiResponse<Store> {}

  /** Order API response */
  interface OrderApiResponse extends PaginatedApiResponse<Order> {}

  /** Cart API response */
  interface CartApiResponse {
    data: {
      items: CartItem[];
      metadata: {
        total: number;
        [key: string]: unknown;
      };
    };
  }

  /** Cart item API response */
  interface CartItemApiResponse {
    data: CartItem;
  }

  /** Checkout API response */
  interface CheckoutApiResponse {
    data: {
      orderId: string;
      status: string;
      [key: string]: unknown;
    };
  }

  /** Single store API response */
  interface SingleStoreApiResponse {
    success: boolean;
    data: Store;
  }
}

export {};
