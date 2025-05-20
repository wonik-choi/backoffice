import { Semester, DayOfWeek, FreeTrialUserGrade } from './enums';

/** requestdto */
export interface FreeTrialUserRequestDto {
  user: {
    name: string;
    phoneNumber?: string;
    parrentName: string;
    parrentPhoneNumber: string;
    grade: FreeTrialUserGrade;
  };
  freeTrial: {
    startDate: string;
    schedule: {
      dayOfWeek: DayOfWeek;
      startTime: {
        hour: number;
        minute: number;
      };
      todayRunningTime: number;
    }[];
    semester: Semester;
  };
  rental:
    | {
        zonecode: string;
        address: string;
        detailAddress: string;
        addressType: string;
        agreeTerms: {
          code: string;
          agreed: boolean;
        }[];
      }
    | undefined;
  promotion:
    | {
        id: string;
        optionId: string[];
        agreeTerms: {
          code: string;
          agreed: boolean;
        }[];
      }
    | undefined;
}

export interface FreeTrialApplicationsResponseDto {
  freeTrialUserEventUserId: string;
  freeTrialUserEventHistoryId: number;
  freeTrialId: number;
  rentalId: number;
  promotionParticipantIds: number[];
  userTermAgreementIds: number[];
}
