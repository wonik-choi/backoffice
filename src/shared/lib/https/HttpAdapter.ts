// instance
import { BaseClient } from '@/shared/lib/https/ky/baseClient';
import { FetchAdapter, fetchAdapter } from '@/shared/lib/https/fetch/baseFetch';
import { baseClientAdapter } from '@/shared/lib/https/ky/baseClient';

// interface
import { HttpClient, RequestOptions, AdapterKey, HttpAdaptorStruct } from '@/shared/lib/https/interface';

// kakao
import { kakaoSearchClientAdapter, KakaoSearchClient } from '@/shared/lib/https/ky/kakaoSearchClient';

/** 구조체 변경 대비 layer 설정 */
export class HttpAdaptor implements HttpAdaptorStruct {
  private readonly instance: Record<AdapterKey, HttpClient>;
  constructor(
    private readonly baseClientAdapter: BaseClient,
    private readonly fetchAdapter: FetchAdapter,
    private readonly kakaoSearchClientAdapter: KakaoSearchClient
  ) {
    this.instance = {
      ky: baseClientAdapter,
      fetch: fetchAdapter,
      kakao: kakaoSearchClientAdapter,
    };
  }

  private client(key: AdapterKey) {
    return this.instance[key];
  }

  get<T>(url: string, key: AdapterKey = 'ky', options?: RequestOptions): Promise<T> {
    return this.client(key).get<T>(url, options);
  }

  post<T>(url: string, data?: unknown, key: AdapterKey = 'ky', options?: RequestOptions): Promise<T> {
    return this.client(key).post<T>(url, data, options);
  }

  patch<T>(url: string, data: unknown, key: AdapterKey = 'ky', options?: RequestOptions): Promise<T> {
    return this.client(key).patch<T>(url, data, options);
  }

  put<T>(url: string, data: unknown, key: AdapterKey = 'ky', options?: RequestOptions): Promise<T> {
    return this.client(key).put<T>(url, data, options);
  }

  delete<T>(url: string, key: AdapterKey = 'ky', options?: RequestOptions): Promise<T> {
    return this.client(key).delete<T>(url, options);
  }
}

export const httpAdaptor = new HttpAdaptor(baseClientAdapter, fetchAdapter, kakaoSearchClientAdapter);
