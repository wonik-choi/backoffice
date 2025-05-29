import { FreeTrialUserGrade, DayOfWeek, Semester } from '@/entities/free-trial-user/models/enums';

import { BadgeProps } from '@/views/register-free-trial/ui/components/Badge';
import { FreeTrialPageBadge } from '@/views/register-free-trial/model/interface';

/** grade option */
export const gradeOptions = [
  { value: FreeTrialUserGrade.ElementarySchool3, label: '초3' },
  { value: FreeTrialUserGrade.ElementarySchool4, label: '초4' },
  { value: FreeTrialUserGrade.ElementarySchool5, label: '초5' },
  { value: FreeTrialUserGrade.ElementarySchool6, label: '초6' },
  { value: FreeTrialUserGrade.MiddleSchool1, label: '중1' },
  { value: FreeTrialUserGrade.MiddleSchool2, label: '중2' },
  { value: FreeTrialUserGrade.MiddleSchool3, label: '중3' },
];

/** 무료체험 최대 시간 */
export const MAX_FREE_TRIAL_TIME = 6;

/**
 * @description
 * 무료체험 선택 가능 Range
 * 오후 4시부터 오후 11시까지 30분 단위 수치
 * 예시) 오후 4시 반 = 30, 오후 5시 = 60, 오후 5시 반 = 90, ...
 */
export const FREE_TRIAL_TIME_RANGE = Array.from({ length: 8 }, (_, i) => i * 60);

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
  { value: Semester.MIDDLE_FIRST_H1, label: '1학년 1학기' },
  { value: Semester.MIDDLE_FIRST_H2, label: '1학년 2학기' },
  { value: Semester.MIDDLE_SECOND_H1, label: '2학년 1학기' },
  { value: Semester.MIDDLE_SECOND_H2, label: '2학년 2학기' },
  { value: Semester.MIDDLE_THIRD_H1, label: '3학년 1학기' },
  { value: Semester.MIDDLE_THIRD_H2, label: '3학년 2학기' },
];
