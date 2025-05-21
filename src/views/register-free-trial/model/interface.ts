import { Dispatch, SetStateAction } from 'react';

/** 기기 대여 주의사항 */
export interface DeviceRentalTermsProps {
  openState: boolean;
  setOpenState: Dispatch<SetStateAction<boolean>>;
  agreeTerms: () => void;
}

/** scheduleSelection */
export interface ScheduleSectionLayoutProps {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  delay?: number;
}

/** badge */
export interface FreeTrialPageBadge<T> {
  label: string;
  badgeValue: T;
  selected?: boolean;
  disabled?: boolean;
  onClick: () => void;
}
