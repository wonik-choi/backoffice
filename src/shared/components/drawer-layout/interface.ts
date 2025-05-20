import { Dispatch, SetStateAction } from 'react';

export interface DrawerLayoutProps {
  openState: boolean;
  setOpenState: Dispatch<SetStateAction<boolean>>;
  callbackConfirm: () => void;
  children: React.ReactNode;
  title: string;
  buttonText: string;
  titleClassName?: string;
  trrigerChildren: React.ReactNode;
}
