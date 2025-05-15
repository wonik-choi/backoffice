import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { FormStep, RegisterFreeTrialState } from './interface';

export const useRegisterFreeTrialStore = create<RegisterFreeTrialState>()(
  persist(
    (set) => ({
      student: {
        name: '',
        phoneNumber: '',
      },
      parent: {
        name: '',
        phoneNumber: '',
      },
      school: {
        name: '',
        grade: '',
      },
      schedule: {
        selectedSlots: [],
      },
      startDate: null,
      semester: {
        year: new Date().getFullYear(),
        semester: 1,
      },
      device: {
        isRenting: false,
        deviceType: undefined,
        address: undefined,
        agreedToTerms: false,
      },
      currentStep: FormStep.StudentInfo,
      formSessionToken: null,
      isSubmitting: false,
      isSubmitted: false,

      // Actions
      setStudent: (student) => set({ student }),
      setParent: (parent) => set({ parent }),
      setSchool: (school) => set({ school }),
      setSchedule: (schedule) => set({ schedule }),
      setStartDate: (startDate) => set({ startDate }),
      setSemester: (semester) => set({ semester }),
      setDevice: (device) => set({ device }),
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
      goToStep: (step) => set({ currentStep: step }),
      setFormSessionToken: (formSessionToken) => set({ formSessionToken }),
      setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
      setIsSubmitted: (isSubmitted) => set({ isSubmitted }),
      resetForm: () =>
        set({
          student: { name: '', phoneNumber: '' },
          parent: { name: '', phoneNumber: '' },
          school: { name: '', grade: '' },
          schedule: { selectedSlots: [] },
          startDate: null,
          semester: { year: new Date().getFullYear(), semester: 1 },
          device: { isRenting: false, deviceType: undefined, address: undefined, agreedToTerms: false },
          currentStep: FormStep.StudentInfo,
          isSubmitting: false,
          isSubmitted: false,
        }),
    }),
    {
      name: 'detail-form-storage',
    }
  )
);
