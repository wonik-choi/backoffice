export interface ServerError {
  status: number;
  message: string;
  error: string;
  debug: {
    exception: string;
    message: string;
  };
}

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

export interface HttpResponse<T> {
  data: Promise<T>;
  headers: Headers;
  status: number;
}

export interface HttpClient {
  get<T>(url: string, options?: RequestOptions, serverAction?: boolean): Promise<HttpResponse<T>>;
  post<T>(url: string, data?: unknown, options?: RequestOptions, serverAction?: boolean): Promise<HttpResponse<T>>;
  patch<T>(url: string, data: unknown, options?: RequestOptions, serverAction?: boolean): Promise<HttpResponse<T>>;
  put<T>(url: string, data: unknown, options?: RequestOptions, serverAction?: boolean): Promise<HttpResponse<T>>;
  delete<T>(url: string, options?: RequestOptions, serverAction?: boolean): Promise<HttpResponse<T>>;
}
