import { useMutation } from '@tanstack/react-query';

// features
import { PostAuthenticationMutationProps } from '@/features/authentication/model/interface';
import { AuthenticationQueryKeys } from '@/features/authentication/config/query-keys';
import { postLogoutUsecase } from '@/features/authentication/services/usecase/postLogoutUsecase';

export const usePostLogout = ({ onSuccessCallback, onErrorCallback }: PostAuthenticationMutationProps) => {
  const {
    mutate: postLogout,
    isPending,
    error,
  } = useMutation({
    ...AuthenticationQueryKeys.logout,
    mutationFn: () => postLogoutUsecase(),
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
