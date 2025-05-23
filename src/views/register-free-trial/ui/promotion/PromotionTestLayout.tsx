'use client';
import React from 'react';
import { SusimdalLogo } from '@/shared/components/svgs/susimdal-logo/SusimdalLogo';
import { Progress } from '@/shared/components/atomics/progress';

// views
import { Button } from '@/views/register-free-trial/ui/components/Button';

interface PromotionLayoutProps {
  progressStep: number;
  totalSteps?: number;
  children: React.ReactNode;
  onPrev?: () => void;
  onNext?: () => void;
  isNextDisabled?: boolean;
}

export function PromotionTestLayout({
  progressStep,
  totalSteps = 5,
  children,
  onPrev,
  onNext,
  isNextDisabled,
}: PromotionLayoutProps) {
  return (
    <div className="h-screen flex flex-col bg-white">
      {/* 1. 상단 네비 & 프로그레스 */}
      <header className="flex-shrink-0 bg-susimdal-element-primary-light">
        <nav className="h-8 flex items-center justify-center">
          <SusimdalLogo className="w-4 h-4 mr-1" />
          <span className="text-xs">수심달 무료체험을 환영합니다!</span>
        </nav>
        <div className="px-6 py-2 bg-white">
          <div className="flex items-center gap-4">
            <Progress value={((progressStep + 1) / totalSteps) * 100} />
            <span className="text-sm text-susimdal-text-subtle">
              {progressStep + 1} / {totalSteps}
            </span>
          </div>
        </div>
      </header>

      {/* 2. 스크롤 가능한 콘텐츠 */}
      <main className="flex-1 overflow-y-auto px-6 py-4">{children}</main>

      {/* 3. 하단 고정 버튼 바 */}
      <footer className="flex-shrink-0 border-t bg-white px-6 py-3">
        <div className="flex justify-between">
          <Button type="button" onClick={onPrev} className="text-sm text-susimdal-text-subtle">
            이전
          </Button>
          <Button
            type="button"
            onClick={onNext}
            disabled={isNextDisabled}
            className={`
              px-4 py-2 rounded-lg text-sm
              ${
                isNextDisabled
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-susimdal-element-primary text-white'
              }
            `}
          >
            다음
          </Button>
        </div>
      </footer>
    </div>
  );
}
