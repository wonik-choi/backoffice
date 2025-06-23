'use client';

import React from 'react';
import { flexRender, Row } from '@tanstack/react-table';

// shared
import { TableCell, TableRow } from '@/shared/components/atomics/table';
import { cn } from '@/shared/lib/utils';

// pages
import ExpandedRowContent from '@/views/free-trial/ui/ExpandedRowContent';
import type { ExpandedFreeTrialUsersTableRowData } from '@/views/free-trial/models/interface';

const FreeTrialTableBodyRow = ({ row }: { row: Row<ExpandedFreeTrialUsersTableRowData> }) => {
  const [expanded, setExpanded] = React.useState(false);

  const toggleExpandedUserInfo = React.useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return (
    <React.Fragment key={row.id}>
      <TableRow
        data-state={row.getIsSelected() && 'selected'}
        className={cn(
          'hover:bg-gray-50/50 cursor-pointer transition-colors group',
          row.original.daysLeft <= 3 && 'bg-violet-50',
          row.original.daysLeft === 0 && 'bg-blue-50',
          row.original.daysLeft < 0 && 'bg-white'
        )}
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

export default FreeTrialTableBodyRow;
