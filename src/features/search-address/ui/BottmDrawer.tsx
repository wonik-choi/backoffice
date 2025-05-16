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

import DaumSearchComponent from '@/features/search-address/ui/DaumSearchComponent';
import type { DaumPostcodeResultDto } from '@/features/search-address/model/dtos';

const BottomDrawer = ({ setForm }: { setForm: Dispatch<SetStateAction<any>> }) => {
  const [open, setOpen] = useState(false);

  const handleSelectAddress = (data: DaumPostcodeResultDto) => {
    const { address, zonecode } = data;
    setForm((prev: any) => ({
      ...prev,
      address1: address,
      zipCode: zonecode,
    }));
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">주소 검색</Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-3xl mx-auto w-full">
        <div className="p-4 w-full">
          <DrawerHeader>
            <DrawerTitle>주소를 검색해주세요</DrawerTitle>
            <DrawerDescription>도로명, 건물명 또는 지번으로 검색하세요</DrawerDescription>
          </DrawerHeader>

          <div className="space-y-4 p-4 w-full">
            <div className="h-[40vh] overflow-y-auto w-full">
              <DaumSearchComponent complete={handleSelectAddress} />
            </div>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button className="w-full">취소</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default BottomDrawer;
