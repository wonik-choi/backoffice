import { useMutation } from '@tanstack/react-query';

// shared
import { wrapperSentry } from '@/shared/lib/errors/wrapperSentry';
import { SENTRY_OP_GUIDE } from '@/shared/lib/errors/config';
import { parsingErrorCapture } from '@/shared/lib/errors/ParsingErrorCapture';

// entities
import { freeTrialUserRepository } from '@/entities/free-trial-user/services/FreeTrialUserRepositoryImpl';

// config
import { RegisterFreeTrialQueryKeys } from '@/features/register-free-trial/config/query-keys';
import { ManualPostFreeTrialUserProps } from '@/features/register-free-trial/model/interface';

import { freeTrialUserRequestDtoSchema } from '@/features/register-free-trial/config/schema';
import { ClientCustomError } from '@/shared/lib/errors/errors';
import { FreeTrialUserRequestDto } from '@/entities/free-trial-user/models/repository';

export const useManualPostFreeTrialUser = ({ onSuccessCallback, onErrorCallback }: ManualPostFreeTrialUserProps) => {
  const {
    mutate: submitFreeTrialUserForm,
    isPending,
    error,
  } = useMutation({
    ...RegisterFreeTrialQueryKeys.free_trial_user_register_form,
    mutationFn: (request: FreeTrialUserRequestDto) => {
      return wrapperSentry(
        async () => {
          try {
            // 검증
            const validatedBody = freeTrialUserRequestDtoSchema.safeParse(request);

            if (!validatedBody.success) {
              throw new ClientCustomError(validatedBody.error.issues.join(', '));
            }

            // 서버 제출
            const response = await freeTrialUserRepository.createFreeTrialUser(validatedBody.data);

            return response;
          } catch (error) {
            const customError = parsingErrorCapture.capture(error);
            throw customError;
          }
        },
        'manualPostFreeTrialUser',
        SENTRY_OP_GUIDE.QUERY_MUTATION
      );
    },
    throwOnError: false,
    meta: {
      skipCapture: true,
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

  return {
    submitFreeTrialUserForm,
    isPending,
    error,
  };
};
