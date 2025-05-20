import { create } from 'zustand';

import { FormStep, FreeTrialUserState } from './interface';
import { FreeTrialUserGrade, Semester } from '@/entities/free-trial-user/models/enums';
import { Promotion, Rental, UserInStore, FreeTrialInStore } from '../../config/schema';

export const useRegisterFreeTrialStore = create<FreeTrialUserState>()((set) => ({
  user: {
    name: '',
    phoneNumber: '',
    parrentName: '',
    parrentPhoneNumber: '',
    school: '',
    grade: null,
  },
  freeTrial: {
    startDate: '',
    schedule: [],
    semester: null,
  },
  rental: undefined,
  promotion: undefined,
  currentStep: FormStep.StudentInfo,
  currentDirection: 1,

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
  setFreeTrialSchedule: (schedule: FreeTrialInStore['schedule']) =>
    set((state) => ({ freeTrial: { ...state.freeTrial, schedule } })),
  setSemester: (semester: Semester) => set((state) => ({ freeTrial: { ...state.freeTrial, semester } })),
  setRental: (rental: Rental) => set({ rental }),
  setPromotion: (promotion: Promotion) => set({ promotion }),
  nextStep: () => set((state) => ({ ...state, currentStep: state.currentStep + 1, currentDirection: 1 })),
  prevStep: () => set((state) => ({ ...state, currentStep: state.currentStep - 1, currentDirection: -1 })),
  goToStep: (step) => set({ currentStep: step }),
  resetForm: () =>
    set({
      user: {
        name: '',
        phoneNumber: '',
        parrentName: '',
        parrentPhoneNumber: '',
        grade: FreeTrialUserGrade.ELEMENTARY4,
      },
      freeTrial: {
        startDate: '',
        schedule: [],
        semester: Semester.M1S1,
      },
      rental: undefined,
      promotion: undefined,
      currentStep: FormStep.StudentInfo,
      currentDirection: 1,
    }),
}));
