export interface WithPagination<T> {
  pagination: {
    total: number;
  };
  data: T;
}
