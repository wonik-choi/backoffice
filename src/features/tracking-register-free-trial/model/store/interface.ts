export interface TrackingRegisterFreeTrialState {
  /**
   * @description
   * 현재 진행 상태를 파악하여 tracker 를 내려주기 위함이기에, 상태값을 따로 지정하지 않습니다.
   * 대신 중복되지 않도록 처리가 되면 될 것 같은데 new Set 을 활용해도 좋아보입니다.
   */
  steps: Set<number>;

  /** action */
  addStep: (step: number) => void;
  hasStep: (step: number) => boolean;

  /**
   * @description
   * steps 초기화 (필요하다면)
   */
  resetSteps: () => void;
}

export interface StepTrackerProps {
  step: number;
  eventName: string;
  eventParams?: Record<string, string>;
  /** 예외 사항이 있다면 true 로 해줍니다 */
  exception?: boolean;
}
