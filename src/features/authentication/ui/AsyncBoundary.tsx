'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, Suspense, useCallback } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

// shared
import { UnauthorizedError } from '@/shared/lib/errors/errors';

// features
import { useForcedLogout } from '@/features/authentication/services/hooks/useForcedLogout';

interface AsyncBoundaryProps {
  children: ReactNode;
  loadingFallback: ReactNode;
  errorFallback?: (props: FallbackProps) => ReactNode;
}

export default function AsyncBoundary({ children, loadingFallback, errorFallback }: AsyncBoundaryProps) {
  const { handleLogout } = useForcedLogout();
  const pathname = usePathname();

  const onError = useCallback(
    (error: Error) => {
      if (error instanceof UnauthorizedError) {
        handleLogout();
      }
    },
    [handleLogout]
  );

  const renderErrorFallback = useCallback(
    (props: FallbackProps) => {
      if (props.error instanceof UnauthorizedError) {
        return null;
      }
      return errorFallback?.(props);
    },
    [errorFallback]
  );

  return (
    <ErrorBoundary fallbackRender={renderErrorFallback} resetKeys={[pathname]} onError={onError}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
