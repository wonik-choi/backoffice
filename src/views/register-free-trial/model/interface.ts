import { Dispatch, SetStateAction } from 'react';

/** 기기 대여 주의사항 */
export interface DeviceRentalTermsProps {
  openState: boolean;
  setOpenState: Dispatch<SetStateAction<boolean>>;
  agreeTerms: () => void;
}
