import { useMutation } from '@tanstack/react-query';

// entities
import { freeTrialUserRepository } from '@/entities/free-trial-user/services/FreeTrialUserRepositoryImpl';

// actions
import { actionSubmitFreeTrialForm } from '@/features/register-free-trial/services/actions/actionSubmitFreeTrialForm';

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
    mutationFn: () => actionSubmitFreeTrialForm({ formData: store, repository: freeTrialUserRepository }),
    throwOnError: true,
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: () => {
      if (onErrorCallback) {
        onErrorCallback();
      }
    },
  });

  return {
    submitFreeTrialUserForm,
    isPending,
    error,
  };
};
