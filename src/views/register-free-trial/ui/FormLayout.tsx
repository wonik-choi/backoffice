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

  useEffect(() => {
    const token = searchParams.get('formSessionToken');
    if (token) {
      setFormSessionToken(token);
    }
  }, [searchParams, setFormSessionToken]);

  return (
    <div className="h-[100lvh] bg-white flex flex-col overflow-hidden w-full">
      <div className="flex-1 flex flex-col w-full mx-auto px-6 py-6 h-full overflow-hidden max-w-[100%] ">
        <AnimatePresence mode="wait">
          <motion.div
            key={useRegisterFreeTrialStore((state) => state.currentStep) + pathname}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className={cn('w-full flex-1 flex flex-col h-full overflow-hidden', className)}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
