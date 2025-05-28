'use client';

import { useState } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

const MotionIndicator = motion(CheckboxPrimitive.Indicator);

interface AnimatedCheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {}

export function Checkbox({ checked: controlled, onCheckedChange, className, ...props }: AnimatedCheckboxProps) {
  const [checked, setChecked] = useState(controlled ?? false);

  const handleChange = (value: boolean) => {
    setChecked(value);
    onCheckedChange?.(value);
  };

  return (
    <label className="inline-flex items-center cursor-pointer select-none">
      <CheckboxPrimitive.Root
        checked={checked}
        onCheckedChange={handleChange}
        id="animated-checkbox"
        className={cn(
          'relative peer size-[1.8rem] rounded-sm border border-gray-300 transition-colors data-[state=checked]:bg-susimdal-button-primary-fill data-[state=checked]:border-susimdal-button-primary-fill',
          className
        )}
        {...props}
      >
        <AnimatePresence initial={false}>
          <MotionIndicator
            asChild
            data-state-checked={checked ? true : undefined}
            // AnimatePresence가 상태변경을 감지하도록 키에 checked 반영
            key={String(checked)}
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.2, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <CheckIcon size={16} className="text-white" />
          </MotionIndicator>
        </AnimatePresence>
      </CheckboxPrimitive.Root>
    </label>
  );
}
