import { FreeTrialUserGrade } from '@/entities/free-trial-user/models/enums';
import { TempSelfFreeTrialApplicationResponseDto, TempUserTermDto } from '@/entities/temp-user/models/dtos';

export interface TempUserRequestDto {
  studentName: string;
  callablePhoneNumber: string;
  grade: FreeTrialUserGrade;
  terms: TempUserTermDto[];
  inflowCode?: string;
}

/** repository */

export interface TempUserRepository {
  createTempUser: (request: TempUserRequestDto) => Promise<TempSelfFreeTrialApplicationResponseDto>;
}
