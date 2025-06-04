import * as Sentry from '@sentry/nextjs';

import { SENTRY_OP_GUIDE } from '@/shared/lib/errors/config';

export const wrapperSentry = (fn: (payload?: any) => Promise<any>, name: string, op: SENTRY_OP_GUIDE) => {
  return Sentry.startSpan(
    {
      name,
      op,
    },
    async () => {
      const result = await fn();

      return result;
    }
  );
};
