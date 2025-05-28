import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// entities
import { FreeTrialUserGrade } from '@/entities/free-trial-user/models/enums';

import { ApplyFreeTrialState } from '@/features/apply-free-trial/model/store/interface';
import { ApplyFreeTrialForm } from '@/features/apply-free-trial/config/schema';

export const useApplyFreeTrialStore = create<ApplyFreeTrialState>()(
  devtools((set) => ({
    tempUser: {
      studentName: '',
      callablePhoneNumber: '',
      grade: FreeTrialUserGrade.ElementarySchool4,
      terms: [],
    },
    inflowCode: null,

    // Actions
    setTempUser: (tempUser: ApplyFreeTrialForm) => set({ tempUser }, undefined, 'ApplyFreeTrial/setTempUser'),
    setInflowCode: (inflowCode: string | null) => set({ inflowCode }, undefined, 'ApplyFreeTrial/setInflowCode'),

    resetForm: () =>
      set({
        tempUser: {
          studentName: '',
          callablePhoneNumber: '',
          grade: FreeTrialUserGrade.ElementarySchool4,
          terms: [],
        },
        inflowCode: null,
      }),
  }))
);
