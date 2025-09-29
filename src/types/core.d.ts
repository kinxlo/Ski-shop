/**
 * Core types and utilities for the Ski Shop application
 */

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

  // ============================================================================
  // HTTP AND API TYPES
  // ============================================================================

  /** HTTP response wrapper */
  interface HttpResponse<T> {
    data: T;
    status: number;
  }

  /** Query parameters type */
  type QueryParameters = Record<string, string | number | boolean>;

  /** Headers type for HTTP requests */
  type HttpHeaders = Record<string, string>;

  /** Short token response */
  interface ShortTokenResponse {
    success: boolean;
    data: {
      token: string;
    };
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
    sortBy?: string;
    rating?: string;
    storeId?: string;
    stockCount?: number;
    flag?: string;
    deliveryStatus?: string;
    role?: string;
    buyerId?: string;
    productId?: string;
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

  interface User {
    id: string;
    name: string | null;
    email: string | null;
    role: { id: string; name: string };
  }

  interface SessionUser extends User {
    accessToken?: string;
    refreshToken?: string;
    [key: string]: unknown;
  }
}

export {};
