import { useMutation } from '@tanstack/react-query';

// entities
import { FreeTrialUserRequestDto } from '@/entities/free-trial-user/models/dtos';

// actions
import { actionSubmitFreeTrialForm } from '@/features/register-free-trial/services/actions/actionSubmitFreeTrialForm';

import { FreeTrialUserState } from '@/features/register-free-trial/model/store/interface';

// config
import { RegisterFreeTrialQueryKeys } from '@/features/register-free-trial/config/query-keys';
import { PostFreeTrialUserFormProps } from '@/features/register-free-trial/model/interface';

export const usePostFreeTrialUserForm = ({ store }: PostFreeTrialUserFormProps) => {
  const {} = store;

  const {
    mutate: submitFreeTrialUserForm,
    isPending,
    error,
  } = useMutation({
    ...RegisterFreeTrialQueryKeys.free_trial_user_register_form,
    mutationFn: () => actionSubmitFreeTrialForm(store),
    throwOnError: true,
    retry: true,
  });

  return {
    submitFreeTrialUserForm,
    isPending,
    error,
  };
};
