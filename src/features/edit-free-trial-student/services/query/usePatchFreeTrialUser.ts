import { useMutation } from '@tanstack/react-query';

// shared
import { wrapperSentry } from '@/shared/lib/errors/wrapperSentry';
import { httpAdaptor } from '@/shared/lib/https/HttpAdapter';
import { SENTRY_OP_GUIDE } from '@/shared/lib/errors/config';
import { parsingErrorCapture } from '@/shared/lib/errors/ParsingErrorCapture';

// entities
import { PatchFreeTrialUserRequestDto } from '@/entities/free-trial-user/models/repository';

// features
import { PostAuthenticationMutationProps } from '@/features/authentication/model/interface';
import { LoginSchema } from '@/features/authentication/config/schema';
import { EditFreeTrialUserQueryKeys } from '@/features/edit-free-trial-student/config/query-keys';

interface PatchFreeTrialUserMutationProps {
  freeTrialUserId: string;
  formData: PatchFreeTrialUserRequestDto;
}

export const usePatchFreeTrialUser = ({ onSuccessCallback, onErrorCallback }: PostAuthenticationMutationProps) => {
  const {
    mutate: patchFreeTrialUser,
    isPending,
    error,
  } = useMutation({
    ...EditFreeTrialUserQueryKeys.patchFreeTrialUser,
    mutationFn: ({ freeTrialUserId, formData }: PatchFreeTrialUserMutationProps) => {
      return wrapperSentry(
        async () => {
          try {
            // 서버 제출
            const response = await httpAdaptor.patch(
              `api/free-trial-user?freeTrialUserId=${freeTrialUserId}`,
              formData,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
              },
              true
            );

            return response;
          } catch (error) {
            const customError = parsingErrorCapture.capture(error);
            throw customError;
          }
        },
        'usePatchFreeTrialUser',
        SENTRY_OP_GUIDE.QUERY_MUTATION
      );
    },
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

  return { patchFreeTrialUser, isPending, error };
};
