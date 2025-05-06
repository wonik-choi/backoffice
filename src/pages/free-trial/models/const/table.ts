export interface TableColumnGroup {
  name: string;
  colSpan: number;
  columns: Array<{
    id: string;
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
      { id: 'lastGrade', label: '최근기록' },
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
      { id: 'upgrade.deviceRental', label: '대여여부' },
      { id: 'upgrade.completionStatus', label: '수령지주소' },
      { id: 'upgrade.rentalDate', label: '대여일자' },
      { id: 'upgrade.returnStatus', label: '반납일' },
      { id: 'checkPeriod.suspendDate', label: '중단일' },
    ],
  },
];
