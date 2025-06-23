import { useMutation } from '@tanstack/react-query';

// shared
import { wrapperSentry } from '@/shared/lib/errors/wrapperSentry';

// entities
import { tempUserRepository } from '@/entities/temp-user/services/TempUserRepositoryImpl';
import { TempUserRequestDto } from '@/entities/temp-user/models/repository';
import { ApplyFreeTrialTermCode } from '@/entities/temp-user/models/enums';
import { FreeTrialUserGrade } from '@/entities/free-trial-user/models/enums';

// models
import { PostTempUserFormProps } from '@/features/temp-free-trial-user/models/interface';
import { TempFreeTrialForm } from '@/features/temp-free-trial-user/config/schema';

// config
import { TempFreeTrialUserQueryKeys } from '@/features/temp-free-trial-user/config/query-keys';
import { tempFreeTrialRequestSchema } from '../../config/schema';

import { SENTRY_OP_GUIDE } from '@/shared/lib/errors/config';

export const usePostTempFreeTrialUser = ({ onSuccessCallback, onErrorCallback }: PostTempUserFormProps) => {
  const {
    mutate: postTempFreeTrialUser,
    isPending,
    error,
  } = useMutation({
    ...TempFreeTrialUserQueryKeys.postTempFreeTrialUser,
    mutationFn: ({ tempFormData }: { tempFormData: TempFreeTrialForm }) => {
      return wrapperSentry(
        async () => {
          const formData = {
            ...tempFormData,
            grade: tempFormData.grade ?? FreeTrialUserGrade.ElementarySchool3,
            terms: [
              {
                termCode: ApplyFreeTrialTermCode.TEMP_USER_001,
                agreed: true,
              },
            ],
          };

          try {
            // 검증
            const validatedBody: TempUserRequestDto = tempFreeTrialRequestSchema.parse(formData);
            // 서버 제출
            const response = await tempUserRepository.createTempUser(validatedBody);

            return response;
          } catch (error) {
            throw error;
          }
        },
        'usePostTempFreeTrialUser',
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
    postTempFreeTrialUser,
    isPending,
    error,
  };
};
