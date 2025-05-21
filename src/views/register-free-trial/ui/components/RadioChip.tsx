import { cn } from '@/shared/lib/utils';
import { cva } from 'class-variance-authority';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import type React from 'react';

interface RadioChipProps<T> extends React.ComponentProps<'div'> {
  label: string;
  value: T;
  checked: boolean;
  onValueChange: (value: T) => void;
}

const radioChipVariants = cva(
  'flex w-full h-[4rem] px-[1.2rem] justify-center items-center rounded-[0.6rem] border gap-[0.4rem] flex-1 hover:bg-susimdal-element-primary-light hover:border-susimdal-element-primary-light hover:text-white',
  {
    variants: {
      checked: {
        true: 'border border-susimdal-button-primary-fill bg-white',
        false: 'border border-susimdal-border-grey bg-white',
      },
    },
    defaultVariants: {
      checked: false,
    },
  }
);

export const RadioChip = <T,>({ label, checked, className, onValueChange, value }: RadioChipProps<T>) => {
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
      tabIndex={-1}
      className={cn(radioChipVariants({ checked }), className)}
      onClick={() => onValueChange(value)}
    >
      <Check
        className={cn('size-[2rem] text-susimdal-icon-gray-light', checked && 'text-susimdal-button-primary-fill')}
      />
      <label
        className={cn(
          'text-[1.6rem] font-normal text-susimdal-text-basic',
          checked && 'text-susimdal-button-primary-fill'
        )}
      >
        {label}
      </label>
    </motion.div>
  );
};
