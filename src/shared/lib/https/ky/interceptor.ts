import { KyRequest, KyResponse, NormalizedOptions, HTTPError } from 'ky-universal';
import { REFRESH_URL } from '@/shared/lib/https/config';
import { RequestOptions } from '@/shared/lib/https/interface';

// errors
import { ServerError } from '@/shared/lib/errors/errors';
import { parsingErrorCapture } from '@/shared/lib/errors/ParsingErrorCapture';

/**
 * @description 공통 타입 → Ky options 변환
 * @param {RequestOptions} options
 * @returns {NormalizedOptions}
 */
export const convertKyOptions = (options?: RequestOptions) => {
  return {
    method: options?.method,
    headers: options?.headers,
    timeout: options?.timeout,
    responseType: options?.responseType,
    credentials: options?.credentials,
    signal: options?.signal,
  };
};

/**
 * @description
 * afterResponse 에러 확장
 */
export const extendKyErrorAfterResponse = async (
  request: KyRequest,
  options: NormalizedOptions,
  response: KyResponse
) => {
  if (!response.ok) {
    let payload: ServerError;
    try {
      payload = await response.json<ServerError>();
    } catch (error) {
      throw new HTTPError(response, request, options);
    }

    // custom error 를 반환해줍니다.
    // 해당 instance에 대한 분기처리는 view 단에서 처리합니다.
    throw parsingErrorCapture.capture(payload);
  }
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
