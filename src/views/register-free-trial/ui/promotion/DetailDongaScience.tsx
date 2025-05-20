import { CalendarClock, Ticket, SquareMousePointer, Send } from 'lucide-react';

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
      buttonText="닫기"
    >
      <div className="text-[1.4rem] text-susimdal-text-basic font-normal mb-[2rem] px-4">
        정가 최대 52,000원 상당의 어린이 잡지 구독권!
      </div>
      <div className="flex flex-col gap-[0.8rem] items-start w-full px-4">
        <ul className="flex flex-col gap-[1rem] items-start w-full">
          <li className="w-full ">
            <div className="inline-flex items-center justify-start gap-[0.8rem]">
              <CalendarClock className="size-[1.6rem] flex-shrink-0 text-susimdal-text-basic flex-1" />
              <p className="text-[1.4rem] font-medium text-susimdal-text-bacis">
                이벤트는{' '}
                <span className="text-[1.4rem] font-semibold text-susimdal-text-primary">5월 16일 ~ 6월 15일</span> 까지
                진행돼요
              </p>
            </div>
          </li>
          <li className="w-full">
            <div className="inline-flex items-center justify-start gap-[0.8rem]">
              <Ticket className="size-[1.6rem] flex-shrink-0 text-susimdal-text-basic" />
              <p className="text-[1.4rem] font-medium text-susimdal-text-bacis">
                선착순 <span className="text-[1.4rem] font-semibold text-susimdal-text-primary">500명</span> 한정이에요!
              </p>
            </div>
          </li>
          <li className="w-full">
            <div className="inline-flex items-center justify-start gap-[0.8rem] ">
              <SquareMousePointer className="size-[1.6rem] flex-shrink-0 text-susimdal-text-basic" />
              <p className="text-[1.4rem] font-medium text-susimdal-text-bacis">
                (신규학생 한정으로) 수심달 클래스 무료체험을 신청하고
                <span className="text-[1.4rem] font-semibold text-susimdal-text-primary">
                  {' '}
                  개념학습까지 완료한 학생
                </span>
                이어야 해요!
              </p>
            </div>
          </li>
          <li className="w-full">
            <div className="inline-flex items-center justify-start gap-[0.8rem]">
              <Send className="size-[1.6rem] flex-shrink-0 text-susimdal-text-basic" />
              <p className="text-[1.4rem] font-medium text-susimdal-text-bacis">
                학습 이후 2주 이내 첫 회차가 발송됩니다!
              </p>
            </div>
          </li>
        </ul>
      </div>
    </DrawerTermLayout>
  );
};
