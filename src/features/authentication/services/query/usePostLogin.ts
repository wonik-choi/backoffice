import { useMutation } from '@tanstack/react-query';

// features
import { actionPostLogin } from '@/features/authentication/services/actions/actionPostLogin';
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
      return actionPostLogin(formData);
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
