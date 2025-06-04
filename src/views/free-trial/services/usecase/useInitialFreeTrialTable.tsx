import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';

// shared
import { Checkbox } from '@/shared/components/atomics/checkbox';
import { Badge } from '@/shared/components/atomics/badge';

// features

// pages
import { useFreeTrialStore } from '@/views/free-trial/models/store';
import { FREE_TRIAL_USERS_TABLE_COLUMN_GROUPS } from '@/views/free-trial/models/const/table';
import type { FreeTrialTableUsecaseProps } from '@/views/free-trial/models/converter/interface';

// TODO: 추후 dto 를 받아와 처리할 수 있도록 변경될 예정이며 현재는 mock data 로 임시 처리합니다.
export const useInitialFreeTrialTable = <TData, TValue>({
  columns,
  tableData,
}: FreeTrialTableUsecaseProps<TData, TValue>) => {
  const { columnFilters } = useFreeTrialStore();

  const convertedColumns = useMemo(() => {
    const filteredSelectColumns = columns.filter((column) => column.id !== 'select' && column.id !== 'row-select');

    /**
     * @description
     * 최대한 UI 의 형식을 설정해주고, 내부 데이터의 형태는 converter 를 통해 처리해줍니다.
     */
    return [
      {
        id: 'row-select',
        header: ({ table }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
              aria-label="전체 선택"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="행 선택"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
        size: 4,
      },
      ...filteredSelectColumns.map((col) => {
        if (col.id === 'status') {
          return {
            ...col,
            cell: ({ getValue }: { getValue: () => unknown }) => {
              const value = getValue();
              return <Badge variant="outline">{String(value)}</Badge>;
            },
          };
        }
        if (col.id === 'rental.status') {
          return {
            ...col,
            cell: ({ getValue }: { getValue: () => unknown }) => {
              const value = getValue();
              return <Badge variant="outline">{String(value)}</Badge>;
            },
          };
        }
        if (col.id === 'period.status') {
          return {
            ...col,
            cell: ({ getValue }: { getValue: () => unknown }) => {
              const value = getValue();
              return <Badge variant="outline">{String(value)}</Badge>;
            },
          };
        }
        if (col.id === 'inflow') {
          return {
            ...col,
            cell: ({ getValue }: { getValue: () => unknown }) => {
              const value = getValue();
              return <Badge variant="outline">{String(value)}</Badge>;
            },
          };
        }
        return col;
      }),
    ];
  }, [columns]);

  const table = useReactTable({
    data: tableData,
    columns: convertedColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
    state: {
      columnFilters,
    },
  });

  return {
    convertedColumns,
    table,
    FREE_TRIAL_USERS_TABLE_COLUMN_GROUPS,
  };
};
