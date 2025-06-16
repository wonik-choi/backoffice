import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';

// shared
import { ClientCustomError } from '@/shared/lib/errors/errors';

export function useSuspenseLikeQuery<TData, TError>({ queryKey, queryFn, ...options }: UseQueryOptions<TData, TError>) {
  const qc = useQueryClient();

  const { data, isLoading, error } = useQuery({ queryKey, queryFn, retry: false, ...options });

  if (isLoading) {
    const query = qc.getQueryCache().find({ queryKey: queryKey! });
    if (!query) throw new ClientCustomError('Query 인스턴스 없음');
    // 같은 쿼리 인스턴스의 fetch()를 호출 → 내부 중복 방지
    throw query.fetch();
  }
  if (error) {
    throw error;
  }
  return data!;
}
