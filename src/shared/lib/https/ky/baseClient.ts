import { createKyClient } from '@/shared/lib/https/ky/kyClientsCreater';

import { setUserTokenOnHeader, convertKyOptions } from '@/shared/lib/https/ky/interceptor';
import { HttpClient, RequestOptions } from '@/shared/lib/https/interface';
import { KyInstance } from 'ky';

const setTokenOnHeader = setUserTokenOnHeader(() => localStorage.getItem('accessToken'));

export const baseClient = createKyClient({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [setTokenOnHeader],
  },
});

export class BaseClient implements HttpClient {
  constructor(private readonly client: KyInstance) {}

  /**
   * @param url endpoint
   * @param options ky 내 설정된 options
   * @returns json 형식의 Promise<T>
   */
  public get = async <T>(url: string, options?: RequestOptions): Promise<T> => {
    const kyOptions = convertKyOptions(options);

    const response = await this.client.get(url, kyOptions);

    return response.json<T>();
  };

  /**
   * @param url endpoint
   * @param body 요청 본문
   * @param options ky 내 설정된 options
   * @returns json 형식의 Promise<T>
   */
  public post = async <T>(url: string, body: unknown, options?: RequestOptions) => {
    const kyOptions = convertKyOptions(options);

    const wrapperdOptions = {
      ...kyOptions,
      json: body,
    };

    const response = await this.client.post(url, wrapperdOptions);

    return response.json<T>();
  };

  /**
   * @param url endpoint
   * @param body 요청 본문
   * @param options ky 내 설정된 options
   * @returns json 형식의 Promise<T>
   */
  public patch = async <T>(url: string, body: unknown, options?: RequestOptions) => {
    const kyOptions = convertKyOptions(options);

    const wrapperdOptions = {
      ...kyOptions,
      json: body,
    };

    const response = await this.client.patch(url, wrapperdOptions);

    return response.json<T>();
  };

  /**
   * @param url endpoint
   * @param body 요청 본문
   * @param options ky 내 설정된 options
   * @returns json 형식의 Promise<T>
   */
  public put = async <T>(url: string, body: unknown, options?: RequestOptions) => {
    const kyOptions = convertKyOptions(options);

    const wrapperdOptions = {
      ...kyOptions,
      json: body,
    };

    const response = await this.client.put(url, wrapperdOptions);

    return response.json<T>();
  };

  /**
   * @param url endpoint
   * @param options ky 내 설정된 options
   * @returns json 형식의 Promise<T>
   */
  public delete = async <T>(url: string, options?: RequestOptions) => {
    const kyOptions = convertKyOptions(options);

    const response = await this.client.delete(url, kyOptions);

    return response.json<T>();
  };
}

export const baseClientAdapter = new BaseClient(baseClient);
