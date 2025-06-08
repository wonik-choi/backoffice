import { useMutation } from '@tanstack/react-query';

// shared
import { wrapperSentry } from '@/shared/lib/errors/wrapperSentry';

// entities
import { tempUserRepository } from '@/entities/temp-user/services/TempUserRepositoryImpl';

// models
import { PostTempUserFormProps, ApplyFreeTrialFormData } from '@/features/apply-free-trial/model/interface';

// config
import { RegisterFreeTrialQueryKeys } from '@/features/register-free-trial/config/query-keys';
import { applyFreeTrialRequestSchema } from '../../config/schema';
import { TempUserRequestDto } from '@/entities/temp-user/models/repository';
import { SENTRY_OP_GUIDE } from '@/shared/lib/errors/config';

export const useApplyFreeTrial = ({ onSuccessCallback, onErrorCallback }: PostTempUserFormProps) => {
  const {
    mutate: applyTempUser,
    isPending,
    error,
  } = useMutation({
    ...RegisterFreeTrialQueryKeys.free_trial_user_register_form,
    mutationFn: ({ tempFormData, inflowCode }: { tempFormData: ApplyFreeTrialFormData; inflowCode: string | null }) => {
      return wrapperSentry(
        async () => {
          try {
            // 검증
            const validatedBody: TempUserRequestDto = applyFreeTrialRequestSchema.parse(tempFormData);
            // 유입 코드가 존재할 경우 같이 전달
            if (inflowCode) {
              validatedBody.inflowCode = inflowCode;
            }
            // 서버 제출
            const response = await tempUserRepository.createTempUser(validatedBody);

            return response;
          } catch (error) {
            throw error;
          }
        },
        'applyFreeTrialFormUsecase',
        SENTRY_OP_GUIDE.QUERY_MUTATION
      );
    },
    throwOnError: false,
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error: Error) => {
      console.log('useApplyFreeTrial onError', error);
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
