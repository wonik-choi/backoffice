import { useMutation } from '@tanstack/react-query';

// shared
import { wrapperSentry } from '@/shared/lib/errors/wrapperSentry';
import { httpAdaptor } from '@/shared/lib/https/HttpAdapter';
import { SENTRY_OP_GUIDE } from '@/shared/lib/errors/config';

// features
import { PostAuthenticationMutationProps } from '@/features/authentication/model/interface';
import { LoginSchema } from '@/features/authentication/config/schema';
import { AuthenticationQueryKeys } from '@/features/authentication/config/query-keys';

export const usePostLogin = ({ onSuccessCallback, onErrorCallback }: PostAuthenticationMutationProps) => {
  const {
    mutate: postLogin,
    isPending,
    error,
  } = useMutation({
    ...AuthenticationQueryKeys.login,
    mutationFn: (formData: LoginSchema) => {
      return wrapperSentry(
        async () => {
          try {
            // 서버 제출
            const response = await httpAdaptor.post(
              `api/login`,
              formData,
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
        'usePostLogin',
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

  return { postLogin, isPending, error };
};
