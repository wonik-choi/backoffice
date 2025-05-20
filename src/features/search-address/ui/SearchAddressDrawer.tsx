'use client';
import { useState, SetStateAction, Dispatch } from 'react';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/shared/components/atomics/drawer';
import { Button } from '@/shared/components/atomics/button';
import { DrawerLayout } from '@/shared/components/drawer-layout/DrawerLayout';

import DaumSearchComponent from '@/features/search-address/ui/DaumSearchComponent';
import type { DaumPostcodeResultDto } from '@/features/search-address/model/dtos';

export const SearchAddressDrawer = ({
  setForm,
  children,
}: {
  setForm: (data: DaumPostcodeResultDto) => void;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const handleSelectAddress = (data: DaumPostcodeResultDto) => {
    setForm(data);
    setOpen(false);
  };

  return (
    <DrawerLayout
      openState={open}
      setOpenState={setOpen}
      callbackConfirm={() => setOpen(false)}
      title="주소를 검색해주세요"
      buttonText="취소"
      trrigerChildren={children}
    >
      <DaumSearchComponent complete={handleSelectAddress} />
    </DrawerLayout>
  );
};
