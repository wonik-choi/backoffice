'use client';

import { Calendar, Zap, SquareMousePointer, Send } from 'lucide-react';
import Delibery from '@/shared/components/svgs/delibery/Delibery';
import ShoutingStar from '@/shared/components/svgs/shouting-star/ShoutingStar';

// widgets
import { DrawerTermLayout } from '@/widgets/drawer-term-layout/ui/DrawerTermLayout';

import type { DeviceRentalTermsProps } from '@/views/register-free-trial/model/interface';

export const DetailDongaScience = ({ openState, setOpenState, agreeTerms }: DeviceRentalTermsProps) => {
  return (
    <DrawerTermLayout
      openState={openState}
      setOpenState={setOpenState}
      agreeTerms={agreeTerms}
      title={'수심달x동아사이언스\n과학수학동아 구독권 100% 증정!'}
      titleClassName="text-susimdal-text-primary"
      buttonText="확인"
    >
      <div className="text-[1.4rem] text-susimdal-text-basic font-normal mb-[2rem] px-4">
        정가 최대 52,000원 상당의 어린이 잡지 구독권!
      </div>
      <div className="flex flex-col gap-[0.8rem] items-start w-full px-4">
        <ul className="flex flex-col gap-[1rem] items-start w-full">
          <li className="w-full ">
            <div className="inline-flex items-center justify-start gap-[0.8rem]">
              <Calendar className="size-[1.6rem] flex-shrink-0 text-susimdal-text-basic flex-1" />
              <p className="text-[1.4rem] font-medium text-susimdal-text-bacis">
                이벤트는{' '}
                <span className="text-[1.4rem] font-semibold text-susimdal-text-primary">5월 16일 ~ 6월 15일</span> 까지
                진행돼요
              </p>
            </div>
          </li>
          <li className="w-full">
            <div className="inline-flex items-center justify-start gap-[0.8rem]">
              <Zap className="size-[1.6rem] flex-shrink-0 text-susimdal-text-basic" />
              <p className="text-[1.4rem] font-medium text-susimdal-text-bacis">
                <span className="text-[1.4rem] font-semibold text-susimdal-text-primary">선착순 500명</span>에게 상품을
                지급해요
              </p>
            </div>
          </li>
          <li className="w-full">
            <div className="inline-flex items-start justify-start gap-[0.8rem] ">
              <ShoutingStar className="size-[1.6rem] flex-shrink-0 text-susimdal-text-basic" />
              <p className="text-[1.4rem] font-medium text-susimdal-text-bacis">
                수심달 클래스 무료체험을 신청하고
                <span className="text-[1.4rem] font-semibold text-susimdal-text-primary"> 개념학습을 완료</span>
                해주세요
                <br />
                (신규 학생만 가능해요)
              </p>
            </div>
          </li>
          <li className="w-full">
            <div className="inline-flex items-center justify-start gap-[0.8rem]">
              <Delibery className="size-[1.6rem] flex-shrink-0 text-susimdal-text-basic" />
              <p className="text-[1.4rem] font-medium text-susimdal-text-bacis">
                미션을 완료하면 2주 내 상품을 발송해드려요
              </p>
            </div>
          </li>
        </ul>
      </div>
    </DrawerTermLayout>
  );
};
