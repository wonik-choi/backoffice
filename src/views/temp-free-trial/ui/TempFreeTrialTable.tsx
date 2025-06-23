'use client';

// pages
import TempFreeTrialTableBodyRow from '@/views/temp-free-trial/ui/TempFreeTrialTableBodyRow';
import { useInitialTempFreeTrialTable } from '@/views/temp-free-trial/services/usecase/useInitialTempFreeTrialTable';

// shared
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from '@/shared/components/atomics/table';
import { flexRender } from '@tanstack/react-table';
import { Button } from '@/shared/components/atomics/button';

import { useGetTempFreeTrialUsersBody } from '@/views/temp-free-trial/services/query/useGetTempFreeTrialUsersBody';

// views
import { TEMP_FREE_TRIAL_USERS_TABLE_COLUMNS } from '@/views/temp-free-trial/models/const/table';

const FreeTrialTable = () => {
  const { tableData, totalCount, totalPages } = useGetTempFreeTrialUsersBody();
  const { table, TEMP_FREE_TRIAL_USERS_TABLE_COLUMN_GROUPS } = useInitialTempFreeTrialTable({
    columns: TEMP_FREE_TRIAL_USERS_TABLE_COLUMNS,
    tableData,
  });

  return (
    <>
      <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100/80 border-b border-gray-200">
              {TEMP_FREE_TRIAL_USERS_TABLE_COLUMN_GROUPS.map((group) => {
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
                return <TempFreeTrialTableBodyRow key={row.id} row={row} />;
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
          총 <span className="font-medium text-gray-900">{totalCount}</span>개 항목
        </div>
        <div className="flex items-center gap-[0.8rem]">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={table.getState().pagination.pageIndex === 0}
            className="h-[3.2rem] px-[1.6rem] text-[1.2rem] bg-white hover:bg-gray-50/80"
          >
            이전
          </Button>
          <span className="text-[1.4rem] font-medium text-gray-900">
            {totalPages ? table.getState().pagination.pageIndex + 1 : 0} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.nextPage();
            }}
            disabled={table.getState().pagination.pageIndex === totalPages - 1 || !totalPages}
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
