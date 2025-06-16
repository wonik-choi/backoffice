import { PeriodType } from '@/entities/free-trial-user/models/enums';
import { ColumnFilter, PaginationState, Updater } from '@tanstack/react-table';

/**
 * @description
 * 무료체험 상태 타입
 */
export interface FreeTrialState {
  userKeyword: string;
  columnFilters: Array<ColumnFilter>;
  pagination: PaginationState;
  page: number;
  periodType: PeriodType;
  baseDate: string;

  /** tanstack 제공 필터링 */
  setKeyword: (keyword: string) => void;
  toggleColumnFilter: (columnId: string, value: string) => void;
  checkFilterChecked: (columnId: string, value: string) => boolean;
  resetColumnFilters: () => void;

  /** 페이지 번호 */
  setNextPage: () => void;
  setPrevPage: () => void;
  setPage: (page: number) => void;
  setPagination: (updater: Updater<PaginationState>) => void;

  /** 기간 타입 */
  setPeriodType: (periodType: PeriodType) => void;

  /** 기간 날짜 */
  setBaseDate: (baseDate: Date) => void;
}
