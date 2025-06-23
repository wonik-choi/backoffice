import { useMemo } from 'react';

// features
import { useFilterFreeTrialUsers } from '@/features/free-trial-users/services/query/useFilterFreeTrialUsers';

// views
import { freeTrialUsersTableBodyConverter } from '@/views/free-trial/models/converter/freeTrialUsersTableBodyConverter';
import { useFreeTrialStore } from '@/views/free-trial/models/store';

export const useGetFreeTrialUsersBody = () => {
  const { periodType, baseDate, pagination } = useFreeTrialStore();

  const filter = useMemo(() => {
    return {
      periodType: periodType,
      baseDate: baseDate,
      page: pagination.pageIndex,
      size: pagination.pageSize,
      timeZone: 'Asia/Seoul',
    };
  }, [periodType, baseDate, pagination.pageIndex, pagination.pageSize]);

  /** 무료체험 유저 조회 */
  const data = useFilterFreeTrialUsers(filter);

  const tableData = useMemo(() => {
    if (!data) return [];
    const freeTrialUsers = data?.freeTrialUsers.content;
    return freeTrialUsersTableBodyConverter(freeTrialUsers);
  }, [data]);

  return {
    tableData,
    totalCount: data?.freeTrialUsers.totalElements,
    totalPages: data?.freeTrialUsers.totalPages,
  };
};
