import { FreeTrialApplicationsResponseDto, GetFreeTrialUsersResponseDto } from './dtos';
import { RentalTermCode } from '@/entities/rental/models/enums';
import { PromotionTermCode } from '@/entities/promotion/models/enums';
import { FreeTrialUserGrade, DayOfWeek, Semester, PeriodType } from './enums';

export interface FreeTrialUserRequestDto {
  user: {
    name: string;
    phoneNumber?: string;
    parentName: string;
    parentPhoneNumber: string;
    grade: FreeTrialUserGrade;
  };
  freeTrial: {
    startDate: string;
    schedules: {
      dayOfWeek: DayOfWeek;
      startAt: {
        hour: number;
        minute: number;
        timezone: string;
      };
      todayLearningTime: number;
    }[];
    semester: Semester;
  };
  rental?: {
    zonecode: string;
    address: string;
    detailAddress: string;
    addressType: string;
    terms: {
      termCode: RentalTermCode;
      agreed: boolean;
    }[];
  };
  promotions?: {
    promotionCode: string;
    optionIds: number[];
    terms: {
      termCode: PromotionTermCode;
      agreed: boolean;
    }[];
  }[];
  inflow?: {
    code: string;
  };
}

export interface GetFreeTrialUsersRequestDto {
  periodType: PeriodType;
  /** YYYY-MM-DD */
  baseDate: string;
  timeZone: string;
  page: number;
  size: number;
}

export interface DeleteFreeTrialUserRequestDto {
  freeTrialUserId: string;
}

export interface PatchFreeTrialUserRequestDto {
  user?: {
    name?: string;
    phoneNumber?: string;
    parentName?: string;
    parentPhoneNumber?: string;
    grade?: FreeTrialUserGrade;
  };
  freeTrial?: {
    startDate?: string;
    schedules?: {
      dayOfWeek?: DayOfWeek;
      startAt?: {
        hour?: number;
        minute?: number;
        timezone?: string;
      };
      todayLearningTime?: number;
    }[];
    semester?: Semester;
  };
  rental?: {
    zonecode?: string;
    address?: string;
    detailAddress?: string;
    addressType?: string;
    terms?: {
      termCode: RentalTermCode;
      agreed: boolean;
    }[];
  };
  promotions?: {
    promotionCode?: string;
    optionIds?: number[];
    terms?: {
      termCode: PromotionTermCode;
      agreed: boolean;
    }[];
  }[];
  inflow?: {
    code?: string;
  };
}

/** repository */

export interface FreeTrialUserRepository {
  createFreeTrialUser: (request: FreeTrialUserRequestDto) => Promise<FreeTrialApplicationsResponseDto>;
  getFreeTrialUsers: (
    request: GetFreeTrialUsersRequestDto,
    options?: { headers?: Record<string, string> }
  ) => Promise<GetFreeTrialUsersResponseDto>;
  deleteFreeTrialUser: (request: DeleteFreeTrialUserRequestDto) => Promise<unknown>;
  patchFreeTrialUser: (
    request: PatchFreeTrialUserRequestDto,
    freeTrialUserId: string,
    options?: { headers?: Record<string, string> }
  ) => Promise<FreeTrialApplicationsResponseDto>;
}
