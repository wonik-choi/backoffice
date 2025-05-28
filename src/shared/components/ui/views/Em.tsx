'use client';

import { Em as EmBasic } from '@/shared/components/atomics/em';
import { cn } from '@/shared/lib/utils';
import { CircleX } from 'lucide-react';

export const Em = ({ className, ...props }: React.ComponentProps<typeof EmBasic>) => {
  return (
    <div className="flex justify-start items-center gap-[0.4rem] w-full">
      <CircleX className="w-[1.6rem] h-[1.6rem] fill-susimdal-icon-danger text-white" />
      <EmBasic className={cn('text-[1.2rem] text-susimdal-text-danger font-normal', className)} {...props} />
    </div>
  );
};
