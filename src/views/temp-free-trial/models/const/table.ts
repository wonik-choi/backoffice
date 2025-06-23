import { ColumnDef } from '@tanstack/react-table';

import {
  ExpandedFreeTrialUsersTableRowData,
  FreeTrialUsersTableColumnGroup,
} from '@/views/temp-free-trial/models/interface';

export const TEMP_FREE_TRIAL_USERS_TABLE_COLUMN_GROUPS: FreeTrialUsersTableColumnGroup[] = [
  {
    name: '기본 정보',
    colSpan: 6,
    columns: [
      { id: 'row-select', label: '선택' },
      { id: 'name', label: '이름' },
      { id: 'phone', label: '연락가능번호' },
      { id: 'grade', label: '학년' },
      { id: 'createdAt', label: '신청일' },
      { id: 'inflow', label: '유입경로' },
    ],
  },
];

export const TEMP_FREE_TRIAL_USERS_TABLE_COLUMNS: ColumnDef<ExpandedFreeTrialUsersTableRowData>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: '학생명',
    cell: ({ row }) => row.original.name || '-',
  },
  {
    id: 'phone',
    accessorKey: 'phone',
    header: '연락가능번호',
    cell: ({ row }) => row.original.phone || '-',
  },
  {
    id: 'grade',
    accessorKey: 'grade',
    header: '학년',
    cell: ({ row }) => row.original.grade || '-',
  },
  {
    id: 'inflow',
    accessorKey: 'inflow',
    header: '유입경로',
    cell: ({ row }) => row.original.inflow || '-',
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: '신청일',
    cell: ({ row }) => row.original.createdAt || '-',
  },
];
