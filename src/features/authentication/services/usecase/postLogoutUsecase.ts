// features
import { authenticationRepository } from '@/entities/common/authentication/services/repositoryImpl';

/**
 * @description
 * login 요청 액션
 * @param formData login form
 * @param repository auth repository (inject)
 */
export async function postLogoutUsecase() {
  try {
    // 서버 제출
    const response = await authenticationRepository.postLogout();

    if (response.status !== 200) {
      const responseData = await response.data;
      throw new Error(responseData.error);
    }

    // TODO: 만일 로그인에 성공한 뒤, 해당 user 에 대한 정보를 받거나 추가 처리가 필요하다면 여기서 진행

    return response.data;
  } catch (error) {
    console.error('Form submission error:', error);
    throw error;
  }
}
