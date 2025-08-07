/**
 * Global TypeScript declarations for the Ski Shop application
 *
 * This file contains all global type definitions organized by category:
 * - Core types and utilities
 * - UI Component interfaces
 * - API and data models
 * - Business domain types
 * - Form and validation types
 */

import { ChangeEventHandler, FocusEventHandler, HTMLAttributes, MouseEventHandler, ReactNode } from "react";

declare global {
  // ============================================================================
  // CORE TYPES AND UTILITIES
  // ============================================================================

  /** Generic data item type for flexible object structures */
  type DataItem = Record<string, unknown>;

  /** Generic API response wrapper */
  interface ApiResponse<T> {
    success: boolean;
    data: T;
  }

  /** Paginated API response wrapper */
  interface PaginatedApiResponse<T>
    extends ApiResponse<{
      items: T[];
      metadata: PaginationMetadata;
    }> {}

  /** Pagination metadata */
  interface PaginationMetadata {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }

  interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
  }

  interface PaginationLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  }

  interface LegacyPaginatedResponse<T> {
    data: T[];
    links: PaginationLinks;
    meta: LegacyPaginationMeta;
  }

  // ============================================================================
  // DEPENDENCY INJECTION TYPES
  // ============================================================================

  /** Dependency injection container interface */
  interface DependencyContainer {
    _dependencies: Record<symbol, object>;
    add: (key: symbol, dependency: object) => void;
    get: <T>(key: symbol) => T;
  }

  /** Dependency injector function type */
  type DependencyInjector = (Component: React.ElementType, dependencies: Record<string, symbol>) => React.ElementType;

  /** Dependency resolution interface */
  interface ResolveDependencies {
    [key: string]: object;
  }

  // ============================================================================
  // UI COMPONENT INTERFACES
  // ============================================================================

  /** Logo component properties */
  interface LogoProperties {
    logo: string;
    width?: number;
    height?: number;
    className?: string;
    alt?: string;
    href?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
  }

  /** Input field properties */
  interface InputProperties {
    label?: string;
    isRequired?: boolean;
    state?: "default" | "primary" | "error";
    name?: string;
    placeholder: string;
    type?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    isDisabled?: boolean;
    className?: string;
    helpText?: string;
    validate?: (value: string) => boolean;
  }

  /** Form field properties */
  interface FormFieldProperties {
    label?: string;
    labelDetailedNode?: ReactNode;
    name: string;
    type?: "text" | "textarea" | "select" | "number" | "password" | "email";
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    options?: Array<{ value: string; label: string }>;
    className?: string;
    containerClassName?: string;
    leftAddon?: ReactNode;
    rightAddon?: ReactNode;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

  /** Navigation link structure */
  interface NavLink {
    id: number;
    title: string;
    href: string;
    type: "link" | "dropdown";
    subLinks?: Array<{
      id: number;
      title: string;
      href: string;
      description: string;
    }> | null;
  }

  /** Navbar component properties */
  interface NavbarProperties extends HTMLAttributes<HTMLDivElement> {
    logo?: ReactNode;
    links?: NavLink[];
    cta?: ReactNode;
    user?: ReactNode;
    sticky?: boolean;
    navbarStyle?: string;
  }

  /** Dashboard table column definition */
  interface TableColumnDefinition<T extends DataItem> {
    header: string;
    accessorKey: keyof T;
    render?: (value: T[keyof T], row: T) => ReactNode;
  }

  /** Dashboard table row action */
  interface TableRowAction<T> {
    label: string;
    icon?: ReactNode;
    onClick: (row: T) => void;
  }

  /** Dashboard table properties */
  interface DashboardTableProperties<T extends DataItem> {
    data: T[];
    columns: TableColumnDefinition<T>[];
    totalPages?: number;
    itemsPerPage?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
    rowActions?: (row: T) => TableRowAction<T>[];
    onRowClick?: (row: T) => void;
    showPagination?: boolean;
  }

  /** Universal swiper properties */
  interface UniversalSwiperProperties {
    /** Array of items to render as slides */
    items: unknown[];
    /** Function to render each slide */
    renderItem: (item: unknown, index: number) => ReactNode;
    /** Swiper configuration options */
    swiperOptions?: SwiperOptions;
    /** Whether to show navigation buttons */
    showNavigation?: boolean;
    /** Whether to show pagination dots */
    showPagination?: boolean;
    /** Whether to show scrollbar */
    showScrollbar?: boolean;
    /** Navigation button variant */
    navigationVariant?: "default" | "minimal" | "none";
    /** Navigation button size */
    navigationSize?: number;
    /** Navigation button position offset */
    navigationOffset?: number;
    /** Custom className for the container */
    className?: string;
    /** Custom className for the swiper wrapper */
    swiperClassName?: string;
    /** Custom className for each slide */
    slideClassName?: string;
    /** Thumbs swiper instance for gallery pattern */
    thumbsSwiper?: SwiperType | null;
    /** Breakpoints configuration */
    breakpoints?: SwiperBreakpoints;
    /** Whether to enable free mode */
    freeMode?: boolean;
    /** Callback when swiper is initialized */
    onSwiperInit?: (swiper: SwiperType) => void;
  }

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

  /** Short token response */
  interface ShortTokenResponse {
    success: boolean;
    data: {
      token: string;
    };
  }

  /** Single store API response */
  interface SingleStoreApiResponse {
    success: boolean;
    data: Store;
  }

  // ============================================================================
  // FILTER AND QUERY TYPES
  // ============================================================================

  /** Generic filters interface */
  interface Filters {
    page?: number;
    status?: string;
    start_date?: string;
    end_date?: string;
    categories?: string;
    search?: string;
    limit?: number;
    vendor?: string;
    sort?: string;
    storeId?: string;
    stockCount?: number;
    flag?: string;
    deliveryStatus?: string;
  }

  // ============================================================================
  // UPDATE AND MUTATION TYPES
  // ============================================================================

  /** Update user profile payload */
  interface UpdateUserProfile {
    firstName?: string;
    lastName?: string;
    phone?: string;
  }

  // ============================================================================
  // LEGACY INTERFACES (for backward compatibility)
  // ============================================================================

  /** @deprecated Use TableColumnDefinition instead */
  interface IColumnDefinition<T extends DataItem> extends TableColumnDefinition<T> {}

  /** @deprecated Use TableRowAction instead */
  interface IRowAction<T> extends TableRowAction<T> {}

  /** @deprecated Use DashboardTableProperties instead */
  interface IDashboardTableProperties<T extends DataItem> extends DashboardTableProperties<T> {}

  /** @deprecated Use PaginationLink instead */
  interface IPaginationLink extends PaginationLink {}

  /** @deprecated Use LegacyPaginationMeta instead */
  interface IPaginationMeta extends LegacyPaginationMeta {}

  /** @deprecated Use PaginationLinks instead */
  interface IPaginationLinks extends PaginationLinks {}

  /** @deprecated Use LegacyPaginatedResponse instead */
  interface IPaginatedResponse<T> extends LegacyPaginatedResponse<T> {}

  /** @deprecated Use Filters instead */
  interface IFilters extends Filters {}

  /** @deprecated Use DependencyContainer instead */
  interface IDependencyContainer extends DependencyContainer {}

  /** Legacy pagination structure for backward compatibility */
  interface LegacyPaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: PaginationLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  }
}

// Export to make this a module
export {};
