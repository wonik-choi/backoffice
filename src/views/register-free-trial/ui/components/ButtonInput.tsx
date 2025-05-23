'use client';

import { Input as InputBasic } from '@/shared/components/atomics/input';
import { cn } from '@/shared/lib/utils';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface ButtonInputProps extends React.ComponentProps<'input'> {
  handleClick: () => void;
}

export const ButtonInput = ({ className, type, handleClick, ...props }: ButtonInputProps) => {
  return (
    <motion.div
      className="relative flex flex-col justify-center items-start gap-[0.8rem] w-full"
      whileTap={{ scale: 0.99, borderColor: 'var(--susimdal-border-gray-darker)' }}
      transition={{ duration: 0.1 }}
      tabIndex={-1}
    >
      <MapPin className="absolute right-[1rem] top-[0.85rem] mobile:top-[1rem] text-susimdal-text-basic size-[2rem]" />
      <InputBasic
        className={cn(
          'px-[1.4rem] mobile:px-[1.6rem] h-[3.8rem] mobile:h-[4rem] pr-[3rem] py-[1rem] flex-1 self-stretch rounded-[0.6rem] border border-susimdal-element-disabled-light text-[1.4rem] mobile:text-[1.6rem] font-normal text-susimdal-text-basic placeholder:text-susimdal-text-subtle focus-visible:ring-0 disabled:cursor-pointer disabled:opacity-100 disabled:bg-susimdal-element-disabled-light/40',
          className
        )}
        type={type}
        disabled
        placeholder="주소 검색"
        onClick={handleClick}
        {...props}
      />
    </motion.div>
  );
};
