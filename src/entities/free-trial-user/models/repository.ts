import { FreeTrialUserGrade, DayOfWeek, Semester } from './enums';

export interface FreeTrialUserRequestDto {
  user: {
    name: string;
    phoneNumber?: string;
    parrentName: string;
    parrentPhoneNumber: string;
    school: string;
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
        agreeTerms: boolean;
      }
    | undefined;
  promotion:
    | {
        id: string;
        optionId: string;
        agreeTerms: boolean;
      }
    | undefined;
}

/** repository */
// 추후 진행 예정
