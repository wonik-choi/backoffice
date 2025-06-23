import { ColumnDef } from '@tanstack/react-table';

import {
  ExpandedFreeTrialUsersTableRowData,
  FreeTrialUsersTableColumnGroup,
} from '@/views/free-trial/models/interface';

export const FREE_TRIAL_USERS_TABLE_COLUMN_GROUPS: FreeTrialUsersTableColumnGroup[] = [
  {
    name: '기본 정보',
    colSpan: 5,
    columns: [
      { id: 'row-select', label: '선택' },
      { id: 'name', label: '이름' },
      { id: 'phone', label: '연락가능번호' },
      { id: 'status', label: '학생상태' },
      { id: 'inflow', label: '유입경로' },
    ],
  },
  {
    name: '체험기간',
    colSpan: 4,
    columns: [
      { id: 'period.startDate', label: '시작일' },
      { id: 'period.endDate', label: '종료일' },
      { id: 'period.status', label: '진행상태' },
    ],
  },
  // {
  //   name: '아이패드 대여',
  //   colSpan: 2,
  //   columns: [
  //     { id: 'rental.status', label: '대여상태' },
  //     { id: 'rental.returnDate', label: '반납일' },
  //   ],
  // },
];

export const FREE_TRIAL_USERS_TABLE_COLUMNS: ColumnDef<ExpandedFreeTrialUsersTableRowData>[] = [
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
    id: 'status',
    accessorKey: 'status',
    header: '처리상태',
    cell: ({ row }) => row.original.status || '미처리',
  },
  {
    id: 'inflow',
    accessorKey: 'inflow',
    header: '유입경로',
    cell: ({ row }) => row.original.inflow || '-',
  },
  {
    id: 'period.startDate',
    accessorFn: (row) => row.period?.startDate,
    header: '시작일',
    cell: ({ row }) => row.original.period?.startDate || '-',
  },
  {
    id: 'period.endDate',
    accessorFn: (row) => row.period?.endDate,
    header: '종료일',
    cell: ({ row }) => row.original.period?.endDate || '-',
  },
  {
    id: 'period.status',
    accessorFn: (row) => row.period?.status,
    header: '진행상태',
    cell: ({ row }) => row.original.period?.status || '-',
  },
  {
    id: 'period.duration',
    accessorFn: (row) => row.period?.duration,
    header: '체험기간',
    cell: ({ row }) => row.original.period?.duration || '-',
  },
  // {
  //   id: 'rental.status',
  //   accessorFn: (row) => row.rental?.status,
  //   header: '대여상태',
  //   cell: ({ row }) => row.original.rental?.status || '미대여',
  // },
  // {
  //   id: 'rental.returnDate',
  //   accessorFn: (row) => row.rental?.returnDate,
  //   header: '반납일',
  //   cell: ({ row }) => row.original.rental?.returnDate || '-',
  // },
];
