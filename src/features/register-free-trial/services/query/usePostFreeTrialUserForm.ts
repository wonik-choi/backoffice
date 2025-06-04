import { useMutation } from '@tanstack/react-query';

// entities
import { freeTrialUserRepository } from '@/entities/free-trial-user/services/FreeTrialUserRepositoryImpl';

// usecase
import { submitFreeTrialFormUsecase } from '@/features/register-free-trial/services/usecase/submitFreeTrialFormUsecase';

// config
import { RegisterFreeTrialQueryKeys } from '@/features/register-free-trial/config/query-keys';
import { PostFreeTrialUserFormProps } from '@/features/register-free-trial/model/interface';

export const usePostFreeTrialUserForm = ({ store, onSuccessCallback, onErrorCallback }: PostFreeTrialUserFormProps) => {
  const {
    mutate: submitFreeTrialUserForm,
    isPending,
    error,
  } = useMutation({
    ...RegisterFreeTrialQueryKeys.free_trial_user_register_form,
    mutationFn: () => {
      const { inflowCode } = store;

      // 유입코드가 존재할 경우
      if (inflowCode) {
        return submitFreeTrialFormUsecase({ formData: store, repository: freeTrialUserRepository, inflowCode });
      }

      return submitFreeTrialFormUsecase({ formData: store, repository: freeTrialUserRepository });
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
    submitFreeTrialUserForm,
    isPending,
    error,
  };
};
