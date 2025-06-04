import { useMutation } from '@tanstack/react-query';

// entities
import { authenticationRepository } from '@/entities/common/authentication/services/repositoryImpl';

// features
import { postLoginUsecase } from '@/features/authentication/services/usecase/postLoginUsecase';
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
      return postLoginUsecase(formData, authenticationRepository);
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
