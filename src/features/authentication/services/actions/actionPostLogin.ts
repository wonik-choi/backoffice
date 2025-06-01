'use server';

// features
import type { ActionPostLoginProps } from '@/features/authentication/model/interface';
import { loginSchema } from '@/features/authentication/config/schema';

/**
 * @description
 * login 요청 액션
 * @param formData login form
 * @param repository auth repository (inject)
 */
export async function actionPostLogin({ formData, repository }: ActionPostLoginProps) {
  try {
    // 검증
    const validatedBody = loginSchema.safeParse(formData);

    if (!validatedBody.success) {
      throw new Error('z : invalid form data', { cause: validatedBody.error });
    }

    // 서버 제출
    const response = await repository.postLogin(validatedBody.data);

    // TODO: 만일 로그인에 성공한 뒤, 해당 user 에 대한 정보를 받거나 추가 처리가 필요하다면 여기서 진행

    return response;
  } catch (error) {
    console.error('Form submission error:', error);
    throw error;
  }
}
