import { useMemo } from 'react';

// features
import { useFilterTempFreeTrialUsers } from '@/features/temp-free-trial-users/services/query/useFilterTempFreeTrialUsers';

// views
import { tempFreeTrialUsersTableBodyConverter } from '@/views/temp-free-trial/models/converter/tempFreeTrialUsersTableBodyConverter';
import { useTempFreeTrialStore } from '@/views/temp-free-trial/models/store';

export const useGetTempFreeTrialUsersBody = () => {
  const { periodType, baseDate, pagination } = useTempFreeTrialStore();

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
  const data = useFilterTempFreeTrialUsers(filter);

  const tableData = useMemo(() => {
    if (!data) return [];
    const tempFreeTrialUsers = data.tempFreeTrialUsers?.content;
    return tempFreeTrialUsersTableBodyConverter(tempFreeTrialUsers);
  }, [data]);

  return {
    tableData,
    totalCount: data?.tempFreeTrialUsers?.totalElements,
    totalPages: data?.tempFreeTrialUsers?.totalPages,
  };
};
