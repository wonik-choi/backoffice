import { useSuspenseQuery } from '@tanstack/react-query';

// entities
import { freeTrialUserRepository } from '@/entities/free-trial-user/services/FreeTrialUserRepositoryImpl';

// features
import { FreeTrialUsersQueryKeys } from '@/features/free-trial-users/config/query-keys';

// lib
import { GetFreeTrialUsersRequestDto } from '@/entities/free-trial-user/models/repository';

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
    queryFn: async () => {
      const request: GetFreeTrialUsersRequestDto = {
        periodType: filter.periodType,
        baseDate: filter.baseDate,
        timeZone: filter.timeZone,
        page: filter.page,
        size: filter.size,
      };

      const response = await freeTrialUserRepository.getFreeTrialUsers(request);

      return response;
    },
  });

  return {
    submitFreeTrialUserForm,
    isPending,
    error,
  };
};
