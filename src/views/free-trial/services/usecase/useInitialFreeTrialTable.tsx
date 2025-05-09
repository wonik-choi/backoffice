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
import { COLUMN_GROUPS } from '@/views/free-trial/models/const/table';
import type { FreeTrialTableUsecaseProps } from '@/views/free-trial/models/converter/interface';

// TODO: 추후 dto 를 받아와 처리할 수 있도록 변경될 예정이며 현재는 mock data 로 임시 처리합니다.
export const useInitialFreeTrialTable = <TData, TValue>({
  columns,
  tableData,
}: FreeTrialTableUsecaseProps<TData, TValue>) => {
  const { columnFilters } = useFreeTrialStore();

  const convertedColumns = useMemo(() => {
    const filteredSelectColumns = columns.filter((column) => column.id !== 'select' && column.id !== 'row-select');

    // 테이블 헤더 컴포넌트 생성
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
        size: 40,
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
        if (col.id === 'upgrade.returnStatus') {
          return {
            ...col,
            cell: ({ getValue }: { getValue: () => unknown }) => {
              const value = getValue();
              return <Badge variant="outline">{String(value)}</Badge>;
            },
          };
        }
        if (col.id === 'latestRecord') {
          return {
            ...col,
            cell: ({ getValue }: { getValue: () => unknown }) => {
              const value = String(getValue() || '-');
              // 날짜와 시간 형식 (YYYY.MM.DD HH:MM:SS) 패턴 매칭
              const dateTimePattern = /\d{4}\.\d{2}\.\d{2}(?:\s+\d{2}:\d{2}(?::\d{2})?)?/g;
              const parts = value.split(dateTimePattern);
              const dateTimes = value.match(dateTimePattern) || [];

              return (
                <div className="text-sm">
                  {parts.map((part, index) => (
                    <React.Fragment key={index}>
                      {part}
                      {dateTimes[index] && <span className="text-xs text-gray-500 ml-1">{dateTimes[index]}</span>}
                    </React.Fragment>
                  ))}
                </div>
              );
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
    COLUMN_GROUPS,
  };
};
