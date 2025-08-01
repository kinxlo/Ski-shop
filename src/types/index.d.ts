/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEventHandler, FocusEventHandler, HTMLAttributes, MouseEventHandler } from "react";

declare global {
  type DataItem = Record<string, any>;

  export interface LogoProperties {
    logo: string;
    width?: number;
    height?: number;
    className?: string;
    alt?: string;
    href?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
  }

  type DependencyInjector = (Component: React.ElementType, dependencies: { [key: string]: symbol }) => any;

  interface ResolveDependencies {
    [key: string]: object;
  }

  interface IDependencyContainer {
    _dependencies: {
      [key: symbol]: object;
    };
    add: (key: symbol, dependency: object) => void;
    get: <T>(key: symbol) => T;
  }

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

  interface NavbarProperties extends HTMLAttributes<HTMLDivElement> {
    logo?: React.ReactNode;
    links?: NavLink[];
    cta?: React.ReactNode;
    user?: React.ReactNode;
    sticky?: boolean;
    navbarStyle?: string;
  }

  interface FormFieldProperties {
    label?: string;
    labelDetailedNode?: React.ReactNode;
    name: string;
    type?: "text" | "textarea" | "select" | "number" | "password" | "email";
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    options?: { value: string; label: string }[];
    className?: string;
    containerClassName?: string;
    leftAddon?: React.ReactNode; // Add left icon or button
    rightAddon?: React.ReactNode; // Add right icon or button
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

  interface IPaginationLink {
    url: string | null;
    label: string;
    active: boolean;
  }

  interface IPaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: IPaginationLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  }

  interface IPaginationLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  }

  interface IPaginatedResponse<T> {
    data: T[];
    links: IPaginationLinks;
    meta: IPaginationMeta;
  }

  interface IFilters {
    page?: number;
    status?: string;
    start_date?: string;
    end_date?: string;
    categories?: string;
    search?: string;
    limit?: number;
  }

  interface IColumnDefinition<T extends DataItem> {
    header: string;
    accessorKey: keyof T;
    render?: (value: T[keyof T], row: T) => ReactNode;
  }

  interface IRowAction<T> {
    label: string;
    icon?: ReactNode;
    onClick: (row: T) => void;
  }

  interface IDashboardTableProperties<T extends DataItem> {
    data: T[];
    columns: IColumnDefinition<T>[];
    currentPage?: number;
    onPageChange?: (page: number) => void;
    totalPages?: number;
    itemsPerPage?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
    rowActions?: (row: T) => IRowAction<T>[];
    onRowClick?: (row: T) => void;
    showPagination?: boolean;
  }

  interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }

  interface Dimensions {
    width: number;
    height: number;
    depth: number;
  }

  type UniversalSwiperProperties = {
    /**
     * Array of items to render as slides
     */
    items: any[];
    /**
     * Function to render each slide
     * @param item - The current item to render
     * @param index - The index of the current item
     * @returns JSX.Element - The rendered slide
     */
    renderItem: (item: any, index: number) => React.ReactNode;
    /**
     * Swiper configuration options
     * @default {}
     */
    swiperOptions?: SwiperOptions;
    /**
     * Whether to show navigation buttons
     * @default false
     */
    showNavigation?: boolean;
    /**
     * Whether to show pagination dots
     * @default false
     */
    showPagination?: boolean;
    /**
     * Whether to show scrollbar
     * @default false
     */
    showScrollbar?: boolean;
    /**
     * Navigation button variant
     * @default "default"
     */
    navigationVariant?: "default" | "minimal" | "none";
    /**
     * Navigation button size
     * @default 24
     */
    navigationSize?: number;
    /**
     * Navigation button position offset
     * @default 0
     */
    navigationOffset?: number;
    /**
     * Custom className for the container
     */
    className?: string;
    /**
     * Custom className for the swiper wrapper
     */
    swiperClassName?: string;
    /**
     * Custom className for each slide
     */
    slideClassName?: string;
    /**
     * Thumbs swiper instance for gallery pattern
     */
    thumbsSwiper?: SwiperType | null;
    /**
     * Breakpoints configuration
     */
    breakpoints?: SwiperBreakpoints;
    /**
     * Whether to enable free mode
     * @default false
     */
    freeMode?: boolean;
    /**
     * Callback when swiper is initialized
     */
    onSwiperInit?: (swiper: SwiperType) => void;
  };

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
    updateAt: string;
  }

  interface Metadata {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }

  interface ProductApiResponse {
    success: boolean;
    data: {
      items: Product[];
      metadata: Metadata;
    };
  }

  interface CartApiResponse {
    data: {
      items: CartItem[];
      metadata: {
        total: number;
        [key: string]: unknown;
      };
    };
  }

  interface CartItemApiResponse {
    data: CartItem;
  }

  interface CheckoutApiResponse {
    data: {
      orderId: string;
      status: string;
      [key: string]: unknown;
    };
  }

  interface OrderBuyer {
    id: string;
    name: string;
  }

  interface OrderVendor {
    id: string;
    name: string;
  }

  interface OrderProduct {
    id: string;
    name: string;
    images: string[];
    price: number;
    quantity: number;
    vendor: OrderVendor;
  }

  interface Order {
    id: string;
    status: "paid" | "pending" | "cancelled" | "delivered";
    buyer: OrderBuyer;
    products: OrderProduct[];
    createdAt: string;
  }

  interface OrderApiResponse {
    success: boolean;
    data: {
      items: Order[];
      metadata: Metadata;
    };
  }

  interface CartItem {
    id: string;
    product: Product;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    [key: string]: unknown;
  }

  // Business Info interface based on the existing business info form
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

  // Store interface for store creation
  interface Store {
    name: string;
    description: string;
    logo?: File;
  }

  // User profile interface
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

  // Update user profile interface
  interface UpdateUserProfile {
    firstName?: string;
    lastName?: string;
    phone?: string;
  }

  interface ShortTokenResponse {
    success: boolean;
    data: {
      token: string;
    };
  }
}

// This export is needed to make the file a module
export {};
