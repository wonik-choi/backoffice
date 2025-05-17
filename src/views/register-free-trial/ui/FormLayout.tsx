'use client';

import type React from 'react';
import { useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useRegisterFreeTrialStore } from '@/features/register-free-trial/model/store';
import { cn } from '@/shared/lib/utils';

interface FormLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function FormLayout({ children, className }: FormLayoutProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const setFormSessionToken = useRegisterFreeTrialStore((state) => state.setFormSessionToken);
  const currentDerection = useRegisterFreeTrialStore((state) => state.currentDerection);

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

  useEffect(() => {
    const token = searchParams.get('formSessionToken');
    if (token) {
      setFormSessionToken(token);
    }
  }, [searchParams, setFormSessionToken]);

  return (
    <div className="h-[100lvh] bg-white flex flex-col overflow-hidden w-full">
      <div className="relative flex-1 flex flex-col w-full mx-auto px-6 py-6 h-full overflow-hidden max-w-[100%] ">
        <AnimatePresence mode="sync" custom={currentDerection} initial={false}>
          <motion.div
            key={useRegisterFreeTrialStore((state) => state.currentStep) + pathname}
            custom={currentDerection}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 500, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className={cn('absolute top-0 left-0 p-6 w-full flex-1 flex flex-col h-full overflow-hidden', className)}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
