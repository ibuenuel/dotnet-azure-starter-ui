export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  errorCode?: string | null;
  errorMessage?: string | null;
  traceId: string;
}

export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationRequest {
  page?: number;
  pageSize?: number;
}
