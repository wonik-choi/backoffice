import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { ClientCustomError } from '@/shared/lib/errors/errors';

export function useSuspenseLikeQuery<TData, TError>(opts: UseQueryOptions<TData, TError>) {
  const qc = useQueryClient();
  const { queryKey, queryFn, ...options } = opts;

  const { data, isLoading, error } = useQuery<TData, TError>({
    queryKey,
    queryFn,
    retry: false,
    // 배경 갱신 모두 비활성
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    ...options,
  });

  if (isLoading) {
    // 이미 진행 중인 Promise가 있으면 그걸, 없으면 새로 생성
    const query = qc.getQueryCache().find({ queryKey: queryKey! });
    if (!query) throw new ClientCustomError('Query 인스턴스 없음');

    // 중요! 상태가 에러라면 에러를 바로 던져줍니다. (밑에 error 처리되기 전에 무한 호출이 발생)
    if (query.state.error) {
      throw query.state.error;
    }

    throw query.fetch();
  }

  if (error) {
    throw error;
  }

  return data!;
}
