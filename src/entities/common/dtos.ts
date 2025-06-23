export interface SortObject {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

export interface PageableObject {
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: SortObject;
  unpaged: boolean;
  paged: boolean;
}
