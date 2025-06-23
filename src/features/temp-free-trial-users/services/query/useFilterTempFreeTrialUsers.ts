import { useQueryClient } from '@tanstack/react-query';

// shared
import { httpAdaptor } from '@/shared/lib/https/HttpAdapter';
import { wrapperSentry } from '@/shared/lib/errors/wrapperSentry';
import { SENTRY_OP_GUIDE } from '@/shared/lib/errors/config';
import { parsingErrorCapture } from '@/shared/lib/errors/ParsingErrorCapture';
import { useSuspenseLikeQuery } from '@/shared/hooks/useSuspenseLikeQuery';

// entities
import { GetTempUsersRequestDto } from '@/entities/temp-user/models/repository';
import { GetTempFreeTrialUsersResponseDto } from '@/entities/temp-user/models/dtos';

// features
import { TempFreeTrialUsersQueryKeys } from '@/features/temp-free-trial-users/config/query-keys';
import { ServerCustomError, UnknownError } from '@/shared/lib/errors/errors';

export const useFilterTempFreeTrialUsers = (filter: GetTempUsersRequestDto) => {
  const queryClient = useQueryClient();

  const data = useSuspenseLikeQuery<GetTempFreeTrialUsersResponseDto, ServerCustomError | UnknownError>({
    ...TempFreeTrialUsersQueryKeys.temp_free_trial_users.lists({
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
            const response = await httpAdaptor.get<GetTempFreeTrialUsersResponseDto>(
              `/api/temp-free-trial-users?periodType=${filter.periodType}&baseDate=${filter.baseDate}&timeZone=${filter.timeZone}&page=${filter.page}&size=${filter.size}`,
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
            const customError = parsingErrorCapture.capture(error);
            throw customError;
          }
        },
        'useFilterTempFreeTrialUsers',
        SENTRY_OP_GUIDE.QUERY_MUTATION
      );
    },
    retry: false,
    throwOnError: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    initialData: queryClient.getQueryData(
      TempFreeTrialUsersQueryKeys.temp_free_trial_users.lists({
        periodType: filter.periodType,
        baseDate: filter.baseDate,
        timeZone: filter.timeZone,
        page: filter.page,
        size: filter.size,
      }).queryKey
    ),
  });

  return data;
};
