export interface GetListResponse<T> {
  items: T[];
  pageIndex: number;
  totalPages: number;
  totalCount: number;
}
