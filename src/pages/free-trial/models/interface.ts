import { ColumnDef, RowSelectionState, Table, ColumnFilter, Row } from '@tanstack/react-table';
import { StatusOption, DeviceRentalOption } from './const/freeTrialUserStatus';

/**
 * @description
 * 무료체험 테이블 Row 데이터 타입
 */
export interface ExpandedRowData {
  id: string;
  status?: string;
  latestRecord?: string;
  registrationDate?: Date;
  enterancePath?: string;
  name?: string;
  phone?: string;
  checkPeriod?: {
    startDate?: Date;
    endDate?: Date;
    duration?: string;
    status?: string;
  };
  upgrade?: {
    deviceRentalAddress?: string;
    completionStatus?: string;
    rentalDate?: Date;
    returnStatus?: string;
    returnDate?: Date;
  };
}

// 객체의 모든 가능한 경로를 추출하는 타입
type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string ? K | `${K}.${NestedKeyOf<T[K]>}` : never;
    }[keyof T & string]
  : never;

export type ExpandedRowDataKeys = NestedKeyOf<ExpandedRowData>;

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

export interface ExpandedUserInfoProps<TData extends ExpandedRowData> {
  row: Row<TData>;
  counselingRecords: CounselingRecord[];
}
