import { Dispatch, SetStateAction } from 'react';

/** 기기 대여 주의사항 */
export interface DeviceRentalTermsProps {
  openState: boolean;
  setOpenState: Dispatch<SetStateAction<boolean>>;
  agreeTerms: () => void;
  isPending?: boolean;
}

/** scheduleSelection */
export interface ScheduleSectionLayoutProps {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  delay?: number;
  settingCorrectLearningTime?: boolean;
}

/** badge */
export interface FreeTrialPageBadge<T> {
  label: string;
  badgeValue: T;
  selected?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

/** 페이지들의 steps props */
export interface StepProps {
  currentStep: number;
  totalSteps: number;
  onCompleteSubmitForm?: (args?: any) => void;
  onPendingSubmitForm?: boolean;
}
