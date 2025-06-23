'use client';

import React from 'react';
import { flexRender, Row } from '@tanstack/react-table';

// pages
import ExpandedRowContent from '@/views/temp-free-trial/ui/TempExpandedRowContent';
import type { ExpandedFreeTrialUsersTableRowData } from '@/views/temp-free-trial/models/interface';

// shared
import { TableCell, TableRow } from '@/shared/components/atomics/table';

const TempFreeTrialTableBodyRow = ({ row }: { row: Row<ExpandedFreeTrialUsersTableRowData> }) => {
  const [expanded, setExpanded] = React.useState(false);

  const toggleExpandedUserInfo = React.useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  // 추후에는 row 데이터 자체 내 counselingRecords 가 추가될 것이 아닐까 싶다.

  return (
    <React.Fragment key={row.id}>
      <TableRow
        data-state={row.getIsSelected() && 'selected'}
        className="hover:bg-gray-50/50 cursor-pointer transition-colors group"
        onClick={toggleExpandedUserInfo}
      >
        {row.getVisibleCells().map((cell) => {
          return (
            <TableCell
              key={cell.id}
              className={`text-center whitespace-pre-line py-[1.2rem] text-[1.4rem] border-r last:border-r-0 group-hover:bg-gray-50/80 transition-colors ${
                cell.column.id === 'row-select' ? 'w-[4.8rem]' : ''
              }`}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          );
        })}
      </TableRow>
      {expanded && (
        <TableRow>
          <TableCell colSpan={row.getVisibleCells().length} className="bg-gray-50/80 border-y border-gray-200">
            <ExpandedRowContent row={row} counselingRecords={[]} />
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};

export default TempFreeTrialTableBodyRow;
