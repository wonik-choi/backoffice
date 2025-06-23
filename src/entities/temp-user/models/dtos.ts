// entities
import { InflowDto } from '@/entities/inflow/models/dtos';
import { PageableObject, SortObject } from '@/entities/common/dtos';
import { FreeTrialUserGrade } from '@/entities/free-trial-user/models/enums';
import { ApplyFreeTrialTermCode } from '@/entities/temp-user/models/enums';

export interface TempUserTermDto {
  termCode: ApplyFreeTrialTermCode;
  agreed: boolean;
}

export interface TempUserDto {
  id: string;
  studentName: string;
  callablePhoneNumber: string;
  grade: FreeTrialUserGrade;
  inflow: InflowDto;
  createdAt: string;
}

/** response */

export interface TempSelfFreeTrialApplicationResponseDto {
  message: string;
  tempFreeTrialUserId: string;
}

export interface PageTempFreeTrialUserResponseDto {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  pageable: PageableObject;
  size: number;
  content: TempUserDto[];
  number: number;
  sort: SortObject;
  numberOfElements: number;
  empty: boolean;
}

export interface GetTempFreeTrialUsersResponseDto {
  tempFreeTrialUsers: PageTempFreeTrialUserResponseDto;
}
