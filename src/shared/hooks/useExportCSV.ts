'use client';

import React from 'react';
import { ColumnDef, CellContext, Table } from '@tanstack/react-table';
import { ExpandedRowData } from '@/views/free-trial/models/interface';

// UTF-8 BOM 문자
const BOM = '\uFEFF';

interface UseExportCSVProps<TData extends ExpandedRowData> {
  table: Table<TData>;
  data: TData[];
  userColumns: ColumnDef<TData, unknown>[];
}

export function useExportCSV<TData extends ExpandedRowData>({ table, data, userColumns }: UseExportCSVProps<TData>) {
  const handleExport = React.useCallback(() => {
    const selectedRows = table.getSelectedRowModel().rows;
    const dataToExport = selectedRows.length > 0 ? selectedRows.map((row) => row.original) : data;

    const exportColumns = userColumns.filter((col) => col.id !== 'select');

    const headers = exportColumns
      .map((col) => {
        const columnDef = col as { accessorKey?: string; header?: string };
        const headerValue = typeof columnDef.header === 'string' ? columnDef.header : columnDef.accessorKey || col.id;
        return `"${headerValue}"`;
      })
      .join(',');

    const rows = dataToExport.map((rowData) => {
      return exportColumns
        .map((col) => {
          const columnDef = col as { accessorKey?: string };
          const accessorKey = columnDef.accessorKey || col.id;
          const value = rowData[accessorKey as keyof TData];

          let displayValue: string;
          if (col.cell && typeof col.cell === 'function') {
            const cellContext = {
              table,
              column: col,
              row: {
                original: rowData,
                id: String(rowData.id),
                index: 0,
                depth: 0,
                getValue: (columnId: string) => rowData[columnId as keyof TData],
              },
              cell: {
                id: `${String(rowData.id)}_${col.id}`,
                getValue: () => value,
              },
              getValue: () => value,
              renderValue: () => value,
            } as unknown as CellContext<TData, unknown>;

            const cellContent = col.cell(cellContext);

            if (React.isValidElement(cellContent)) {
              const props = cellContent.props as { children: React.ReactNode };
              displayValue = String(props.children ?? '');
            } else {
              displayValue = String(cellContent ?? '');
            }
          } else {
            displayValue = String(value ?? '');
          }

          return `"${displayValue.replace(/"/g, '""')}"`;
        })
        .join(',');
    });

    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([BOM + csvContent], {
      type: 'text/csv;charset=utf-8',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    const date = new Date().toISOString().split('T')[0];
    link.download = `export_${date}.csv`;
    link.click();
  }, [table, data, userColumns]);

  return handleExport;
}
