export type Pagination<T> = {
  results: T[] | null;
  count?: number;
  next_url?: string;
};
