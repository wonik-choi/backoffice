// widgets
import { DrawerTermLayout } from '@/widgets/drawer-term-layout/ui/DrawerTermLayout';

import type { DeviceRentalTermsProps } from '@/views/register-free-trial/model/interface';

export const DongaScienceTerms = ({ openState, setOpenState, agreeTerms }: DeviceRentalTermsProps) => {
  return (
    <DrawerTermLayout
      openState={openState}
      setOpenState={setOpenState}
      agreeTerms={agreeTerms}
      title={'이벤트 혜택 지급을 위해\n개인정보 제3자 제공에 동의해주세요'}
      buttonText="동의하고 이벤트 참여하기"
    >
      <div className="text-[1.2rem] text-susimdal-text-basic font-normal mb-[2.4rem] px-4">
        동의하지 않으실 경우. 이벤트 참여가 불가합니다.
      </div>
      <div className="flex flex-col gap-[0.8rem] items-start w-full px-4">
        <h3 className="font-medium text-[1.2rem]">[개인정보 제3자 제공 공시]</h3>
        <ul>
          <li className="text-susimdal-test-subtle text-[1.2rem] leading-[1.6rem]">제공받는 자: (주)동아사이언스</li>
          <li className="text-susimdal-test-subtle text-[1.2rem] leading-[1.6rem]">제공 항목: 성함, 연락처, 주소</li>
          <li className="text-susimdal-test-subtle text-[1.2rem] leading-[1.6rem]">
            제공 목적: 제휴, 상품 제공 및 이벤트 안내
          </li>
          <li className="text-susimdal-test-subtle text-[1.2rem] leading-[1.6rem]">
            보유 및 이용기간: 업무목적 달성 시까지 보존되며, 관계법령 규정에 의해 일정 기간 보존이 필요한 경우에는 해당
            기간만큼 보관 후 삭제됩니다.
          </li>
        </ul>
        <ul>
          <li className="text-susimdal-test-subtle text-[1.2rem] leading-[1.6rem]">
            *구매자는 제3자 개인정보 제공에 대한 동의 후 거부할 권리가 있으며, 동의 거부 시 상품 구매가 불가합니다.
          </li>
        </ul>
      </div>
    </DrawerTermLayout>
  );
};
