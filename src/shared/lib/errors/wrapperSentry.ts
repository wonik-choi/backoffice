// shared/lib/errors/wrapperSentry.ts
import * as Sentry from '@sentry/nextjs';
import { SENTRY_OP_GUIDE } from './config';

export const wrapperSentry = <T>(fn: (payload?: any) => Promise<T>, name: string, op: SENTRY_OP_GUIDE) => {
  return Sentry.startSpan(
    {
      name,
      op,
    },
    async (span) => {
      try {
        const result = await fn();

        span.end();
        return result;
      } catch (error) {
        span.end();
        throw error;
      }
    }
  );
};
