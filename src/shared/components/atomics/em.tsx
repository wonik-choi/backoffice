import * as React from 'react';
import * as EmPrimitive from '@radix-ui/react-label';

import { cn } from '@/shared/lib/utils';

const Em = ({ className, ...props }: React.ComponentProps<typeof EmPrimitive.Root>) => {
  return <EmPrimitive.Root className={cn('text-red-400 text-[0.7rem] font-medium', className)} {...props} />;
};

export { Em };
