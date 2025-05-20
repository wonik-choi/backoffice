import { DayOfWeek } from '@/entities/free-trial-user/models/enums';
import { z } from 'zod';

export const schedulePageSchema = z.object({
  days: z
    .array(z.nativeEnum(DayOfWeek))
    .min(2, { message: '최소 2개 이상의 요일을 선택해주세요' })
    .max(4, { message: '최대 4개까지만 선택 가능합니다' }),
  startTime: z.object({
    hour: z.number().min(0, { message: '시작 시간을 입력해주세요' }),
    minute: z.number().min(0, { message: '시작 시간을 입력해주세요' }),
  }),
});

export type SchedulePageValues = z.infer<typeof schedulePageSchema>;
