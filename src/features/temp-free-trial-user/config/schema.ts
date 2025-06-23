import { z } from 'zod';

// entities
import { FreeTrialUserGrade } from '@/entities/free-trial-user/models/enums';
import { ApplyFreeTrialTermCode } from '@/entities/temp-user/models/enums';

export const tempFreeTrialFormSchema = z.object({
  studentName: z.string().min(1, { message: '이름을 입력해주세요' }),
  callablePhoneNumber: z.string().regex(/^(?=[0-9]+$)01([016789])\d{8}$/, {
    message: '(010시작) 11자리 유효한 핸드폰 번호를 입력해주세요',
  }),
  grade: z.nativeEnum(FreeTrialUserGrade, { message: '학년을 선택해주세요' }).nullable(),
  inflow: z.object({
    code: z.string().min(1, { message: '유입 코드를 넣어주세요' }),
  }),
});

export type TempFreeTrialForm = z.infer<typeof tempFreeTrialFormSchema>;

export const tempFreeTrialRequestSchema = z.object({
  studentName: z.string().min(1, { message: '이름을 입력해주세요' }),
  callablePhoneNumber: z.string().regex(/^(?=[0-9]+$)01([016789])\d{8}$/, {
    message: '(010시작) 11자리 유효한 핸드폰 번호를 입력해주세요',
  }),
  grade: z.nativeEnum(FreeTrialUserGrade, { message: '학년을 선택해주세요' }),
  terms: z.array(
    z.object({
      termCode: z.nativeEnum(ApplyFreeTrialTermCode, { message: '약관을 선택해주세요' }),
      agreed: z.boolean({ message: '약관에 동의해주세요' }),
    })
  ),
  inflow: z.object({
    code: z.string().min(1, { message: '유입 코드를 넣어주세요' }),
  }),
});

export type TempFreeTrialRequest = z.infer<typeof tempFreeTrialRequestSchema>;
