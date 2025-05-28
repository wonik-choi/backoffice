// features
import { ApplyFreeTrialForm } from '@/features/apply-free-trial/config/schema';

export interface ApplyFreeTrialState {
  /** Request 기반 schema */
  tempUser: ApplyFreeTrialForm;
  /** 유입 코드 */
  inflowCode: string | null;

  /** action */
  /**
   * @description
   * 개별적인 업데이트가 필요한 경우가 존재할 수 있고, 그렇기에 전체적인 업데이트와 구별할 예정
   */
  setTempUser: (tempUser: ApplyFreeTrialForm) => void;
  setInflowCode: (inflowCode: string | null) => void;

  /**
   * @description
   * 폼 초기화 관련 상태
   */
  resetForm: () => void;
}
