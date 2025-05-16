import { ReactNode, Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

interface AsyncBoundaryProps {
  children: ReactNode;
  loadingFallback: ReactNode;
  errorFallback: (props: FallbackProps) => ReactNode;
}

export default function AsyncBoundary({ children, loadingFallback, errorFallback }: AsyncBoundaryProps) {
  return (
    <ErrorBoundary fallbackRender={errorFallback}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
