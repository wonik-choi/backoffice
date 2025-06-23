import { useMutation } from '@tanstack/react-query';

// shared
import { wrapperSentry } from '@/shared/lib/errors/wrapperSentry';
import { httpAdaptor } from '@/shared/lib/https/HttpAdapter';
import { parsingErrorCapture } from '@/shared/lib/errors/ParsingErrorCapture';

// models
import { PostTempUserFormProps } from '@/features/temp-free-trial-user/models/interface';

// config
import { TempFreeTrialUserQueryKeys } from '@/features/temp-free-trial-user/config/query-keys';

import { SENTRY_OP_GUIDE } from '@/shared/lib/errors/config';

export const useDeleteTempFreeTrialUser = ({ onSuccessCallback, onErrorCallback }: PostTempUserFormProps) => {
  const {
    mutate: deleteTempUser,
    isPending,
    error,
  } = useMutation({
    ...TempFreeTrialUserQueryKeys.deleteTempFreeTrialUser,
    mutationFn: (freeTrialUserId: string) => {
      return wrapperSentry(
        async () => {
          try {
            // 서버 제출
            const response = await httpAdaptor.delete(
              `api/temp-free-trial-user?tempFreeTrialUserId=${freeTrialUserId}`,
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
        'useDeleteTempFreeTrialUser',
        SENTRY_OP_GUIDE.QUERY_MUTATION
      );
    },
    throwOnError: false,
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error: Error) => {
      if (onErrorCallback) {
        onErrorCallback(error);
      }
    },
  });

  return {
    deleteTempUser,
    isPending,
    error,
  };
};
