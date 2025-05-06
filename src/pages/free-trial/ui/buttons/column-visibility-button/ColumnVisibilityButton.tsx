'use client';

import { Table } from '@tanstack/react-table';
import * as React from 'react';

import { Button } from '@/shared/components/atomics/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/atomics/dropdown-menu';
import ThreeLineTriangle from '@/shared/components/svgs/three-line-triangle/ThreeLineTriangle';
import { ExpandedRowData } from '@/pages/free-trial/models/interface';
import { COLUMN_GROUPS } from '@/pages/free-trial/models/table';

interface ColumnVisibilityButtonProps<TData extends ExpandedRowData> {
  table: Table<TData>;
}

export function ColumnVisibilityButton<TData extends ExpandedRowData>({ table }: ColumnVisibilityButtonProps<TData>) {
  /**
   * @description
   * 그룹 내 보여져야할 컬럼을 결정하는 함수
   * @param groupName 그룹의 이름
   * @returns
   */
  const isGroupVisible = (groupName: string) => {
    const group = COLUMN_GROUPS.find((g) => g.name === groupName);
    if (!group) return false;

    return group.columns.some((columnDef) => {
      // table의 컬럼을 가져온다.
      const column = table.getColumn(columnDef.id);
      return column?.getIsVisible() ?? false;
    });
  };

  /**
   * @description
   * 그룹 자체의 visibility를 변경하는 함수
   * @param groupName 그룹의 이름
   * @returns
   */
  const toggleGroupVisibility = (groupName: string, value: boolean) => {
    const group = COLUMN_GROUPS.find((g) => g.name === groupName);
    if (!group) return;

    // 그룹 내 전체 columns 를 순회하여 모두 hide 하거나 보여준다.
    group.columns.forEach((columnDef) => {
      const column = table.getColumn(columnDef.id);
      // 컬럼이 hide 가능한 경우 보여줄지 말지 결정한다.
      if (column?.getCanHide()) {
        column.toggleVisibility(value);
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50/80">
          <ThreeLineTriangle className="mr-2 h-4 w-4" />
          컬럼
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuCheckboxItem
          checked={table.getIsAllColumnsVisible()}
          onCheckedChange={() => table.toggleAllColumnsVisible(true)}
          className="font-medium"
        >
          모두 선택
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        {COLUMN_GROUPS.map((group) => (
          <React.Fragment key={group.name}>
            <DropdownMenuCheckboxItem
              checked={isGroupVisible(group.name)}
              onCheckedChange={(value) => toggleGroupVisibility(group.name, value)}
              className="font-medium"
            >
              {group.name}
            </DropdownMenuCheckboxItem>
            {group.columns.map((columnDef) => {
              const column = table.getColumn(columnDef.id);
              if (!column?.getCanHide()) return null;

              return (
                <DropdownMenuCheckboxItem
                  key={columnDef.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  className="ml-4"
                >
                  {columnDef.label}
                </DropdownMenuCheckboxItem>
              );
            })}
            <DropdownMenuSeparator />
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
