import { DayOfWeek, FreeTrialUserGrade, Semester } from './enums';

import { InflowDto } from '@/entities/inflow/models/dtos';
import { NotificationDto } from '@/entities/notification/models/dtos';
import { EventHistoryDto } from '@/entities/event-history/models/dtos';
import { RentalDto } from '@/entities/rental/models/dtos';
import { PageableObject, SortObject } from '@/entities/common/dtos';

export interface Schedule {
  id: number;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  todayLearningTime: number;
}

export interface FreeTrial {
  id: number;
  startDate: string;
  endDate: string;
  trialDays: number;
  semester: Semester;
  schedules: Schedule[];
}

export interface FreeTrialUserDto {
  id: string;
  name: string;
  parentPhoneNumber: string;
  parentName: string;
  phoneNumber?: string;
  grade: FreeTrialUserGrade;
  createdAt: string;
  inflow: InflowDto;
  rental?: RentalDto;
  freeTrial: FreeTrial;
  latestNotifictaion: NotificationDto;
  latestEventHistory: EventHistoryDto;
}

// response

export interface PageFreeTrialUsersResponseDto {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  pageable: PageableObject;
  size: number;
  content: FreeTrialUserDto[];
  number: number;
  sort: SortObject;
  numberOfElements: number;
  empty: boolean;
}

export interface GetFreeTrialUsersResponseDto {
  freeTrialUsers: PageFreeTrialUsersResponseDto;
}

export interface FreeTrialApplicationsResponseDto {
  freeTrialUserEventUserId: string;
  freeTrialUserEventHistoryId: number;
  freeTrialId: number;
  rentalId: number;
  promotionParticipantIds: number[];
  userTermAgreementIds: number[];
}
