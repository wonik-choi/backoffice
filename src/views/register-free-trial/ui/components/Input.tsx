'use client';

import { Input as InputBasic } from '@/shared/components/atomics/input';
import { cn } from '@/shared/lib/utils';
import { motion } from 'framer-motion';

export const Input = ({ className, type, ...props }: React.ComponentProps<'input'>) => {
  return (
    <motion.div
      className="relative"
      whileTap={{ scale: 0.99, borderColor: 'var(--susimdal-border-gray-darker)' }}
      transition={{ duration: 0.1 }}
      tabIndex={-1}
    >
      <InputBasic
        className={cn(
          'px-[1.6rem] h-[4rem] flex-1 self-stretch rounded-[0.6rem] border border-susimdal-element-disabled-light text-[1.6rem] font-normal text-susimdal-text-basic placeholder:text-susimdal-text-subtle focus-visible:ring-0',
          className
        )}
        type={type}
        {...props}
      />
    </motion.div>
  );
};
