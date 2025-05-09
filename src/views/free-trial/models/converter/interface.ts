import { ColumnDef } from '@tanstack/react-table';

export interface FreeTrialTableUsecaseProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  tableData: TData[];
}
