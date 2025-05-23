// features
import type { ActionSubmitFreeTrialFormProps } from '@/features/register-free-trial/model/interface';
import { freeTrialUserRequestBodySchema } from '@/features/register-free-trial/config/schema';

/**
 * @description
 * 무료체험 신청 폼 제출 액션
 * @param formData 작성한 폼 데이터
 * @param repository 무료체험 신청 repository (inject)
 */
export async function actionSubmitFreeTrialForm({ formData, repository }: ActionSubmitFreeTrialFormProps) {
  try {
    // 검증
    console.log('formData', formData);
    const validatedBody = freeTrialUserRequestBodySchema.parse(formData);

    // 서버 제출
    const response = await repository.createFreeTrialUser(validatedBody);

    return response;
  } catch (error) {
    console.error('Form submission error:', error);
    return Promise.reject(error);
  }
}
