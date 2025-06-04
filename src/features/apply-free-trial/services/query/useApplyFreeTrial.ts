import { useMutation } from '@tanstack/react-query';

// entities
import { tempUserRepository } from '@/entities/temp-user/services/TempUserRepositoryImpl';

// usecase
import { applyFreeTrialFormUsecase } from '@/features/apply-free-trial/services/usecase/applyFreeTrialFormUsecase';

// models
import { PostTempUserFormProps, ApplyFreeTrialFormData } from '@/features/apply-free-trial/model/interface';

// config
import { RegisterFreeTrialQueryKeys } from '@/features/register-free-trial/config/query-keys';

export const useApplyFreeTrial = ({ onSuccessCallback, onErrorCallback }: PostTempUserFormProps) => {
  const {
    mutate: applyTempUser,
    isPending,
    error,
  } = useMutation({
    ...RegisterFreeTrialQueryKeys.free_trial_user_register_form,
    mutationFn: ({ tempFormData, inflowCode }: { tempFormData: ApplyFreeTrialFormData; inflowCode: string | null }) => {
      // 유입코드가 존재할 경우
      if (inflowCode) {
        return applyFreeTrialFormUsecase({ formData: tempFormData, repository: tempUserRepository, inflowCode });
      }

      return applyFreeTrialFormUsecase({ formData: tempFormData, repository: tempUserRepository });
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
    applyTempUser,
    isPending,
    error,
  };
};
