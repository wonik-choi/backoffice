'use client'; // 반드시 필요!

import { useEffect } from 'react';
import Link from 'next/link';
import * as Sentry from '@sentry/nextjs';

// shared
import { useCustomLottie } from '@/shared/hooks/useLottie';
import ErrorLottie from '@/shared/lotties/error-animation.json';
import { Button } from '@/shared/components/ui';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  const completeLottieOption = {
    animationData: ErrorLottie,
    loop: true,
    autoplay: true,
    style: {
      width: '350px',
      height: '350px',
    },
  };

  const { View: CompleteLottie } = useCustomLottie(completeLottieOption);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h2 className="mb-[1rem] text-[2.5rem] font-bold text-susimdal-text-danger">예상치 못한 오류가 발생했습니다</h2>

      {process.env.NODE_ENV === 'development' && (
        <div className="rounded border-b border-susimdal-border-gray-light p-[0.5rem]">
          <p className="text-[1.2rem] text-susimdal-text-basic">{error.message}</p>
        </div>
      )}

      <div className="mb-[1rem]">{CompleteLottie}</div>

      <div className="flex gap-4">
        <Button onClick={reset}>다시 시도</Button>

        <Link href="/home">
          <Button variant="border">홈으로 가기</Button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
