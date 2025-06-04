import {
  FreeTrialApplicationsResponseDto,
  GetFreeTrialPromotionsResponseDto,
  GetFreeTrialUsersResponseDto,
} from './dtos';
import { FreeTrialUserGrade, DayOfWeek, Semester, RentalTermCode, PromotionTermCode, PeriodType } from './enums';

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

/** repository */

export interface FreeTrialUserRepository {
  createFreeTrialUser: (request: FreeTrialUserRequestDto) => Promise<FreeTrialApplicationsResponseDto>;
  getFreeTrialUsers: (request: GetFreeTrialUsersRequestDto) => Promise<GetFreeTrialUsersResponseDto>;
  getPromotions: () => Promise<GetFreeTrialPromotionsResponseDto>;
}
