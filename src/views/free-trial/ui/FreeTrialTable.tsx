'use client';

// pages
import FreeTrialTableBodyRow from '@/views/free-trial/ui/FreeTrialTableBodyRow';
import { useInitialFreeTrialTable } from '@/views/free-trial/services/usecase/useInitialFreeTrialTable';
import type { FreeTrialTableUsecaseProps } from '@/views/free-trial/models/converter/interface';
import { ExpandedFreeTrialUsersTableRowData } from '@/views/free-trial/models/interface';

// shared
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from '@/shared/components/atomics/table';
import { flexRender } from '@tanstack/react-table';
import { Button } from '@/shared/components/atomics/button';

const FreeTrialTable = ({
  columns,
  tableData,
}: FreeTrialTableUsecaseProps<ExpandedFreeTrialUsersTableRowData, unknown>) => {
  const { table, FREE_TRIAL_USERS_TABLE_COLUMN_GROUPS } = useInitialFreeTrialTable({ columns, tableData });

  return (
    <>
      <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100/80 border-b border-gray-200">
              {FREE_TRIAL_USERS_TABLE_COLUMN_GROUPS.map((group) => {
                return (
                  <TableHead
                    key={group.name}
                    className="text-center py-[1.2rem] font-semibold text-gray-900 border-r last:border-r-0"
                    colSpan={group.colSpan}
                  >
                    {group.name}
                  </TableHead>
                );
              })}
            </TableRow>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id} className="bg-gray-50/80">
                  {headerGroup.headers.map((header) => {
                    if (!header.column.getIsVisible()) return null;

                    return (
                      <TableHead
                        key={header.id}
                        className="text-center whitespace-nowrap py-[1.2rem] text-[1.4rem] font-medium text-gray-700 border-r last:border-r-0"
                      >
                        <div className="flex justify-center items-center">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => {
                return <FreeTrialTableBodyRow key={row.id} row={row} />;
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-[9.6rem] text-center text-[1.4rem] text-gray-600"
                >
                  결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-[1.6rem] w-full">
        <div className="text-[1.4rem] text-gray-700">
          총 <span className="font-medium text-gray-900">{table.getFilteredRowModel().rows.length}</span>개 항목
        </div>
        <div className="flex items-center gap-[0.8rem]">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-[3.2rem] px-[1.6rem] text-[1.2rem] bg-white hover:bg-gray-50/80"
          >
            이전
          </Button>
          <span className="text-[1.4rem] font-medium text-gray-900">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-[3.2rem] px-[1.6rem] text-[1.2rem] bg-white hover:bg-gray-50/80"
          >
            다음
          </Button>
        </div>
      </div>
    </>
  );
};

export default FreeTrialTable;
