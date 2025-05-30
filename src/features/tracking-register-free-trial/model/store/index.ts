import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { TrackingRegisterFreeTrialState } from '@/features/tracking-register-free-trial/model/store/interface';

export const useTrackingRegisterFreeTrialStore = create<TrackingRegisterFreeTrialState>()(
  devtools((set, get) => ({
    steps: new Set(),

    // Actions
    addStep: (step: number) =>
      set((state) => ({ steps: state.steps.add(step) }), undefined, 'TrackingRegisterFreeTrial/addStep'),
    resetSteps: () => set({ steps: new Set() }, undefined, 'TrackingRegisterFreeTrial/resetSteps'),
  }))
);
