import { createQueryKeyStore } from '@lukemorales/query-key-factory';

// entities
import { GetFreeTrialUsersRequestDto } from '@/entities/free-trial-user/models/repository';

export const FreeTrialUsersQueryKeys = createQueryKeyStore({
  free_trial_users: {
    queryKey: ['free_trial_users'],
    lists: (params: GetFreeTrialUsersRequestDto) => ({
      queryKey: [params.periodType, params.baseDate, params.timeZone, params.page, params.size],
    }),
  },
});
