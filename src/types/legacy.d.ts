/**
 * Legacy types for backward compatibility
 */

declare global {
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

  /** @deprecated Use Order instead */
  interface IOrder extends Order {}

  /** @deprecated Use OrderApiResponse instead */
  interface IOrderApiResponse extends OrderApiResponse {}

  /** @deprecated Use StoreApiResponse instead */
  interface IStoreApiResponse extends StoreApiResponse {}
}

export {};
