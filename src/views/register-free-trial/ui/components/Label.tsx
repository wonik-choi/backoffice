'use client';

import { Label as LabelBasic } from '@/shared/components/atomics/label';
import { cn } from '@/shared/lib/utils';

interface LabelProps extends React.ComponentProps<typeof LabelBasic> {
  children: React.ReactNode;
  className?: string;
}

export const Label = ({ children, className, ...props }: LabelProps) => {
  return (
    <LabelBasic
      className={cn('text-[1.4rem] mobile:text-[1.6rem] font-normal text-susimdal-text-basic', className)}
      {...props}
    >
      {children}
    </LabelBasic>
  );
};
