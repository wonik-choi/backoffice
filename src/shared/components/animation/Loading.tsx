'use client';

import { motion } from 'motion/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const loadingVariants = cva('rounded-full', {
  variants: {
    size: {
      sm: 'size-[0.7rem]',
      md: 'size-[1.2rem]',
      lg: 'size-[1.5rem]',
    },
    color: {
      primary: 'bg-susimdal-button-primary-fill',
      white: 'bg-white',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
});

interface LoadingThreeDotsPulseProps extends VariantProps<typeof loadingVariants> {}

export const LoadingThreeDotsPulse = ({ size, color }: LoadingThreeDotsPulseProps) => {
  const dotVariants = {
    pulse: {
      scale: [1, 1.5, 1],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      animate="pulse"
      transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
      className="flex justify-center items-center gap-5"
    >
      <motion.div className={cn(loadingVariants({ size, color }))} variants={dotVariants} />
      <motion.div className={cn(loadingVariants({ size, color }))} variants={dotVariants} />
      <motion.div className={cn(loadingVariants({ size, color }))} variants={dotVariants} />
    </motion.div>
  );
};
