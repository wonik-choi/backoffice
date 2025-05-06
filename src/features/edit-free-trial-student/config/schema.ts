import { z } from 'zod';

export const EditFreeTrialStudentSchema = z.object({
  name: z.string().min(1, '학생 이름을 입력해주세요.').optional(),
  phone: z
    .string()
    .regex(/^01[016789]-\d{3,4}-\d{4}$/, '전화번호 형식이 올바르지 않습니다.')
    .optional(),
  registrationDate: z.date().optional(),
  enterancePath: z.string().min(1, '입장 경로를 입력해주세요.').optional(),
  testPeriod: z
    .object({
      startDate: z.date().optional(),
      endDate: z.date().optional(),
    })
    .refine(
      (data) => {
        if (!data.startDate || !data.endDate) return true;
        return data.endDate >= data.startDate;
      },
      {
        message: '시작일이 종료일보다 이전일 수 없습니다.',
        path: ['endDate'],
      }
    ),
  deviceRental: z
    .object({
      deviceRentalAddress: z.string().optional(),
      rentalDate: z.date().optional(),
      returnDate: z.date().optional(),
    })
    .refine(
      (data) => {
        if (!data.rentalDate || !data.returnDate) return true;
        return data.returnDate >= data.rentalDate;
      },
      {
        message: '대여일이 반납일보다 이전일 수 없습니다.',
        path: ['returnDate'],
      }
    ),
});

export type EditFreeTrialStudentForm = z.infer<typeof EditFreeTrialStudentSchema>;
