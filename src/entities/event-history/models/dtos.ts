import { FreeTrialUserEvent } from '@/entities/event-history/models/enums';

export interface EventHistoryDto {
  id: number;
  userEvent: FreeTrialUserEvent;
  createdAt: string;
}
