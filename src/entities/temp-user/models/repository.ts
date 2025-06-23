import { FreeTrialUserGrade } from '@/entities/free-trial-user/models/enums';
import { PeriodType } from '@/entities/common/enums';
import {
  TempSelfFreeTrialApplicationResponseDto,
  TempUserTermDto,
  PageTempFreeTrialUserResponseDto,
} from '@/entities/temp-user/models/dtos';

export interface TempUserRequestDto {
  studentName: string;
  callablePhoneNumber: string;
  grade: FreeTrialUserGrade;
  terms: TempUserTermDto[];
  inflowCode?: string;
}

export interface GetTempUsersRequestDto {
  periodType: PeriodType;
  /** YYYY-MM-DD */
  baseDate: string;
  timeZone: string;
  page: number;
  size: number;
}

/** repository */

export interface TempUserRepository {
  createTempUser: (request: TempUserRequestDto) => Promise<TempSelfFreeTrialApplicationResponseDto>;
  getTempUsers: (
    request: GetTempUsersRequestDto,
    options?: { headers?: Record<string, string> }
  ) => Promise<PageTempFreeTrialUserResponseDto>;
}
