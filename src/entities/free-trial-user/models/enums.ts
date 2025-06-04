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

export enum NotificationType {
  /** 랜딩 페이지를 통한 무료체험 신청 후 */
  PRE_FREE_TRIAL_FORM_SUBMITTED = 'PRE_FREE_TRIAL_FORM_SUBMITTED',
  /** 무료체험 신청 후 추가정보 폼 제출 후 */
  POST_FREE_TRIAL_FORM_SUBMITTED = 'POST_FREE_TRIAL_FORM_SUBMITTED',
  /** 무료체험 시작 하루 전 */
  BEFORE_ONE_DAY_LEFT = 'BEFORE_ONE_DAY_LEFT',
}

export enum DeviceType {
  IOS_TABLET = 'IOS_TABLET',
  ANDROID_TABLET = 'ANDROID_TABLET',
}

export enum AddressType {
  /** 도로명 */
  R = 'R',
  /** 지번 */
  J = 'J',
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

export enum PromotionTermCode {
  /** 동아 프로모션 */
  PROMOTION_001 = 'PROMOTION_001',
}

export enum RentalTermCode {
  RENTAL_001 = 'RENTAL_001',
}

export enum PeriodType {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
}

export enum AdChannel {
  /** 페이스북 */
  FACEBOOK = 'FACEBOOK',
  /** 네이버검색 */
  NAVER_SEARCH = 'NAVER_SEARCH',
  /** 네이버(블로그) */
  NAVER_BLOG = 'NAVER_BLOG',
  /** 인스타그램 스토리 */
  INSTAGRAM_STORY = 'INSTAGRAM_STORY',
  /** 링크트리 */
  LINK_TREE = 'LINK_TREE',
  /** 인스타그램 피드 */
  INSTAGRAM_FEED = 'INSTAGRAM_FEED',
  /** 카카오플러스친구 */
  KAKAO_PLUS_FRIEND = 'KAKAO_PLUS_FRIEND',
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

export enum FreeTrialUserEvent {
  /** 알림톡을 통한 무료 체험 신청서(무료체험 확장) */
  SUBMIT_DETAIL_APPLICATION_FORM = 'SUBMIT_DETAIL_APPLICATION_FORM',
  /** 오픈 채팅방 입장 */
  ENTER_OPEN_CHAT = 'ENTER_OPEN_CHAT',
  /** 무료체험 시작 */
  START = 'START',
  /** 무료체험 종료 */
  COMPLETE = 'COMPLETE',
  /** 무료체험 중단 */
  STOP = 'STOP',
  /** 무료체험 취소 */
  CANCEL = 'CANCEL',
  /** 입학 (결제완료) */
  ENROLL = 'ENROLL',
  /** 상담 진행 및 완료 */
  CONSULTED = 'CONSULTED',
}
