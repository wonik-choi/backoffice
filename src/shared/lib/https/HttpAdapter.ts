// instance
import { FetchAdapter, fetchAdapter } from '@/shared/lib/https/fetch/baseFetch';

// interface
import { HttpClient, RequestOptions, HttpResponse } from '@/shared/lib/https/interface';

/** 구조체 변경 대비 layer 설정 */
export class HttpAdaptor implements HttpClient {
  constructor(private readonly fetchAdapter: FetchAdapter) {}

  get<T>(url: string, options?: RequestOptions, serverAction?: boolean): Promise<HttpResponse<T>> {
    return this.fetchAdapter.get<T>(url, options, serverAction);
  }

  post<T>(url: string, data?: unknown, options?: RequestOptions, serverAction?: boolean): Promise<HttpResponse<T>> {
    return this.fetchAdapter.post<T>(url, data, options, serverAction);
  }

  patch<T>(url: string, data: unknown, options?: RequestOptions, serverAction?: boolean): Promise<HttpResponse<T>> {
    return this.fetchAdapter.patch<T>(url, data, options, serverAction);
  }

  put<T>(url: string, data: unknown, options?: RequestOptions, serverAction?: boolean): Promise<HttpResponse<T>> {
    return this.fetchAdapter.put<T>(url, data, options, serverAction);
  }

  delete<T>(url: string, options?: RequestOptions, serverAction?: boolean): Promise<HttpResponse<T>> {
    return this.fetchAdapter.delete<T>(url, options, serverAction);
  }
}

export const httpAdaptor = new HttpAdaptor(fetchAdapter);
