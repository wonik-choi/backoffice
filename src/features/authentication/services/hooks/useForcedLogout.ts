'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { httpAdaptor } from '@/shared/lib/https/HttpAdapter';
import { ClientCustomError } from '@/shared/lib/errors/errors';

export const useForcedLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      await httpAdaptor.post(
        'api/logout',
        null,
        { credentials: 'include', headers: { 'Content-Type': 'application/json' } },
        true
      );
      queryClient.clear();
      router.replace('/login');
    } catch (error) {
      throw new ClientCustomError('로그아웃에 실패했습니다.');
    }
  }, [router, queryClient]);

  return { handleLogout };
};
