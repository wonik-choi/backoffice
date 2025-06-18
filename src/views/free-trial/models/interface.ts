import { Row } from '@tanstack/react-table';

import { AdChannel } from '@/entities/free-trial-user/models/enums';
import { FreeTrialUserDto } from '@/entities/free-trial-user/models/dtos';

/**
 * @description
 * 무료체험 테이블 Row 데이터 타입
 */
export interface ExpandedFreeTrialUsersTableRowData {
  /** 내부 데이터
   * 내부 데이터를 freeTrialUserDto 로 통일
   */
  freeTrialUserDto: FreeTrialUserDto;
  id: string; // 편의를 위해 추가;

  // inflowCode?: string;
  // parentName: string;
  // rental?: {
  //   returnDate?: string;
  //   startDate?: string;
  //   address: string;
  //   detailAddress?: string;
  //   zonecode: string;
  // };

  /** 외부 데이터 */
  name: string;
  phone: string;
  status: string;
  latestRecord: string;
  registrationDate: string;
  inflow: string;
  period: {
    startDate: string;
    endDate: string;
    duration: string;
    status?: string;
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
 * ExpandedRowInformation
 */
export interface ExpandedRowInformation {
  user: {
    name: string;
    phone: string;
    registrationDate: string;
  };
  period: {
    startDate: string;
    endDate: string;
    duration: string;
    status: string;
  };
  rental: {
    address: string;
    detailAddress: string;
    startDate: string;
    returnDate: string;
  };
}

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
