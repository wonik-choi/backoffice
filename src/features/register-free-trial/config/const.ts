import { FreeTrialUserGrade, DayOfWeek, Semester } from '@/entities/free-trial-user/models/enums';

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

/** schedule option */
export const hourOptions = [
  { value: 16, label: '4시' },
  { value: 17, label: '5시' },
  { value: 18, label: '6시' },
  { value: 19, label: '7시' },
  { value: 20, label: '8시' },
  { value: 21, label: '9시' },
  { value: 22, label: '10시' },
  { value: 23, label: '11시' },
];

export const minuteOptions = [
  { value: 0, label: '00분' },
  { value: 30, label: '30분' },
];

export const dayOptions = [
  { value: DayOfWeek.MONDAY, label: '월요일' },
  { value: DayOfWeek.TUESDAY, label: '화요일' },
  { value: DayOfWeek.WEDNESDAY, label: '수요일' },
  { value: DayOfWeek.THURSDAY, label: '목요일' },
  { value: DayOfWeek.FRIDAY, label: '금요일' },
  { value: DayOfWeek.SATURDAY, label: '토요일' },
  { value: DayOfWeek.SUNDAY, label: '일요일' },
];

export const semesterOptions = [
  { value: Semester.MIDDLE_FIRST_H1, label: '1학년 1학기' },
  { value: Semester.MIDDLE_FIRST_H2, label: '1학년 2학기' },
  { value: Semester.MIDDLE_SECOND_H1, label: '2학년 1학기' },
  { value: Semester.MIDDLE_SECOND_H2, label: '2학년 2학기' },
  { value: Semester.MIDDLE_THIRD_H1, label: '3학년 1학기' },
  { value: Semester.MIDDLE_THIRD_H2, label: '3학년 2학기' },
];

/** dongascience option */
export const dongascienceOptionIds = [
  { value: 1, label: '어린이과학동아 2개월 (4권)' },
  { value: 2, label: '어린이수학동아 2개월 (4권)' },
  { value: 3, label: '과학동아 3개월 (3권)' },
];

/** inflow option */
export const inflowOptions = [
  { value: 'HP_269774', label: '홈페이지 배너' },
  { value: 'AD_K2J4XC', label: '메타 및 인스타그램' },
  { value: 'AD_N81ZPG', label: '네이버 검색' },
  { value: 'AD_R5UJQK', label: '네이버 블로그' },
  { value: 'AD_ZQPWX7', label: '인스타그램 스토리' },
  { value: 'DL_GOM001', label: '책 읽는 곰' },
  { value: 'DL_CARROT1', label: '인플루언서(캐롯맘)' },
  { value: 'DL_DONGASCI001', label: '동아사이언스 유입' },
];
