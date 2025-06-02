// features
import { loginSchema, LoginSchema } from '@/features/authentication/config/schema';

// entities
import { AuthenticationRepository } from '@/entities/common/authentication/models/repository';

/**
 * @description
 * login 요청 액션
 * @param formData login form
 */
export async function postLoginUsecase(formData: LoginSchema, repository: AuthenticationRepository) {
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
