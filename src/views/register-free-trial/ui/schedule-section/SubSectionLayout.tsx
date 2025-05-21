import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';
import { ScheduleSectionLayoutProps } from '@/views/register-free-trial/model/interface';

export const SubSectionLayout = ({ title, subTitle, delay, children }: ScheduleSectionLayoutProps) => {
  const isCorrectSelectWeek = subTitle?.includes('요일');

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeIn', delay: delay }}
      className="flex flex-col gap-[1.5rem] justify-start items-start"
    >
      <h3 className="text-[1.8rem] font-bold text-black">{title}</h3>
      {subTitle && (
        <motion.p
          key={subTitle}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', duration: 0.4, bounce: isCorrectSelectWeek ? 1 : 0 }}
          className={cn('text-[1.4rem] text-black font-normal', isCorrectSelectWeek && 'text-susimdal-text-primary')}
        >
          {subTitle}
        </motion.p>
      )}
      {children}
    </motion.div>
  );
};
