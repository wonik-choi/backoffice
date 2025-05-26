'use client';

import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';
import { ScheduleSectionLayoutProps } from '@/views/register-free-trial/model/interface';

export const SubSectionLayout = ({
  title,
  subTitle,
  delay,
  children,
  settingCorrectLearningTime,
}: ScheduleSectionLayoutProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeIn', delay: delay }}
      className="flex flex-col gap-[1rem] mobile:gap-[1.2rem] justify-start items-start"
    >
      <div className="flex justify-between items-center w-full">
        <h3 className="text-[1.6rem] mobile:text-[1.8rem] font-bold text-black">{title}</h3>
        {subTitle && (
          <motion.p
            key={subTitle}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', duration: 0.4, bounce: settingCorrectLearningTime ? 1 : 0 }}
            className={cn(
              'text-[1.2rem] mobile:text-[1.4rem] text-susimdal-border-gray-darker font-normal',
              settingCorrectLearningTime && 'text-susimdal-text-primary'
            )}
          >
            {subTitle}
          </motion.p>
        )}
      </div>
      {children}
    </motion.div>
  );
};
