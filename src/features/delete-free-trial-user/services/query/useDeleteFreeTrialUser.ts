import { useQueryClient, useMutation } from '@tanstack/react-query';

// shared
import { httpAdaptor } from '@/shared/lib/https/HttpAdapter';
import { wrapperSentry } from '@/shared/lib/errors/wrapperSentry';
import { SENTRY_OP_GUIDE } from '@/shared/lib/errors/config';
import { parsingErrorCapture } from '@/shared/lib/errors/ParsingErrorCapture';

// features
import { DeleteFreeTrialUserQueryKeys } from '@/features/delete-free-trial-user/config/query-keys';

export const useDeleteFreeTrialUser = ({
  onSuccessCallback,
  onErrorCallback,
}: {
  onSuccessCallback: () => void;
  onErrorCallback: (error: unknown) => void;
}) => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteFreeTrialUser,
    isPending,
    error,
  } = useMutation({
    ...DeleteFreeTrialUserQueryKeys.delete,
    mutationFn: (freeTrialUserId: string) => {
      return wrapperSentry(
        async () => {
          try {
            // 서버 제출
            const response = await httpAdaptor.delete(
              `/api/free-trial-user?freeTrialUserId=${freeTrialUserId}`,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
              },
              true
            );

            return response;
          } catch (error) {
            const customError = parsingErrorCapture.capture(error);
            throw customError;
          }
        },
        'deleteFreeTrialUser',
        SENTRY_OP_GUIDE.QUERY_MUTATION
      );
    },
    throwOnError: false,
    meta: {
      skipCapture: true,
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['free_trial_users'],
        exact: false,
      });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error: unknown) => {
      if (onErrorCallback) {
        onErrorCallback(error);
      }
    },
  });

  return {
    deleteFreeTrialUser,
    isPending,
    error,
  };
};
