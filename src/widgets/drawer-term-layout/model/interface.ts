import { Dispatch, SetStateAction } from 'react';

export interface DrawerTermLayoutProps {
  openState: boolean;
  setOpenState: Dispatch<SetStateAction<boolean>>;
  agreeTerms: () => void;
  disagreeTerms?: () => void;
  children: React.ReactNode;
  title: string;
  titleClassName?: string;
  buttonText: string;
  leftButtonText?: string;
  isPending?: boolean;
}
