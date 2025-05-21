'use client';

import { ChevronLeft } from 'lucide-react';
import { Button } from '@/shared/components/atomics/button';

interface BackButtonProps {
  onClick?: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <Button variant="ghost" size="icon" onClick={onClick} className="absolute left-0 top-0">
      <ChevronLeft className="h-7 w-7" />
      <span className="sr-only">뒤로 가기</span>
    </Button>
  );
}
