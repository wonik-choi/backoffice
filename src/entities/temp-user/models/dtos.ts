// entities
import { FreeTrialUserGrade } from '@/entities/free-trial-user/models/enums';
import { ApplyFreeTrialTermCode } from '@/entities/temp-user/models/enums';

export interface TempUserTermDto {
  termCode: ApplyFreeTrialTermCode;
  agreed: boolean;
}

export interface TempUserDto {
  studentName: string;
  callablePhoneNumber: string;
  grade: FreeTrialUserGrade;
  terms: TempUserTermDto[];
}

/** response */

export interface TempSelfFreeTrialApplicationResponseDto {
  message: string;
  tempFreeTrialUserId: string;
}
