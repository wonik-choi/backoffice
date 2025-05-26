import { create } from 'zustand';

import { FormStep, FreeTrialUserState } from './interface';
import { FreeTrialUserGrade, Semester } from '@/entities/free-trial-user/models/enums';
import { Promotion, Rental, UserInStore, FreeTrialInStore } from '../../config/schema';

export const useRegisterFreeTrialStore = create<FreeTrialUserState>()((set) => ({
  user: {
    name: '',
    phoneNumber: undefined,
    parentName: '',
    parentPhoneNumber: '',
    school: '',
    grade: null,
  },
  freeTrial: {
    startDate: '',
    schedules: [],
    semester: null,
  },
  rental: undefined,
  promotion: undefined,
  currentStep: FormStep.ParentInfo,
  currentDirection: 1,
  isFirstMountDetailSpecialCourseSchedule: true,

  // Actions
  setName: (name: string) => set((state) => ({ user: { ...state.user, name } })),
  setPhoneNumber: (phoneNumber: string) => set((state) => ({ user: { ...state.user, phoneNumber } })),
  setParentName: (parentName: string) => set((state) => ({ user: { ...state.user, parentName } })),
  setParentPhoneNumber: (parentPhoneNumber: string) => set((state) => ({ user: { ...state.user, parentPhoneNumber } })),
  setStudentInformation: (student: Partial<UserInStore>) => set((state) => ({ user: { ...state.user, ...student } })),
  setSchool: (school: string) => set((state) => ({ user: { ...state.user, school } })),
  setGrade: (grade: FreeTrialUserGrade) => set((state) => ({ user: { ...state.user, grade } })),
  setSchoolInformation: (school: Partial<UserInStore>) => set((state) => ({ user: { ...state.user, ...school } })),
  setFreeTrialStartDate: (startDate: string) => set((state) => ({ freeTrial: { ...state.freeTrial, startDate } })),
  setFreeTrialSchedule: (schedules: FreeTrialInStore['schedules']) =>
    set((state) => ({ freeTrial: { ...state.freeTrial, schedules } })),
  setSemester: (semester: Semester) => set((state) => ({ freeTrial: { ...state.freeTrial, semester } })),
  setRental: (rental: Rental) => set({ rental }),
  setPromotion: (promotion: Promotion) => set({ promotion }),
  nextStep: () => set((state) => ({ ...state, currentStep: state.currentStep + 1, currentDirection: 1 })),
  prevStep: () => set((state) => ({ ...state, currentStep: state.currentStep - 1, currentDirection: -1 })),
  goToStep: (step) => set({ currentStep: step, currentDirection: 1 }),
  backToStep: (step) => set({ currentStep: step, currentDirection: -1 }),
  setFirstMountDetailSpecialCourse: (isMounted: boolean) => set({ isFirstMountDetailSpecialCourseSchedule: isMounted }),
  resetForm: () =>
    set({
      user: {
        name: '',
        phoneNumber: '',
        parentName: '',
        parentPhoneNumber: '',
        grade: null,
      },
      freeTrial: {
        startDate: '',
        schedules: [],
        semester: null,
      },
      rental: undefined,
      promotion: undefined,
      currentStep: FormStep.ParentInfo,
      currentDirection: 1,
    }),
}));
