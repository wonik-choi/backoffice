'use client';

// widgets
import { DrawerTermLayout } from '@/widgets/drawer-term-layout/ui/DrawerTermLayout';

import type { DeviceRentalTermsProps } from '@/views/register-free-trial/model/interface';

export const RentalDeviceTerms = ({ openState, setOpenState, agreeTerms }: DeviceRentalTermsProps) => {
  return (
    <DrawerTermLayout
      openState={openState}
      setOpenState={setOpenState}
      agreeTerms={agreeTerms}
      title={'아이패드 대여를 위해\n유의사항을 확인해주세요'}
      buttonText="위 유의사항에 동의합니다"
    >
      <div className="flex flex-col gap-[0.8rem] items-start w-full px-4">
        <h3 className="font-medium text-[1.3rem]">아이패드 대여 및 반납 안내</h3>
        <ul className="list-disc list-inside">
          <li className="mt-2 text-gray-600 text-[13px]">
            대여 기간이 종료되면, 해피콜을 통해 기기 반납 안내를 드리며, 이후 배송 기사가 댁으로 방문하여 기기 반납
            절차를 진행합니다.
          </li>
          <li className="mt-2 text-gray-600 text-[13px]">
            고의적으로 아이패드를 반납하지 않으실 경우 민형사상 책임을 질 수 있으며, 법적 처벌을 받을 수 있습니다.
          </li>
          <li className="mt-2 text-gray-600 text-[13px]">
            대여 기간 중 아이패드를 훼손한 경우, 훼손 비용이 청구될 수 있습니다. 아이패드 사용에 유의하시기 바랍니다.
          </li>
        </ul>
      </div>
    </DrawerTermLayout>
  );
};
