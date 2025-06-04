import { useMemo } from 'react';

// features
import { useFilterFreeTrialUsers } from '@/features/free-trial-users/services/query/useFilterFreeTrialUsers';

// views
import { freeTrialUsersTableBodyConverter } from '@/views/free-trial/models/converter/freeTrialUsersTableBodyConverter';
import { useFreeTrialStore } from '@/views/free-trial/models/store';

export const useGetFreeTrialUsersBody = () => {
  const { page, periodType, baseDate } = useFreeTrialStore();

  const filter = useMemo(() => {
    return {
      periodType: periodType,
      baseDate: baseDate,
      page: page,
      size: 10,
      timeZone: 'Asia/Seoul',
    };
  }, [periodType, baseDate, page]);

  /** 무료체험 유저 조회 */
  const { submitFreeTrialUserForm, isPending, error } = useFilterFreeTrialUsers(filter);

  const tableData = useMemo(() => {
    const freeTrialUsers = submitFreeTrialUserForm.freeTrialUsers.content;
    return freeTrialUsersTableBodyConverter(freeTrialUsers);
  }, [submitFreeTrialUserForm]);

  return {
    tableData,
    isPending,
    error,
  };
};
