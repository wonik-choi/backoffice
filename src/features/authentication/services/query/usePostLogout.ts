import { useMutation } from '@tanstack/react-query';

// shared
import { wrapperSentry } from '@/shared/lib/errors/wrapperSentry';
import { httpAdaptor } from '@/shared/lib/https/HttpAdapter';
import { SENTRY_OP_GUIDE } from '@/shared/lib/errors/config';

// features
import { PostAuthenticationMutationProps } from '@/features/authentication/model/interface';
import { AuthenticationQueryKeys } from '@/features/authentication/config/query-keys';

export const usePostLogout = ({ onSuccessCallback, onErrorCallback }: PostAuthenticationMutationProps) => {
  const {
    mutate: postLogout,
    isPending,
    error,
  } = useMutation({
    ...AuthenticationQueryKeys.logout,
    mutationFn: () => {
      return wrapperSentry(
        async () => {
          try {
            // 서버 제출
            const response = await httpAdaptor.post(
              'api/logout',
              null,
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
            throw error;
          }
        },
        'usePostLogout',
        SENTRY_OP_GUIDE.QUERY_MUTATION
      );
    },
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

  return { postLogout, isPending, error };
};
