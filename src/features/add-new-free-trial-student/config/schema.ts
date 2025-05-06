import { z } from 'zod';
import { statusOptions, deviceRentalOptions } from '@/features/add-new-free-trial-student/models/const';

export const freeTrialStudentSchema = z.object({
  studentName: z.string().min(1, '학생 이름을 입력해주세요.'),
  phone: z.string().regex(/^01[016789]-\d{3,4}-\d{4}$/, '전화번호 형식이 올바르지 않습니다.'),
  enterancePath: z.string().min(1, '입장 경로를 입력해주세요.'),
  status: z.enum(statusOptions),
  parentName: z.string().optional(),
  parentPhone: z
    .string()
    .regex(/^01[016789]-\d{3,4}-\d{4}$/, '전화번호 형식이 올바르지 않습니다.')
    .optional(),
  deviceRental: z.enum(deviceRentalOptions),
  memo: z.string().optional(),
});

export type FreeTrialStudentForm = z.infer<typeof freeTrialStudentSchema>;
