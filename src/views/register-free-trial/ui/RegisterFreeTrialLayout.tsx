'use client';

// shared
import { SusimdalLogo } from '@/shared/components/svgs/susimdal-logo/SusimdalLogo';
import { Progress } from '@/shared/components/atomics/progress';

import { motion } from 'framer-motion';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  progressStep: number;
  totalSteps?: number;
  titleDelay?: number;
}

const RegisterFreeTrialLayout = ({
  title,
  subtitle,
  children,
  progressStep,
  titleDelay = 0,
  totalSteps = 5,
}: PageLayoutProps) => {
  return (
    <div className="flex flex-col h-dvh w-full">
      <nav className="mb-[8px] w-full bg-susimdal-element-primary-light">
        <div className="flex h-[32px] p-[8px] justify-center items-center self-stretch">
          <div className="flex justify-center items-center gap-[4px]">
            <div className="w-[16px] h-[16px]">
              <SusimdalLogo />
            </div>
            <p className="text-[12px] font-normal text-black">수심달 무료체험을 환영합니다!</p>
          </div>
        </div>
      </nav>

      <div className="flex flex-col w-full h-full px-[2rem] bg-white">
        {progressStep !== 8 ? (
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

          {subtitle && <p className="text-[1.2rem] text-susimdal-text-basic/50">{subtitle}</p>}
        </div>

        <div className="flex-1 overflow-y-auto w-full pb-[2rem]">{children}</div>
      </div>
    </div>
  );
};

export default RegisterFreeTrialLayout;
