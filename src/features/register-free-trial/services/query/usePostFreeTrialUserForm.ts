import { useMutation } from '@tanstack/react-query';

// shared
import { wrapperSentry } from '@/shared/lib/errors/wrapperSentry';
import { SENTRY_OP_GUIDE } from '@/shared/lib/errors/config';

// entities
import { freeTrialUserRepository } from '@/entities/free-trial-user/services/FreeTrialUserRepositoryImpl';
import { FreeTrialUserRequestDto } from '@/entities/free-trial-user/models/repository';

// config
import { RegisterFreeTrialQueryKeys } from '@/features/register-free-trial/config/query-keys';
import { PostFreeTrialUserFormProps } from '@/features/register-free-trial/model/interface';

import { freeTrialUserRequestBodySchema } from '@/features/register-free-trial/config/schema';

export const usePostFreeTrialUserForm = ({ store, onSuccessCallback, onErrorCallback }: PostFreeTrialUserFormProps) => {
  const {
    mutate: submitFreeTrialUserForm,
    isPending,
    error,
  } = useMutation({
    ...RegisterFreeTrialQueryKeys.free_trial_user_register_form,
    mutationFn: () => {
      const { inflowCode } = store;

      return wrapperSentry(
        async () => {
          try {
            // 검증
            const validatedBody: FreeTrialUserRequestDto = freeTrialUserRequestBodySchema.parse(store);
            // 유입 코드가 존재할 경우 같이 전달
            if (inflowCode) {
              validatedBody.inflow = {
                code: inflowCode,
              };
            }
            // 서버 제출
            const response = await freeTrialUserRepository.createFreeTrialUser(validatedBody);

            return response;
          } catch (error) {
            console.error('Form submission error:', error);
            throw error;
          }
        },
        'submitFreeTrialFormUsecase',
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
