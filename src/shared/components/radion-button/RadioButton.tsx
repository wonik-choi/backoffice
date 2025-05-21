'use client';
import { useEffect, useState } from 'react';

import { cva } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const RadioButtonVariants = cva('rounded-full border-[0.06rem] border-susimdal-border-gray relative', {
  variants: {
    size: {
      sm: 'size-[1.2rem]',
      lg: 'size-[2rem]',
    },
    checked: {
      true: 'border-susimdal-border-primary',
      false: 'border-susimdal-border-gray-darker',
    },
  },
  defaultVariants: {
    size: 'sm',
    checked: false,
  },
});

const RadioButtonInnerVariants = cva(
  'absolute rounded-full bg-susimdal-border-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  {
    variants: {
      size: {
        sm: 'size-[0.8rem]',
        lg: 'size-[1.3rem]',
      },
      checked: {
        true: 'opacity-100',
        false: 'opacity-0',
      },
    },
    defaultVariants: {
      size: 'sm',
      checked: false,
    },
  }
);

interface RadioButtonProps extends React.ComponentProps<typeof motion.div> {
  size?: 'sm' | 'lg';
  checked?: boolean;
}

export const RadioButton = ({ size, checked, ...props }: RadioButtonProps) => {
  return (
    <motion.div
      whileTap={{ scale: 0.97, borderWidth: '0.12rem' }}
      transition={{ duration: 0.3, scale: { type: 'spring', visualDuration: 0.3, bounce: 0.4 } }}
      className={cn(RadioButtonVariants({ size, checked }))}
      {...props}
    >
      <AnimatePresence>
        {checked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.2 }}
            className={cn(RadioButtonInnerVariants({ size, checked }))}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
