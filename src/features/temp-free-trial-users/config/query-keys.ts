import { createQueryKeyStore } from '@lukemorales/query-key-factory';

// entities
import { GetTempUsersRequestDto } from '@/entities/temp-user/models/repository';

export const TempFreeTrialUsersQueryKeys = createQueryKeyStore({
  temp_free_trial_users: {
    queryKey: ['temp_free_trial_users'],
    lists: (params: GetTempUsersRequestDto) => ({
      queryKey: [params.periodType, params.baseDate, params.timeZone, params.page, params.size],
    }),
  },
});
