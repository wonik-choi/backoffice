// entities
import type { TempUserRequestDto } from '@/entities/temp-user/models/repository';

// features
import { ActionApplyFreeTrialForm } from '@/features/apply-free-trial/model/interface';
import { applyFreeTrialRequestSchema } from '@/features/apply-free-trial/config/schema';

/**
 * @description
 * 무료체험 신청 폼 제출 액션
 * @param formData 작성한 폼 데이터
 * @param repository 무료체험 신청 repository (inject)
 */
export async function applyFreeTrialFormUsecase({ formData, repository, inflowCode }: ActionApplyFreeTrialForm) {
  try {
    // 검증
    const validatedBody: TempUserRequestDto = applyFreeTrialRequestSchema.parse(formData);
    // 유입 코드가 존재할 경우 같이 전달
    if (inflowCode) {
      validatedBody.inflowCode = inflowCode;
    }
    // 서버 제출
    const response = await repository.createTempUser(validatedBody);

    return response;
  } catch (error) {
    console.error('Form submission error:', error);
    return Promise.reject(error);
  }
}
