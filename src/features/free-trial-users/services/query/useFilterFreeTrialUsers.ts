import { useSuspenseQuery } from '@tanstack/react-query';

// shared
import { httpAdaptor } from '@/shared/lib/https/HttpAdapter';
import { wrapperSentry } from '@/shared/lib/errors/wrapperSentry';
import { SENTRY_OP_GUIDE } from '@/shared/lib/errors/config';

// entities
import { GetFreeTrialUsersResponseDto } from '@/entities/free-trial-user/models/dtos';
import { GetFreeTrialUsersRequestDto } from '@/entities/free-trial-user/models/repository';

// features
import { FreeTrialUsersQueryKeys } from '@/features/free-trial-users/config/query-keys';

export const useFilterFreeTrialUsers = (filter: GetFreeTrialUsersRequestDto) => {
  const {
    data: submitFreeTrialUserForm,
    isPending,
    error,
  } = useSuspenseQuery({
    ...FreeTrialUsersQueryKeys.free_trial_users.lists({
      periodType: filter.periodType,
      baseDate: filter.baseDate,
      timeZone: filter.timeZone,
      page: filter.page,
      size: filter.size,
    }),
    queryFn: () => {
      return wrapperSentry(
        async () => {
          try {
            // 서버 제출
            const response = await httpAdaptor.get<GetFreeTrialUsersResponseDto>(
              `/api/free-trial-users?periodType=${filter.periodType}&baseDate=${filter.baseDate}&timeZone=${filter.timeZone}&page=${filter.page}&size=${filter.size}`,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
              },
              true
            );

            return response.data;
          } catch (error) {
            throw error;
          }
        },
        'useFilterFreeTrialUsers',
        SENTRY_OP_GUIDE.QUERY_MUTATION
      );
    },
    refetchOnMount: true,
  });

  return {
    submitFreeTrialUserForm,
    isPending,
    error,
  };
};
