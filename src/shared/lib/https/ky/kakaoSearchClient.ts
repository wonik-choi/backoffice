import { createKyClient } from '@/shared/lib/https/ky/kyClientsCreater';
import { HttpClient, HttpResponse, RequestOptions } from '@/shared/lib/https/interface';
import { KyInstance } from 'ky-universal';
import { convertKyOptions } from '@/shared/lib/https/ky/interceptor';

export const kakaoSearchClient = createKyClient({
  prefixUrl: process.env.NEXT_PUBLIC_KAKAO_API_URL,
  headers: {
    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_CLIENT_KEY}`,
  },
});

export class KakaoSearchClient implements HttpClient {
  constructor(private readonly client: KyInstance) {}

  public get = async <T>(url: string, options?: RequestOptions): Promise<HttpResponse<T>> => {
    const kyOptions = convertKyOptions(options);

    const response = await this.client.get<T>(url, kyOptions);

    return {
      data: response.json(),
      headers: response.headers,
      status: response.status,
    };
  };

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

  public put = async <T>(url: string, body: unknown, options?: RequestOptions): Promise<HttpResponse<T>> => {
    const kyOptions = convertKyOptions(options);

    const wrapperdOptions = {
      ...kyOptions,
      json: body,
    };

    const response = await this.client.put(url, wrapperdOptions);

    return {
      data: response.json(),
      headers: response.headers,
      status: response.status,
    };
  };

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

export const kakaoSearchClientAdapter = new KakaoSearchClient(kakaoSearchClient);
