// entities
import type { FreeTrialUserRequestDto } from '@/entities/free-trial-user/models/repository';

// features
import type { ActionSubmitFreeTrialFormProps } from '@/features/register-free-trial/model/interface';
import { freeTrialUserRequestBodySchema } from '@/features/register-free-trial/config/schema';

/**
 * @description
 * 무료체험 신청 폼 제출 액션
 * @param formData 작성한 폼 데이터
 * @param repository 무료체험 신청 repository (inject)
 */
export async function actionSubmitFreeTrialForm({ formData, repository, inflowCode }: ActionSubmitFreeTrialFormProps) {
  try {
    // 검증
    const validatedBody: FreeTrialUserRequestDto = freeTrialUserRequestBodySchema.parse(formData);
    // 유입 코드가 존재할 경우 같이 전달
    if (inflowCode) {
      validatedBody.inflow = {
        code: inflowCode,
      };
    }
    // 서버 제출
    const response = await repository.createFreeTrialUser(validatedBody);

    return response;
  } catch (error) {
    console.error('Form submission error:', error);
    return Promise.reject(error);
  }
}
