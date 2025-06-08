import { ColumnDef, Table } from '@tanstack/react-table';
import { ExpandedFreeTrialUsersTableRowData } from '@/views/free-trial/models/interface';

/**
 * @description 내보내기 버튼 컴포넌트의 타입 정의
 */
export interface ExportButtonProps<TData extends ExpandedFreeTrialUsersTableRowData> {
  table: Table<TData>;
  data: TData[];
  userColumns: ColumnDef<TData, unknown>[];
}

/**
 * @description useExportCSV 타입
 */
export interface UseExportCSVProps<TData> {
  table: Table<TData>;
  data: TData[];
  userColumns?: ColumnDef<TData, unknown>[];
  fileName?: string;
}
