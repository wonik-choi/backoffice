export enum FreeTrialUserGrade {
  ElementarySchool1 = 'ELEMENTARY_1',
  ElementarySchool2 = 'ELEMENTARY_2',
  ElementarySchool3 = 'ELEMENTARY_3',
  ElementarySchool4 = 'ELEMENTARY_4',
  ElementarySchool5 = 'ELEMENTARY_5',
  ElementarySchool6 = 'ELEMENTARY_6',
  MiddleSchool1 = 'MIDDLE_1',
  MiddleSchool2 = 'MIDDLE_2',
  MiddleSchool3 = 'MIDDLE_3',
  HighSchool1 = 'HIGH_1',
  HighSchool2 = 'HIGH_2',
  HighSchool3 = 'HIGH_3',
}

export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export enum EmployeeDepartment {
  /** 대표이사실 */
  EXECUTIVE_OFFICE = 'EXECUTIVE_OFFICE',
  /** 기획실 */
  PLANNING_OFFICE = 'PLANNING_OFFICE',
  /** 수학컨텐츠팀 */
  MATH_CONTENT_TEAM = 'MATH_CONTENT_TEAM',
  /** 웹툰팀 */
  WEBTOON_TEAM = 'WEBTOON_TEAM',
  /** 개발실 */
  DEVELOPMENT_OFFICE = 'DEVELOPMENT_OFFICE',
  /** 개발팀 */
  DEVELOPMENT_TEAM = 'DEVELOPMENT_TEAM',
  /** 기획팀 */
  PLANNING_TEAM = 'PLANNING_TEAM',
  /** 마케팅팀 */
  MARKETING_TEAM = 'MARKETING_TEAM',
}

export enum EmployeeRole {
  /** 대표이사 */
  CEO = 'CEO',
  /** 부사장 */
  VP = 'VP',
  /** 실장 */
  DIRECTOR = 'DIRECTOR',
  /** 팀장 */
  TEAM_LEADER = 'TEAM_LEADER',
  /** 사원 */
  STAFF = 'STAFF',
}

export enum TermDefinitionType {
  /** 임시 유저 약관 */
  TEMP_USER_AGREEMENT = 'TEMP_USER_AGREEMENT',
  /** 렌탈 약관 */
  RENTAL_AGREEMENT = 'RENTAL_AGREEMENT',
  /** 프로모션 약관 */
  PROMOTION_AGREEMENT = 'PROMOTION_AGREEMENT',
}

export enum NormalizedDayOfWeek {
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
  SUNDAY = 0,
}

export enum Semester {
  MIDDLE_FIRST_H1 = 'MIDDLE_FIRST_H1',
  MIDDLE_FIRST_H2 = 'MIDDLE_FIRST_H2',
  MIDDLE_SECOND_H1 = 'MIDDLE_SECOND_H1',
  MIDDLE_SECOND_H2 = 'MIDDLE_SECOND_H2',
  MIDDLE_THIRD_H1 = 'MIDDLE_THIRD_H1',
  MIDDLE_THIRD_H2 = 'MIDDLE_THIRD_H2',
}

export enum PeriodType {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
}

export enum ReferrerType {
  /** 임직원 */
  EMPLOYEE = 'EMPLOYEE',
  /** 제휴사직원 */
  EMPLOYEE_PARTNER = 'EMPLOYEE_PARTNER',
  /** 제휴처 */
  PARTNER_CORPORATE = 'PARTNER_CORPORATE',
  /** 개인 제휴자 */
  PARTNER_INDIVIDUAL = 'PARTNER_INDIVIDUAL',
  /** 커뮤니티/인플루언서 */
  INFLUENCER = 'INFLUENCER',
  /** 기존 고객의 추천 */
  CUSTOMER_REFERRAL = 'CUSTOMER_REFERRAL',
  /** 기타 */
  ETC = 'ETC',
}
