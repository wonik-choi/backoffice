import {
  AdChannel,
  AddressType,
  DayOfWeek,
  DeviceType,
  FreeTrialUserEvent,
  FreeTrialUserGrade,
  NotificationType,
  Semester,
} from './enums';

export interface FreeTrialApplicationsResponseDto {
  freeTrialUserEventUserId: string;
  freeTrialUserEventHistoryId: number;
  freeTrialId: number;
  rentalId: number;
  promotionParticipantIds: number[];
  userTermAgreementIds: number[];
}

export interface PromotionOptionDto {
  id: number;
  payload: {
    title: string;
    copies: number;
    months: number;
    magazineType: string;
  };
  createdAt: string | null;
}

export interface PromotionDto {
  id: number;
  promotionCode: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  options: PromotionOptionDto[];
}

export interface GetFreeTrialPromotionsResponseDto {
  promotions: PromotionDto[];
}

/** getFreeTrialUserList */

// 아마 entity
export interface Referrer {
  id: number;
  name: string;
  phoneNumber: string;
}

export interface InflowDetail {
  type: string;
  groupName: string;
  referrer: Referrer;
}

// 아마 entity
export interface Inflow {
  id: number;
  code: string;
  inflowSource: AdChannel;
  detail: InflowDetail;
}

export interface Rental {
  id: number;
  zonecode: string;
  address: string;
  addressType: AddressType;
  detailAddress: string;
  rentalStartDate: string;
  rentalEndDate: string;
  rentalReturnDate: string;
  deviceType: DeviceType;
  deviceModel: string;
  deviceNumber: string;
  createdAt: string;
}

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

export interface Notification {
  id: number;
  type: NotificationType;
  isSuccess: boolean;
  createdAt: string;
}

export interface EventHistory {
  id: number;
  userEvent: FreeTrialUserEvent;
  createdAt: string;
}

export interface SortObject {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

export interface PageableObject {
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: SortObject;
  unpaged: boolean;
  paged: boolean;
}

export interface FreeTrialUserDto {
  id: string;
  name: string;
  parentPhoneNumber: string;
  parentName: string;
  phoneNumber?: string;
  grade: FreeTrialUserGrade;
  createdAt: string;
  inflow: Inflow;
  rental?: Rental;
  freeTrial: FreeTrial;
  latestNotifictaion: Notification;
  latestEventHistory: EventHistory;
}

export interface PageFreeTrialUsersResponseDto {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
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
