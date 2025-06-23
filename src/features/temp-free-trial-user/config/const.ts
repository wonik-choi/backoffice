import { FreeTrialUserGrade } from '@/entities/free-trial-user/models/enums';

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
