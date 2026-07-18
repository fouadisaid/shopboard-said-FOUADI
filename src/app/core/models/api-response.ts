export interface ApiResponse<T> {
  data: T;
  total: number;
  page: number;
  perPage: number;
  error: string | null;
}