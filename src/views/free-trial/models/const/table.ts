import { ExpandedRowDataKeys, ExpandedRowData } from '@/views/free-trial/models/interface';
import { ColumnDef } from '@tanstack/react-table';

export interface TableColumnGroup {
  name: string;
  colSpan: number;
  columns: Array<{
    id: ExpandedRowDataKeys | 'row-select';
    label: string;
  }>;
}

export const COLUMN_GROUPS: TableColumnGroup[] = [
  {
    name: '기본 정보',
    colSpan: 6,
    columns: [
      { id: 'row-select', label: '선택' },
      { id: 'name', label: '학생명' },
      { id: 'phone', label: '연락가능번호' },
      { id: 'status', label: '처리상태' },
      { id: 'latestRecord', label: '최근기록' },
      { id: 'registrationDate', label: '유입경로' },
    ],
  },
  {
    name: '체험기간',
    colSpan: 4,
    columns: [
      { id: 'checkPeriod.startDate', label: '시작일' },
      { id: 'checkPeriod.endDate', label: '종료일' },
      { id: 'checkPeriod.duration', label: '진행일수' },
      { id: 'checkPeriod.status', label: '상태' },
    ],
  },
  {
    name: '아이패드 대여',
    colSpan: 5,
    columns: [
      { id: 'upgrade.deviceRentalAddress', label: '수령지주소' },
      { id: 'upgrade.completionStatus', label: '수령일' },
      { id: 'upgrade.rentalDate', label: '대여일자' },
      { id: 'upgrade.returnStatus', label: '반납일' },
    ],
  },
];

export const freeTrialTableColumns: ColumnDef<ExpandedRowData>[] = [
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
    id: 'latestRecord',
    accessorKey: 'latestRecord',
    header: '최근기록',
    cell: ({ row }) => row.original.latestRecord || '-',
  },
  {
    id: 'registrationDate',
    accessorKey: 'registrationDate',
    header: '등록일자',
    cell: ({ row }) => row.original.registrationDate?.toLocaleDateString('ko-KR') || '-',
  },
  {
    id: 'checkPeriod.startDate',
    accessorFn: (row) => row.checkPeriod?.startDate,
    header: '시작일',
    cell: ({ row }) => row.original.checkPeriod?.startDate?.toLocaleDateString('ko-KR') || '-',
  },
  {
    id: 'checkPeriod.endDate',
    accessorFn: (row) => row.checkPeriod?.endDate,
    header: '종료일',
    cell: ({ row }) => row.original.checkPeriod?.endDate?.toLocaleDateString('ko-KR') || '-',
  },
  {
    id: 'checkPeriod.duration',
    accessorFn: (row) => row.checkPeriod?.duration,
    header: '진행일수',
    cell: ({ row }) => `${row.original.checkPeriod?.duration || 0}일`,
  },
  {
    id: 'checkPeriod.status',
    accessorFn: (row) => row.checkPeriod?.status,
    header: '상태',
    cell: ({ row }) => row.original.checkPeriod?.status || '-',
  },
  {
    id: 'upgrade.deviceRentalAddress',
    accessorFn: (row) => row.upgrade?.deviceRentalAddress,
    header: '대여여부',
    cell: ({ row }) => row.original.upgrade?.deviceRentalAddress || '미대여',
  },

  {
    id: 'upgrade.rentalDate',
    accessorFn: (row) => row.upgrade?.rentalDate,
    header: '대여일자',
    cell: ({ row }) => row.original.upgrade?.rentalDate?.toLocaleDateString('ko-KR') || '-',
  },
  {
    id: 'upgrade.returnDate',
    accessorFn: (row) => row.upgrade?.returnDate,
    header: '반납일',
    cell: ({ row }) => row.original.upgrade?.returnDate?.toLocaleDateString('ko-KR') || '-',
  },
  {
    id: 'upgrade.completionStatus',
    accessorFn: (row) => row.upgrade?.completionStatus,
    header: '상태',
    cell: ({ row }) => row.original.upgrade?.completionStatus || '-',
  },
];
