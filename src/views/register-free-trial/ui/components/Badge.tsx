import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface BadgeProps<T> extends Omit<HTMLMotionProps<'button'>, 'value'> {
  label: string;
  badgeValue: T;
  selected?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const badgeVariants = cva(
  'flex w-[6rem] px-[0.9rem] py-[0.5rem] justify-center items-center gap-[0.2rem] text-[1.6rem] whitespace-nowrap font-normal leading-[2.1rem] rounded-full cursor-pointer',
  {
    variants: {
      selected: {
        true: 'bg-white text-susimdal-button-primary-fill border border-susimdal-button-primary-fill',
        false: 'bg-white text-susimdal-text-basic border border-susimdal-border-gray-light',
      },
      disabled: {
        true: 'bg-susimdal-element-disabled-light text-susimdal-text-disabled-on border border-susimdal-element-disabled-light cursor-not-allowed',
      },
    },
    defaultVariants: {
      selected: false,
      disabled: false,
    },
  }
);

export const Badge = React.memo(function Badge<T extends string | number>({
  className,
  label,
  badgeValue,
  selected = false,
  disabled = false,
  onClick,
  ...props
}: BadgeProps<T>) {
  return (
    <motion.button
      whileTap={{ backgroundColor: 'var(--susimdal-element-primary-light)', scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeIn' }}
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(badgeVariants({ selected, disabled }), className)}
      {...props}
    >
      {label}
    </motion.button>
  );
});
