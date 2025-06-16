import { useQuery, useSuspenseQuery, useQueryClient } from '@tanstack/react-query';

// shared
import { httpAdaptor } from '@/shared/lib/https/HttpAdapter';
import { wrapperSentry } from '@/shared/lib/errors/wrapperSentry';
import { SENTRY_OP_GUIDE } from '@/shared/lib/errors/config';
import { parsingErrorCapture } from '@/shared/lib/errors/ParsingErrorCapture';
import { useSuspenseLikeQuery } from '@/shared/hooks/useSuspenseLikeQuery';

// entities
import { GetFreeTrialUsersResponseDto } from '@/entities/free-trial-user/models/dtos';
import { GetFreeTrialUsersRequestDto } from '@/entities/free-trial-user/models/repository';

// features
import { FreeTrialUsersQueryKeys } from '@/features/free-trial-users/config/query-keys';
import { ServerCustomError, UnknownError } from '@/shared/lib/errors/errors';

export const useFilterFreeTrialUsers = (filter: GetFreeTrialUsersRequestDto) => {
  const queryClient = useQueryClient();

  const data = useSuspenseLikeQuery<GetFreeTrialUsersResponseDto, ServerCustomError | UnknownError>({
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
            const customError = parsingErrorCapture.capture(error);
            throw customError;
          }
        },
        'useFilterFreeTrialUsers',
        SENTRY_OP_GUIDE.QUERY_MUTATION
      );
    },
    retry: false,
    refetchOnMount: true,
    throwOnError: true,
    initialData: queryClient.getQueryData(
      FreeTrialUsersQueryKeys.free_trial_users.lists({
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
