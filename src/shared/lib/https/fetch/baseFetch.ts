// shared
import { ClientCustomError } from '@/shared/lib/errors/errors';

// FetchAdapter.ts
import type { HttpClient, RequestOptions, HttpResponse } from '@/shared/lib/https/interface';

export class FetchAdapter implements HttpClient {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || '';
  }

  /**
   * @description get 요청 (query 포함)
   * @param url get 요청 (query 포함)
   * @param opts options
   */
  async get<T>(url: string, opts: RequestOptions = {}, serverAction: boolean = false): Promise<HttpResponse<T>> {
    const baseUrl = serverAction ? `${url}` : `${this.baseURL}${url}`;
    const response = await fetch(baseUrl, {
      method: 'GET',
      headers: { ...opts.headers },
      credentials: opts.credentials, // 필요 시 include 등
      next: opts.next,
      cache: 'no-store',
    });

    const data = (await response.json()) as T;

    /**
     * 서버 에러 처리
     */
    if (!response.ok) {
      throw data;
    }

    return {
      data: data as Promise<T>,
      headers: response.headers,
      status: response.status,
    };
  }

  /**
   * @description post 요청 (JSON 또는 x-www-form-urlencoded)
   * @param url post 요청 (JSON 또는 x-www-form-urlencoded)
   * @param body body
   * @param opts options
   */
  async post<T>(
    url: string,
    body: unknown,
    opts: RequestOptions = {},
    serverAction: boolean = false
  ): Promise<HttpResponse<T>> {
    // 1) headers 복사 (caller가 헤더에 Content-Type을 지정했을 수 있음)
    const headers: Record<string, string> = { ...opts.headers };

    // 2) body 직렬화:
    //    - 만약 caller가 Content-Type을 "application/x-www-form-urlencoded"로 줬다면,
    //      body는 반드시 URLSearchParams나 직접 직렬화된 문자열이라고 가정
    //    - 그렇지 않으면 body를 JSON으로 직렬화
    let serializedBody: string | undefined;

    if (headers['Content-Type']?.startsWith('application/x-www-form-urlencoded')) {
      // caller가 URLSearchParams를 body로 넘겼다면:

      if (typeof body === 'string') {
        serializedBody = body;
      } else {
        // 잘못된 사용: 객체가 넘어왔는데 Content-Type만 form-urlencoded인 경우
        throw new ClientCustomError('form-urlencoded 요청 시 body를 URLSearchParams 또는 문자열로 넘겨주세요');
      }
    } else {
      // 기본: JSON 요청
      headers['Content-Type'] = headers['Content-Type'] || 'application/json;charset=UTF-8';
      serializedBody = JSON.stringify(body);
    }

    const baseUrl = serverAction ? `${url}` : `${this.baseURL}${url}`;

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers,
      body: serializedBody,
      credentials: opts.credentials,
      next: opts.next,
      cache: 'no-store',
    });

    const data = (await response.json()) as T;

    if (!response.ok) {
      throw data;
    }

    return {
      data: data as Promise<T>,
      headers: response.headers,
      status: response.status,
    };
  }

  /**
   * @description put 요청 (JSON 전용)
   * @param url put 요청 (JSON 전용)
   * @param body body
   * @param opts options
   */
  async put<T>(
    url: string,
    body: unknown,
    opts: RequestOptions = {},
    serverAction: boolean = false
  ): Promise<HttpResponse<T>> {
    const headers: Record<string, string> = { ...opts.headers };
    headers['Content-Type'] = headers['Content-Type'] || 'application/json;charset=UTF-8';

    const baseUrl = serverAction ? `${url}` : `${this.baseURL}${url}`;

    const response = await fetch(baseUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
      credentials: opts.credentials,
      next: opts.next,
      cache: 'no-store',
    });

    const data = (await response.json()) as T;

    if (!response.ok) {
      throw data;
    }

    return {
      data: data as Promise<T>,
      headers: response.headers,
      status: response.status,
    };
  }

  /**
   * @description patch 요청 (JSON 전용)
   * @param url patch 요청 (JSON 전용)
   * @param body body
   * @param opts options
   */
  async patch<T>(
    url: string,
    body: unknown,
    opts: RequestOptions = {},
    serverAction: boolean = false
  ): Promise<HttpResponse<T>> {
    const headers: Record<string, string> = { ...opts.headers };
    headers['Content-Type'] = headers['Content-Type'] || 'application/json;charset=UTF-8';

    const baseUrl = serverAction ? `${url}` : `${this.baseURL}${url}`;

    const response = await fetch(baseUrl, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body),
      credentials: opts.credentials,
      next: opts.next,
      cache: 'no-store',
    });

    const data = (await response.json()) as T;

    if (!response.ok) {
      throw data;
    }

    return {
      data: data as Promise<T>,
      headers: response.headers,
      status: response.status,
    };
  }

  /**
   * @description delete 요청 (JSON 전용)
   * @param url delete 요청 (JSON 전용)
   * @param opts options
   */
  async delete<T>(url: string, opts: RequestOptions = {}, serverAction: boolean = false): Promise<HttpResponse<T>> {
    const baseUrl = serverAction ? `${url}` : `${this.baseURL}${url}`;

    const response = await fetch(baseUrl, {
      method: 'DELETE',
      headers: { ...opts.headers },
      credentials: opts.credentials,
      next: opts.next,
      cache: 'no-store',
    });

    const data = (await response.json()) as T;

    if (!response.ok) {
      throw data;
    }

    return {
      data: data as Promise<T>,
      headers: response.headers,
      status: response.status,
    };
  }
}
export const fetchAdapter = new FetchAdapter();
