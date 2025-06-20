'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// shared
import { SusimdalLogo } from '@/shared/components/svgs/susimdal-logo/SusimdalLogo';
import { Progress } from '@/shared/components/atomics/progress';
import Kakaotalk from '@/shared/components/svgs/kakaotalk/Kakaotalk';

// features
import { useStepTracker } from '@/features/tracking-register-free-trial/services/useStepTracker';

interface PageLayoutProps {
  title: string;
  eventName: string;
  subtitle?: string;
  children: React.ReactNode;
  progressStep: number;
  totalSteps?: number;
  titleDelay?: number;
  exception?: boolean;
}

const RegisterFreeTrialLayout = ({
  title,
  eventName,
  subtitle,
  children,
  progressStep,
  titleDelay = 0,
  totalSteps = 5,
  exception = false,
}: PageLayoutProps) => {
  /**
   * @description
   * 전달되는 페이지 정보로 이벤트를 추적합니다. (meta pixel)
   */
  useStepTracker({
    step: progressStep,
    eventName: eventName,
    eventParams: {
      formName: 'register-free-trial',
      step: progressStep.toString(),
    },
    exception: exception,
  });

  return (
    <div className="flex flex-col h-dvh w-full">
      <nav className="mb-[8px] w-full bg-susimdal-element-primary-light">
        <div className="flex h-[32px] p-[8px] justify-center items-center self-stretch">
          <div className="flex justify-between items-center gap-[4px] w-full">
            <div className="flex justify-center items-center gap-[4px]">
              <div className="w-[16px] h-[16px]">
                <SusimdalLogo />
              </div>
              <p className="text-[12px] font-normal text-black">수심달 무료체험을 환영합니다!</p>
            </div>
            <div className="flex justify-center items-center gap-[4px]">
              <Link href="http://pf.kakao.com/_GAxhUG" target="_blank">
                <div className="bg-[#FAE100] rounded-[0.4rem] py-[0.2rem] px-[0.6rem] flex justify-center items-center gap-[0.2rem] active:bg-[#FAE100]/60 transition-colors duration-200 cursor-pointer">
                  <p className="text-susimdal-text-basic font-normal text-[1.2rem]">카카오채널 문의</p>
                  <Kakaotalk className="w-[1.6rem] h-[1.6rem] text-susimdal-text-basic" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col w-full h-full px-[2rem] bg-white">
        {progressStep !== totalSteps ? (
          <div className="flex items-center gap-[1.6rem] self-stretch mb-[1.6rem]">
            <Progress value={((progressStep + 1) / totalSteps) * 100} />
            <p className="text-[1.2rem] font-normal text-susimdal-text-subtle whitespace-nowrap">{`${
              progressStep + 1
            } / ${totalSteps}`}</p>
          </div>
        ) : (
          <div className="w-full h-[1.2rem] mb-[1.6rem]"></div>
        )}

        <div className="flex flex-col gap-[0.8rem] items-start justify-start mb-[2rem] mobile:mb-[3.2rem]">
          <motion.h1
            key={title}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: titleDelay }}
            className="text-[1.8rem] mobile:text-[2rem] font-bold text-susimdal-text-basic leading-[150%] whitespace-pre-wrap"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              key={subtitle}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: titleDelay + 0.1 }}
              className="text-[1.2rem] text-susimdal-text-basic/50"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide w-full pb-[2.4rem]">{children}</div>
      </div>
    </div>
  );
};

export default RegisterFreeTrialLayout;
