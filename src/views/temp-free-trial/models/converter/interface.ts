import { ColumnDef } from '@tanstack/react-table';

export interface TempFreeTrialTableUsecaseProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  tableData: TData[];
}
