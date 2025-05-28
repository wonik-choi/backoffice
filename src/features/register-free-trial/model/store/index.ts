import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { FormStep, FreeTrialUserState } from './interface';
import { FreeTrialUserGrade, Semester } from '@/entities/free-trial-user/models/enums';
import { Promotion, Rental, UserInStore, FreeTrialInStore } from '../../config/schema';

export const useRegisterFreeTrialStore = create<FreeTrialUserState>()(
  devtools((set) => ({
    user: {
      name: '',
      phoneNumber: undefined,
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
    promotions: undefined,
    currentStep: FormStep.ParentInfo,
    currentDirection: 1,
    isFirstMountDetailSpecialCourseSchedule: true,
    inflowCode: null,

    // Actions
    setParentInformation: (parent: Partial<UserInStore>) =>
      set((state) => ({ user: { ...state.user, ...parent } }), undefined, 'RegisterfreeTrial/setParentInformation'),
    setStudentInformation: (student: Partial<UserInStore>) =>
      set((state) => ({ user: { ...state.user, ...student } }), undefined, 'RegisterfreeTrial/setStudentInformation'),
    setSchoolInformation: (school: Partial<UserInStore>) =>
      set((state) => ({ user: { ...state.user, ...school } }), undefined, 'RegisterfreeTrial/setSchoolInformation'),
    setFreeTrialStartDate: (startDate: string) =>
      set(
        (state) => ({ freeTrial: { ...state.freeTrial, startDate } }),
        undefined,
        'RegisterfreeTrial/setFreeTrialStartDate'
      ),
    setFreeTrialSchedule: (schedules: FreeTrialInStore['schedules']) =>
      set(
        (state) => ({ freeTrial: { ...state.freeTrial, schedules } }),
        undefined,
        'RegisterfreeTrial/setFreeTrialSchedule'
      ),
    setSemester: (semester: Semester) =>
      set((state) => ({ freeTrial: { ...state.freeTrial, semester } }), undefined, 'RegisterfreeTrial/setSemester'),
    setRental: (rental: Rental) => set({ rental }, undefined, 'RegisterfreeTrial/setRental'),
    setPromotion: (promotions: Promotion[]) => set({ promotions }, undefined, 'RegisterfreeTrial/setPromotion'),
    nextStep: () => set((state) => ({ ...state, currentStep: state.currentStep + 1, currentDirection: 1 })),
    prevStep: () => set((state) => ({ ...state, currentStep: state.currentStep - 1, currentDirection: -1 })),
    goToStep: (step) => set({ currentStep: step, currentDirection: 1 }),
    backToStep: (step) => set({ currentStep: step, currentDirection: -1 }),
    setFirstMountDetailSpecialCourse: (isMounted: boolean) =>
      set(
        { isFirstMountDetailSpecialCourseSchedule: isMounted },
        undefined,
        'RegisterfreeTrial/setFirstMountDetailSpecialCourse'
      ),
    setInflowCode: (inflowCode: string | null) => set({ inflowCode }, undefined, 'RegisterfreeTrial/setInflowCode'),
    resetRental: () => set({ rental: undefined }, undefined, 'RegisterfreeTrial/resetRental'),

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
        promotions: undefined,
        currentStep: FormStep.ParentInfo,
        currentDirection: 1,
      }),
  }))
);
