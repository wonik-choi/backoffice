import { Row } from '@tanstack/react-table';

/**
 * @description
 * 무료체험 테이블 Row 데이터 타입
 */
export interface ExpandedFreeTrialUsersTableRowData {
  id: string;
  name?: string;
  phone?: string;
  status?: string;
  latestRecord?: string;
  registrationDate?: string;
  inflow?: string;
  period?: {
    startDate?: string;
    endDate?: string;
    duration?: string;
    status?: string;
  };
  rental?: {
    status: string;
    deviceNumber: string;
    returnDate?: string;
    startDate?: string;
    deviceRentalAddress?: string;
    detailAddress?: string;
  };
}

// 객체의 모든 가능한 경로를 추출하는 타입
type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string ? K | `${K}.${NestedKeyOf<T[K]>}` : never;
    }[keyof T & string]
  : never;

export type ExpandedRowDataKeys = NestedKeyOf<ExpandedFreeTrialUsersTableRowData>;

/**
 * @description
 * 테이블 컬럼 그룹
 */
export interface FreeTrialUsersTableColumnGroup {
  name: string;
  colSpan: number;
  columns: Array<{
    id: ExpandedRowDataKeys | 'row-select';
    label: string;
  }>;
}

/**
 * @description
 * 상담기록
 */
export interface CounselingRecord {
  id: string; // userId
  counselingDate: Date;
  counselor: string;
  counselingType: 'phone' | 'email' | 'sns';
  counselingContent: string;
}

export interface ExpandedUserInfoProps<TData extends ExpandedFreeTrialUsersTableRowData> {
  row: Row<TData>;
  counselingRecords: CounselingRecord[];
}
