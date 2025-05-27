'use client';

// widgets
import { DrawerTermLayout } from '@/widgets/drawer-term-layout/ui/DrawerTermLayout';

import type { DeviceRentalTermsProps } from '@/views/register-free-trial/model/interface';

interface ConfirmIsCorrectPhoneNumberProps extends DeviceRentalTermsProps {
  phoneNumber: string;
}

export const ConfirmIsCorrectPhoneNumber = ({
  openState,
  phoneNumber,
  setOpenState,
  agreeTerms,
}: ConfirmIsCorrectPhoneNumberProps) => {
  return (
    <DrawerTermLayout
      openState={openState}
      setOpenState={setOpenState}
      agreeTerms={agreeTerms}
      title={'기입하신 휴대전화번호를\n다시 한번 확인해주세요'}
      buttonText="확인했습니다."
    >
      <div className="flex flex-col gap-[0.8rem] items-start w-full px-4">
        <div className="w-full flex justify-center items-center">
          <h3 className="font-semibold text-[2.2rem]">{phoneNumber}</h3>
        </div>
        <ul className="list-disc list-inside">
          <li className="mt-2 text-gray-600 text-[13px]">가입 후, 기입해주신 번호로 알림톡이 전송될 예정이에요.</li>
        </ul>
      </div>
    </DrawerTermLayout>
  );
};
