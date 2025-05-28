import { Dispatch, SetStateAction } from 'react';

/** 무료 체험 1차 신청 시 동의 사항 */
export interface ApplyFreeTrialTempUserTermsProps {
  openState: boolean;
  setOpenState: Dispatch<SetStateAction<boolean>>;
  agreeTerms: () => void;
  disagreeTerms?: () => void;
}
