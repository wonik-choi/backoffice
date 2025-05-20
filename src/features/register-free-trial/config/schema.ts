import { z } from 'zod';

// entitis
import { FreeTrialUserGrade, DayOfWeek, Semester } from '@/entities/free-trial-user/models/enums';

export const userSchema = z.object({
  name: z.string().min(1, { message: '이름을 입력해주세요' }),
  phoneNumber: z
    .string()
    .regex(/^01([016789])[-\s]?(\d{3,4})[-\s]?(\d{4})$/, {
      message: '(010시작) 11자리 유효한 핸드폰 번호를 입력해주세요',
    })
    .optional(),
  parrentName: z.string().min(1, { message: '부모님 이름을 입력해주세요' }),
  parrentPhoneNumber: z.string().regex(/^01([016789])[-\s]?(\d{3,4})[-\s]?(\d{4})$/, {
    message: '(010시작) 11자리 유효한 핸드폰 번호를 입력해주세요',
  }),
  grade: z.nativeEnum(FreeTrialUserGrade, { message: '학년을 선택해주세요' }),
});

export type User = z.infer<typeof userSchema>;

export const freeTrialSchema = z.object({
  startDate: z.string().min(1, { message: '시작일을 입력해주세요' }),
  schedule: z
    .array(
      z.object({
        dayOfWeek: z.nativeEnum(DayOfWeek, { message: '요일을 선택해주세요' }),
        startTime: z.object({
          hour: z.number().min(0, { message: '시작 시간을 입력해주세요' }),
          minute: z.number().min(0, { message: '시작 시간을 입력해주세요' }),
        }),
        todayRunningTime: z.number().min(30, { message: '최소 시간은 1시간 30분입니다.' }),
      })
    )
    .min(1, { message: '최소 1개 이상의 스케줄을 등록해주세요' }),
  semester: z.nativeEnum(Semester, { message: '학기를 선택해주세요' }),
});

export type FreeTrial = z.infer<typeof freeTrialSchema>;

export const rentalSchema = z
  .object({
    zonecode: z.string().min(1, { message: '우편번호를 넣어주세요' }),
    address: z.string().min(1, { message: '주소를 넣어주세요' }),
    addressType: z.enum(['R', 'J'], { message: '주소 타입을 선택해주세요' }),
    detailAddress: z.string().min(1, { message: '상세 주소를 넣어주세요' }),
    agreeTerms: z.array(
      z.object({
        code: z.string().min(1, { message: '약관 설명을 넣어주세요' }),
        agreed: z.boolean().refine((data) => data, { message: '동의가 필요한 부분입니다.' }),
      })
    ),
  })
  .optional();

export type Rental = z.infer<typeof rentalSchema>;

export const promotionSchema = z
  .object({
    id: z.string().min(1, { message: '프로모션 아이디를 넣어주세요' }),
    // TODO: 추후 전달받은 프로모션 id 기반으로 enum 정리
    optionId: z.array(z.string().min(1, { message: '프로모션 옵션 아이디를 넣어주세요' })),
    agreeTerms: z.array(
      z.object({
        code: z.string().min(1, { message: '약관 설명을 넣어주세요' }),
        agreed: z.boolean().refine((data) => data, { message: '동의가 필요한 부분입니다.' }),
      })
    ),
  })
  .optional();

export type Promotion = z.infer<typeof promotionSchema>;

/** request body schema */
export const freeTrialUserRequestBodySchema = z.object({
  user: userSchema,
  freeTrial: freeTrialSchema,
  rental: rentalSchema,
  promotion: promotionSchema,
});

export type FreeTrialUserRequestBody = z.infer<typeof freeTrialUserRequestBodySchema>;

/** 전역 store 를 위한 얕은 조건의 schema */
export const userSchemaInStore = userSchema.extend({
  grade: z.nativeEnum(FreeTrialUserGrade, { message: '학년을 선택해주세요' }).nullable(),
});

export type UserInStore = z.infer<typeof userSchemaInStore>;

export const freeTrialSchemaInStore = freeTrialSchema.extend({
  semester: z.nativeEnum(Semester, { message: '학기를 선택해주세요' }).nullable(),
});

export type FreeTrialInStore = z.infer<typeof freeTrialSchemaInStore>;
