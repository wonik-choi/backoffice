import { FreeTrialUserGrade, Semester } from '@/entities/free-trial-user/models/enums';
import { DayOfWeek } from '@/entities/free-trial-user/models/enums';
import { z } from 'zod';

export const patchFreeTrialSchema = z.object({
  user: z.object({
    name: z.string().min(1, { message: '이름을 입력해주세요' }),
    phoneNumber: z
      .string()
      .regex(/^(?=[0-9]+$)01([016789])\d{8}$/, {
        message: '(010시작) 11자리 유효한 핸드폰 번호를 입력해주세요',
      })
      .optional()
      .nullable(),
    parentName: z.string().min(1, { message: '부모님 이름을 입력해주세요' }),
    parentPhoneNumber: z.string().regex(/^(?=[0-9]+$)01([016789])\d{8}$/, {
      message: '(010시작) 11자리 유효한 핸드폰 번호를 입력해주세요',
    }),
    grade: z.nativeEnum(FreeTrialUserGrade, { message: '학년을 선택해주세요' }),
  }),
  freeTrial: z.object({
    id: z.number().optional(),
    startDate: z.string().min(1, { message: '시작일을 입력해주세요' }),
    schedules: z
      .array(
        z.object({
          id: z.number().optional(),
          dayOfWeek: z.nativeEnum(DayOfWeek, { message: '요일을 선택해주세요' }),
          startAt: z.object({
            hour: z.number(),
            minute: z.number(),
            timezone: z.string(),
          }),
          todayLearningTime: z.number(),
        })
      )
      .min(1, { message: '최소 1개 이상의 스케줄을 등록해주세요' }),
    semester: z.nativeEnum(Semester, { message: '학기를 선택해주세요' }).nullable(),
  }),
  rental: z
    .object({
      id: z.number().optional(),
      zonecode: z.string(),
      address: z.string(),
      addressType: z.enum(['R', 'J']),
      detailAddress: z.string(),
      terms: z.array(z.any()),
    })
    .refine(
      (data) => {
        // 주소 관련 필드가 모두 비어있으면 통과
        if (!data.address && !data.zonecode && !data.detailAddress) {
          return true;
        }
        // 하나라도 입력되었으면 모든 필수 필드 검증
        return data.address && data.zonecode && data.detailAddress;
      },
      { message: '주소를 완전히 입력해주세요' }
    ),
  inflow: z.object({
    id: z.number().optional(),
    code: z.string().min(1, { message: '유입 코드를 넣어주세요' }),
  }),
});

export type PatchFreeTrialSchema = z.infer<typeof patchFreeTrialSchema>;
