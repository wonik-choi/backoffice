import { ColumnFilter } from '@tanstack/react-table';

/**
 * @description
 * 무료체험 상태 타입
 */
export interface FreeTrialState {
  userKeyword: string;
  columnFilters: Array<ColumnFilter>;
  setKeyword: (keyword: string) => void;
  toggleColumnFilter: (columnId: string, value: string) => void;
  checkFilterChecked: (columnId: string, value: string) => boolean;
  resetColumnFilters: () => void;
}
