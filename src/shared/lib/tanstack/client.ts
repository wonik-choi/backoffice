'use client';

import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { ServerCustomError } from '../errors/errors';
import { toast } from 'sonner';

// 기본 설정이 적용된 QueryClient 생성
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1분
      gcTime: 1000 * 60 * 5, // 5분
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error: any, query) => {
      // 하위 컴포넌트에서 예외처리 진행하는 경우

      if (query.meta?.skipCapture) return;

      if (error instanceof ServerCustomError) {
        toast.error(`[${error ? error.status : 'ERROR'}]이런! 에러가 발생했습니다.`, {
          description: error
            ? error.debug
              ? error.debug.message
              : error.message
            : '관리자에게 문의해주세요 (1899-3884)',
          duration: 6000,
        });
      } else if (error instanceof Error) {
        toast.error(`[ERROR]이런! 에러가 발생했습니다.`, {
          description: error.message ? error.message : '관리자에게 문의해주세요 (1899-3884)',
          duration: 6000,
        });
      } else {
        console.log('else');
        toast.error(`[ERROR]이런! 에러가 발생했습니다.`, {
          description: '관리자에게 문의해주세요 (1899-3884)',
          duration: 6000,
        });
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: any, variables, context, mutation) => {
      // 하위 컴포넌트에서 예외처리 진행하는 경우
      if (mutation.options.meta?.skipCapture) return;

      if (error instanceof ServerCustomError) {
        toast.error(`[${error ? error.status : 'ERROR'}]이런! 에러가 발생했습니다.`, {
          description: error
            ? error.debug
              ? error.debug.message
              : error.message
            : '관리자에게 문의해주세요 (1899-3884)',
          duration: 6000,
        });
      } else if (error instanceof Error) {
        toast.error(`[ERROR]이런! 에러가 발생했습니다.`, {
          description: error.message ? error.message : '관리자에게 문의해주세요 (1899-3884)',
          duration: 6000,
        });
      } else {
        toast.error(`[ERROR]이런! 에러가 발생했습니다.`, {
          description: '관리자에게 문의해주세요 (1899-3884)',
          duration: 6000,
        });
      }
    },
  }),
});
