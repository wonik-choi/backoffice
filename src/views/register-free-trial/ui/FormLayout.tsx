'use client';

import type React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// features
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';

// shared
import { cn } from '@/shared/lib/utils';

interface FormLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function FormLayout({ children, className }: FormLayoutProps) {
  const currentDirection = useRegisterFreeTrialStore((state) => state.currentDirection);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 250 : -250,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -250 : 250,
      opacity: 0,
    }),
  };

  return (
    <div className="h-[100lvh] bg-white flex flex-col overflow-hidden w-full">
      <div className="relative flex-1 flex flex-col w-full mx-auto px-6 py-6 h-full overflow-hidden max-w-[100%] ">
        <AnimatePresence mode="sync" custom={currentDirection} initial={false}>
          <motion.div
            key={useRegisterFreeTrialStore((state) => state.currentStep)}
            custom={currentDirection}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 400, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className={cn(
              'absolute top-0 left-0 pb-[1.6rem] w-full flex-1 flex flex-col h-full overflow-hidden',
              className
            )}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
