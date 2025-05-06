import { ColumnDef, RowSelectionState, Table, ColumnFilter, Row } from '@tanstack/react-table';
import { StatusOption, DeviceRentalOption } from './const/freeTrialUserStatus';
/**
 * @description
 * 기본 테이블 데이터 타입
 */
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  subtitle?: string;
  isLoading?: boolean;
  filterKey?: string;
  defaultRowCount?: number;
  onRowSelection?: (rowSelection: RowSelectionState) => void;
}

/**
 * @description
 * 무료체험 테이블 Row 데이터 타입
 */
export interface ExpandedRowData {
  id: string;
  status?: string;
  lastGrade?: string;
  registrationDate?: Date;
  enterancePath?: string;
  name?: string;
  phone?: string;
  checkPeriod?: {
    startDate?: Date;
    endDate?: Date;
    duration?: string;
    status?: string;
  };
  upgrade?: {
    deviceRentalAddress?: string;
    completionStatus?: string;
    rentalDate?: Date;
    returnStatus?: string;
    returnDate?: Date;
  };
}

/**
 * @description
 * 상담기록
 */
export interface CounselingRecord {
  id: string; // userId
  counselingDate: Date;
  counselor: string;
  counselingType: 'phone' | 'email' | 'sns';
  counselingContent: string;
}

export interface ExpandedUserInfoProps<TData extends ExpandedRowData> {
  row: Row<TData>;
  counselingRecords: CounselingRecord[];
}

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
