import { FreeTrialUserGrade, DayOfWeek, Semester } from '@/entities/free-trial-user/models/enums';

import { BadgeProps } from '@/views/register-free-trial/ui/components/Badge';
import { FreeTrialPageBadge } from '@/views/register-free-trial/model/interface';

/** grade option */
export const gradeOptions = [
  { value: FreeTrialUserGrade.ELEMENTARY4, label: '초등 4학년' },
  { value: FreeTrialUserGrade.ELEMENTARY5, label: '초등 5학년' },
  { value: FreeTrialUserGrade.ELEMENTARY6, label: '초등 6학년' },
  { value: FreeTrialUserGrade.MIDDLE1, label: '중등 1학년' },
  { value: FreeTrialUserGrade.MIDDLE2, label: '중등 2학년' },
  { value: FreeTrialUserGrade.MIDDLE3, label: '중등 3학년' },
];

/** 무료체험 최대 시간 */
export const MAX_FREE_TRIAL_TIME = 6;

/** 무료체험 시간 선택 */
export const FREE_TRIAL_TIMES: number[] = [4, 5, 6, 7, 8, 9, 10, 11];
export const MAPPING_START_TIME_HOUR_TO_SCHEDULE = {
  4: { hour: 4, minute: 0 },
  5: { hour: 5, minute: 0 },
  6: { hour: 6, minute: 0 },
  7: { hour: 7, minute: 0 },
  8: { hour: 8, minute: 0 },
  9: { hour: 9, minute: 0 },
  10: { hour: 10, minute: 0 },
  11: { hour: 11, minute: 0 },
};

/** 무료체험 요일 옵션 */
export const DAY_OF_WEEK_FREE_TRIAL_OPTIONS: Omit<FreeTrialPageBadge<DayOfWeek>, 'onClick'>[] = [
  {
    label: '월요일',
    badgeValue: DayOfWeek.MONDAY,
    selected: false,
    disabled: false,
  },
  {
    label: '화요일',
    badgeValue: DayOfWeek.TUESDAY,
    selected: false,
    disabled: false,
  },
  {
    label: '수요일',
    badgeValue: DayOfWeek.WEDNESDAY,
    selected: false,
    disabled: false,
  },
  {
    label: '목요일',
    badgeValue: DayOfWeek.THURSDAY,
    selected: false,
    disabled: false,
  },
  {
    label: '금요일',
    badgeValue: DayOfWeek.FRIDAY,
    selected: false,
    disabled: false,
  },
];

/** 무료체험 시간 옵션 */
export const FREE_TRIAL_TIME_OPTIONS: Omit<FreeTrialPageBadge<number>, 'onClick'>[] = [
  {
    label: '4시',
    badgeValue: 4,
    selected: false,
    disabled: false,
  },
  {
    label: '5시',
    badgeValue: 5,
    selected: false,
    disabled: false,
  },
  {
    label: '6시',
    badgeValue: 6,
    selected: false,
    disabled: false,
  },
  {
    label: '7시',
    badgeValue: 7,
    selected: false,
    disabled: false,
  },
  {
    label: '8시',
    badgeValue: 8,
    selected: false,
    disabled: false,
  },
  {
    label: '9시',
    badgeValue: 9,
    selected: false,
    disabled: false,
  },
  {
    label: '10시',
    badgeValue: 10,
    selected: false,
    disabled: false,
  },
  {
    label: '11시',
    badgeValue: 11,
    selected: false,
    disabled: false,
  },
];

/** 무료체험 학기 옵션 */
export const SEMESTER_OPTIONS = [
  { value: Semester.M1S1, label: '1학년 1학기' },
  { value: Semester.M1S2, label: '1학년 2학기' },
  { value: Semester.M2S1, label: '2학년 1학기' },
  { value: Semester.M2S2, label: '2학년 2학기' },
  { value: Semester.M3S1, label: '3학년 1학기' },
  { value: Semester.M3S2, label: '3학년 2학기' },
];
