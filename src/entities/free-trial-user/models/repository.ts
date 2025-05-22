import { FreeTrialApplicationsResponseDto, GetFreeTrialPromotionsResponseDto } from './dtos';
import { FreeTrialUserGrade, DayOfWeek, Semester, RentalTermCode, PromotionTermCode } from './enums';

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
  promotion?: {
    promotionCode: string;
    optionIds: number[];
    terms: {
      termCode: PromotionTermCode;
      agreed: boolean;
    }[];
  };
}

/** repository */

export interface FreeTrialUserRepository {
  createFreeTrialUser: (request: FreeTrialUserRequestDto) => Promise<FreeTrialApplicationsResponseDto>;
  getPromotions: () => Promise<GetFreeTrialPromotionsResponseDto>;
}
