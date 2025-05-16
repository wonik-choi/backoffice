import { KyRequest } from 'ky';
import { REFRESH_URL } from '@/shared/lib/https/config';
import { RequestOptions } from '@/shared/lib/https/interface';

/**
 * @description 공통 타입 → Ky options 변환
 * @param {RequestOptions} options
 * @returns {NormalizedOptions}
 */
export const convertKyOptions = (options?: RequestOptions) => {
  const searchParams = options?.queryParams
    ? Object.entries(options.queryParams)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => value !== null)
        .map(([key, value]) => [key, String(value)])
    : undefined;

  return {
    method: options?.method,
    headers: options?.headers,
    timeout: options?.timeout,
    responseType: options?.responseType,
    searchParams,
    credentials: options?.credentials,
    signal: options?.signal,
  };
};

/**
 * @description header 내 accessToken 을 설정하는 인터셉터
 * @param getToken - 토큰을 가져오는 함수 (인자로 전달받기에 테스트하기 편함)
 * @returns {Promise<void>}
 */
export const setUserTokenOnHeader = (getToken: () => string | null) => {
  return async (request: KyRequest) => {
    const userAccessToken = getToken();

    /** refreshToken 을 통해 AccessToken 을 재 발급받는 경우에는 기존 AccessToken 을 Header 에 담지 않는다. */
    if (request.url !== REFRESH_URL && userAccessToken) {
      request.headers.set('Authorization', `Bearer ${userAccessToken}`);
    }
  };
};
