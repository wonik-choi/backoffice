import { FreeTrialUserEvent, PeriodType } from '@/entities/free-trial-user/models/enums';
import { freeTrialUserBehavior } from '@/entities/free-trial-user/models/behaviors/FreeTrialUserBehavior';

/**
 * @description
 * 무료체험 유저의 상태 필터 옵션
 */
export const freeTrialUserStatusOptions = Object.values(FreeTrialUserEvent).map((event) =>
  freeTrialUserBehavior.mapFreeTrialUserEventToStatus(event)
);
export type FreeTrialUserStatusOption = (typeof freeTrialUserStatusOptions)[number];

/**
 * @description
 * 무료체험 유저의 디바이스 대여 상태 필터 옵션
 * TODO: 추후 patch api 생성 시 해당 status 조정 필요
 */
export const freeTrialUserDeviceRentalOptions = ['대여중', '반납완료', '미반납'] as const;
export type FreeTrialUserDeviceRentalOption = (typeof freeTrialUserDeviceRentalOptions)[number];

export const FREE_TRIAL_USER_STATUS = 'status' as const;
export const FREE_TRIAL_USER_DEVICE_RENTAL_STATUS = 'upgrade.completionStatus' as const;

export const FREE_TRIAL_USER_PERIOD_TYPE = Object.values(PeriodType).map((periodType) => ({
  value: periodType,
  label: periodType,
}));
