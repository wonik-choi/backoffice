'use client';

// widgets
import { DrawerTermLayout } from '@/widgets/drawer-term-layout/ui/DrawerTermLayout';

import type { DeviceRentalTermsProps } from '@/views/register-free-trial/model/interface';

export const RegisterFormTerm = ({ openState, setOpenState, agreeTerms }: DeviceRentalTermsProps) => {
  return (
    <DrawerTermLayout
      openState={openState}
      setOpenState={setOpenState}
      agreeTerms={agreeTerms}
      title={'무료체험 신청을 위해\n유의사항을 확인해주세요'}
      buttonText="위 유의사항에 동의합니다"
    >
      <div className="flex flex-col gap-[0.8rem] items-start w-full px-4">
        <h3 className="font-medium text-[1.3rem]">무료체험 개인정보 동의</h3>
        <ul className="list-disc list-inside">
          <li className="mt-2 text-gray-600 text-[13px]">개인정보 수집 및 이용에 동의합니다.</li>
        </ul>
      </div>
    </DrawerTermLayout>
  );
};
