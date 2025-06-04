import { createKyClient } from '@/shared/lib/https/ky/kyClientsCreater';

import { setUserTokenOnHeader, convertKyOptions, extendKyErrorAfterResponse } from '@/shared/lib/https/ky/interceptor';
import { HttpClient, HttpResponse, RequestOptions } from '@/shared/lib/https/interface';
import { KyInstance } from 'ky';

export const baseClient = createKyClient({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    afterResponse: [extendKyErrorAfterResponse],
  },
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

export class BaseClient implements HttpClient {
  constructor(private readonly client: KyInstance) {}

  /**
   * @param url endpoint
   * @param options ky 내 설정된 options
   * @returns json 형식의 Promise<T>
   */
  public get = async <T>(url: string, options?: RequestOptions): Promise<HttpResponse<T>> => {
    const kyOptions = convertKyOptions(options);

    const response = await this.client.get<T>(url, kyOptions);

    return {
      data: response.json(),
      headers: response.headers,
      status: response.status,
    };
  };

  /**
   * @param url endpoint
   * @param body 요청 본문
   * @param options ky 내 설정된 options
   * @returns json 형식의 Promise<T>
   */
  public post = async <T>(url: string, body: unknown, options?: RequestOptions): Promise<HttpResponse<T>> => {
    const kyOptions = convertKyOptions(options);

    const wrapperdOptions = {
      ...kyOptions,
      json: body,
    };

    const response = await this.client.post<T>(url, wrapperdOptions);

    return {
      data: response.json(),
      headers: response.headers,
      status: response.status,
    };
  };

  /**
   * @param url endpoint
   * @param body 요청 본문
   * @param options ky 내 설정된 options
   * @returns json 형식의 Promise<T>
   */
  public patch = async <T>(url: string, body: unknown, options?: RequestOptions): Promise<HttpResponse<T>> => {
    const kyOptions = convertKyOptions(options);

    const wrapperdOptions = {
      ...kyOptions,
      json: body,
    };

    const response = await this.client.patch<T>(url, wrapperdOptions);

    return {
      data: response.json(),
      headers: response.headers,
      status: response.status,
    };
  };

  /**
   * @param url endpoint
   * @param body 요청 본문
   * @param options ky 내 설정된 options
   * @returns json 형식의 Promise<T>
   */
  public put = async <T>(url: string, body: unknown, options?: RequestOptions): Promise<HttpResponse<T>> => {
    const kyOptions = convertKyOptions(options);

    const wrapperdOptions = {
      ...kyOptions,
      json: body,
    };

    const response = await this.client.put<T>(url, wrapperdOptions);

    return {
      data: response.json(),
      headers: response.headers,
      status: response.status,
    };
  };

  /**
   * @param url endpoint
   * @param options ky 내 설정된 options
   * @returns json 형식의 Promise<T>
   */
  public delete = async <T>(url: string, options?: RequestOptions): Promise<HttpResponse<T>> => {
    const kyOptions = convertKyOptions(options);

    const response = await this.client.delete<T>(url, kyOptions);

    return {
      data: response.json(),
      headers: response.headers,
      status: response.status,
    };
  };
}

export const baseClientAdapter = new BaseClient(baseClient);
