'use client';

import { useEffect } from 'react';

// shared
import * as pbq from '@/shared/lib/meta-pixel/fpixel';

// features
import type { StepTrackerProps } from '@/features/tracking-register-free-trial/model/store/interface';
import { useTrackingRegisterFreeTrialStore } from '@/features/tracking-register-free-trial/model/store';

export const useStepTracker = ({ step, eventName, eventParams, exception = false }: StepTrackerProps) => {
  const { addStep, hasStep } = useTrackingRegisterFreeTrialStore();

  useEffect(() => {
    // 브라우저에서 실행되지 않는 경우 넘어갑니다.
    if (typeof window === 'undefined') return;

    // 이미 tracking 되어있다면 넘어갑니다.
    if (hasStep(step)) return;

    // tracking 되진 않았지만 예외사항이라면 이벤트를 던지진 말고 진행사항으로 추가해줍니다.
    if (exception) {
      addStep(step);
      return;
    }

    // tracking 합니다.
    pbq.customEvent(eventName, eventParams);
    addStep(step);

    // eventParams 는 객체이기에 넣지 않습니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, eventName, exception, hasStep, addStep]);
};
