import { z } from 'zod';

// entities
import { FreeTrialUserGrade } from '@/entities/free-trial-user/models/enums';
import { ApplyFreeTrialTermCode } from '@/entities/temp-user/models/enums';

/**
 * @description
 * 작성 form 의 스키마
 */
export const applyFreeTrialFormSchema = z.object({
  studentName: z.string().min(1, { message: '이름을 입력해주세요' }),
  callablePhoneNumber: z.string().regex(/^(?=[0-9]+$)01([016789])\d{8}$/, {
    message: '(010시작) 11자리 유효한 핸드폰 번호를 입력해주세요',
  }),
  grade: z.nativeEnum(FreeTrialUserGrade, { message: '학년을 선택해주세요' }).nullable(),
  terms: z.array(
    z.object({
      termCode: z.nativeEnum(ApplyFreeTrialTermCode, { message: '약관을 선택해주세요' }),
      agreed: z.boolean({ message: '약관에 동의해주세요' }),
    })
  ),
});

export type ApplyFreeTrialForm = z.infer<typeof applyFreeTrialFormSchema>;

/**
 * @description
 * 제출 전 확인 스키마 (request schema)
 */
export const applyFreeTrialRequestSchema = z.object({
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
});

export type ApplyFreeTrialRequest = z.infer<typeof applyFreeTrialRequestSchema>;

/**
 * @description
 * 유효성 검사 스키마
 */
export const validableApplyFreeTrialSchema = applyFreeTrialFormSchema.extend({
  callablePhoneNumber: z
    .string()
    .regex(/^010-\d{4}-\d{4}$/, { message: '(010시작) 11자리 유효한 핸드폰 번호를 입력해주세요' }),
  grade: z
    .nativeEnum(FreeTrialUserGrade, { message: '학년을 선택해주세요' })
    .nullable()
    .refine((data) => data !== null, { message: '학년을 선택해주세요' }),
  terms: z
    .array(
      z.object({
        termCode: z.nativeEnum(ApplyFreeTrialTermCode, { message: '약관을 선택해주세요' }),
        agreed: z.boolean({ message: '약관에 동의해주세요' }),
      })
    )
    .refine((data) => data.some((term) => term.termCode === ApplyFreeTrialTermCode.TEMP_USER_001), {
      message: '필수 약관에 동의해주세요',
    }),
});

export type ValidableApplyFreeTrial = z.infer<typeof validableApplyFreeTrialSchema>;
