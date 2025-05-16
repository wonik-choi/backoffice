export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
  queryParams?: Record<string, string | number | boolean | null>; // Axios의 `params`, Ky의 `searchParams`
  credentials?: 'omit' | 'same-origin' | 'include'; // Axios: `withCredentials`, Ky: `credentials`
  next?: NextFetchRequestConfig;
}

export interface HttpClient {
  get<T>(url: string, options?: RequestOptions): Promise<T>;
  post<T>(url: string, data?: unknown, options?: RequestOptions): Promise<T>;
  patch<T>(url: string, data: unknown, options?: RequestOptions): Promise<T>;
  put<T>(url: string, data: unknown, options?: RequestOptions): Promise<T>;
  delete<T>(url: string, options?: RequestOptions): Promise<T>;
}

export type AdapterKey = 'ky' | 'fetch' | 'kakao';

export interface HttpAdaptorStruct {
  get<T>(url: string, key?: AdapterKey, options?: RequestOptions): Promise<T>;
  post<T>(url: string, data?: unknown, key?: AdapterKey, options?: RequestOptions): Promise<T>;
  patch<T>(url: string, data: unknown, key?: AdapterKey, options?: RequestOptions): Promise<T>;
  put<T>(url: string, data: unknown, key?: AdapterKey, options?: RequestOptions): Promise<T>;
  delete<T>(url: string, key?: AdapterKey, options?: RequestOptions): Promise<T>;
}
