// entities
import { FreeTrialUserGrade, Semester } from '@/entities/free-trial-user/models/enums';

// features
import { UserInStore, FreeTrialInStore, Rental, Promotion } from '@/features/register-free-trial/config/schema';

export enum FormStep {
  StudentInfo = 0,
  SchoolInfo = 1,
  StartDate = 2,
  Schedule = 3,
  Semester = 4,
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
  promotion: Promotion;
  /** 상세 입력폼 UI 연동 */
  currentStep: FormStep;
  currentDirection: 1 | -1;

  /** action */
  /**
   * @description
   * 개별적인 업데이트가 필요한 경우가 존재할 수 있고, 그렇기에 전체적인 업데이트와 구별할 예정
   */
  setName: (name: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setParentName: (parentName: string) => void;
  setParentPhoneNumber: (parentPhoneNumber: string) => void;
  setStudentInformation: (student: Partial<UserInStore>) => void;
  setSchool: (school: string) => void;
  setGrade: (grade: FreeTrialUserGrade) => void;
  setSchoolInformation: (school: Partial<UserInStore>) => void;
  setFreeTrialStartDate: (date: FreeTrialInStore['startDate']) => void;
  setFreeTrialSchedule: (schedule: FreeTrialInStore['schedule']) => void;
  setSemester: (semester: Semester) => void;
  setRental: (rental: Rental) => void;
  setPromotion: (promotion: Promotion) => void;

  /**
   * @description
   * 폼 이동 관련 상태
   */
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: FormStep) => void;

  /**
   * @description
   * 폼 초기화 관련 상태
   */
  resetForm: () => void;
}
