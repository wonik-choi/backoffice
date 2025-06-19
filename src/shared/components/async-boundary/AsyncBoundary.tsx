'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ReactNode, Suspense, useEffect, useState } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// shared
import { httpAdaptor } from '@/shared/lib/https/HttpAdapter';
import { UnauthorizedError } from '@/shared/lib/errors/errors';

interface AsyncBoundaryProps {
  children: ReactNode;
  loadingFallback: ReactNode;
  errorFallback?: (props: FallbackProps) => ReactNode;
}

export default function AsyncBoundary({ children, loadingFallback, errorFallback }: AsyncBoundaryProps) {
  const [unauthorized, setUnauthorized] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  // 1) onError에서만 한 번 처리
  const handleError = (error: Error) => {
    if (error instanceof UnauthorizedError) {
      setUnauthorized(true);
    }
  };

  // 2) renderErrorFallback은 오직 UI만 담당
  const renderErrorFallback = (props: FallbackProps) => {
    if (props.error instanceof UnauthorizedError) {
      return null;
    }
    return errorFallback?.(props);
  };

  useEffect(() => {
    if (unauthorized) {
      httpAdaptor
        .post('api/logout', null, { credentials: 'include', headers: { 'Content-Type': 'application/json' } }, true)
        .finally(() => {
          // 일단은 여기서 캐시를 전체 제거해줍니다..
          queryClient.clear();
          toast.error('세션이 만료되어 로그아웃됩니다.');
          router.replace('/login');
        });
    }
  }, [router, unauthorized, queryClient]);

  return (
    <ErrorBoundary fallbackRender={renderErrorFallback} resetKeys={[pathname]} onError={handleError}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
