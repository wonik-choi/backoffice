import { useMutation } from '@tanstack/react-query';

// entities
import { freeTrialUserRepository } from '@/entities/free-trial-user/services/FreeTrialUserRepositoryImpl';

// actions
import { actionSubmitFreeTrialForm } from '@/features/register-free-trial/services/actions/actionSubmitFreeTrialForm';

// config
import { RegisterFreeTrialQueryKeys } from '@/features/register-free-trial/config/query-keys';
import { PostFreeTrialUserFormProps } from '@/features/register-free-trial/model/interface';
import { KyServerError } from '@/shared/lib/https/ky/interceptor';

export const usePostFreeTrialUserForm = ({ store, onSuccessCallback, onErrorCallback }: PostFreeTrialUserFormProps) => {
  const {
    mutate: submitFreeTrialUserForm,
    isPending,
    error,
  } = useMutation({
    ...RegisterFreeTrialQueryKeys.free_trial_user_register_form,
    mutationFn: () => actionSubmitFreeTrialForm({ formData: store, repository: freeTrialUserRepository }),
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
