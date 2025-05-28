// entities
import { FreeTrialUserGrade, Semester } from '@/entities/free-trial-user/models/enums';

// features
import { UserInStore, FreeTrialInStore, Rental, Promotion } from '@/features/register-free-trial/config/schema';

export enum FormStep {
  ParentInfo = 0,
  StudentInfo = 1,
  Schedule = 2,
  Semester = 3,
  StartDate = 4,
  DeviceSelection = 5,
  AddressEntry = 6,
  Promotion = 7,
  Completion = 8,
}

export interface FreeTrialUserState {
  /** Request 기반 schema */
  user: UserInStore;
  freeTrial: FreeTrialInStore;
  rental: Rental;
  promotions: Promotion[] | undefined;
  /** 상세 입력폼 UI 연동 */
  currentStep: FormStep;
  currentDirection: 1 | -1;
  /** 특강 수업 설명 첫 mount 여부 */
  isFirstMountDetailSpecialCourseSchedule: boolean;
  /** 유입 코드 */
  inflowCode: string | null;

  /** action */
  /**
   * @description
   * 개별적인 업데이트가 필요한 경우가 존재할 수 있고, 그렇기에 전체적인 업데이트와 구별할 예정
   */
  setParentInformation: (parent: Partial<UserInStore>) => void;
  setStudentInformation: (student: Partial<UserInStore>) => void;
  setSchoolInformation: (school: Partial<UserInStore>) => void;
  setFreeTrialStartDate: (date: FreeTrialInStore['startDate']) => void;
  setFreeTrialSchedule: (schedule: FreeTrialInStore['schedules']) => void;
  setSemester: (semester: Semester) => void;
  setRental: (rental: Rental) => void;
  setPromotion: (promotion: Promotion[]) => void;
  setFirstMountDetailSpecialCourse: (isMounted: boolean) => void;
  setInflowCode: (inflowCode: string | null) => void;
  resetRental: () => void;

  /**
   * @description
   * 폼 이동 관련 상태
   */
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: FormStep) => void;
  backToStep: (step: FormStep) => void;

  /**
   * @description
   * 폼 초기화 관련 상태
   */
  resetForm: () => void;
}
