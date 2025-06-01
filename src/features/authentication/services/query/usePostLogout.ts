import { useMutation } from '@tanstack/react-query';

// entities
import { authenticationRepository } from '@/entities/common/authentication/services/repositoryImpl';

// features
import { actionPostLogout } from '@/features/authentication/services/actions/actionPostLogout';
import { PostAuthenticationMutationProps } from '@/features/authentication/model/interface';
import { AuthenticationQueryKeys } from '@/features/authentication/config/query-keys';

export const usePostLogout = ({ onSuccessCallback, onErrorCallback }: PostAuthenticationMutationProps) => {
  const {
    mutate: postLogout,
    isPending,
    error,
  } = useMutation({
    ...AuthenticationQueryKeys.logout,
    mutationFn: () => actionPostLogout({ repository: authenticationRepository }),
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
