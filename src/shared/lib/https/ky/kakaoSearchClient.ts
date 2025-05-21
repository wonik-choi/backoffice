import { createKyClient } from '@/shared/lib/https/ky/kyClientsCreater';
import { HttpClient, RequestOptions } from '@/shared/lib/https/interface';
import { KyInstance } from 'ky';
import { convertKyOptions } from '@/shared/lib/https/ky/interceptor';

export const kakaoSearchClient = createKyClient({
  prefixUrl: process.env.NEXT_PUBLIC_KAKAO_API_URL,
  headers: {
    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_CLIENT_KEY}`,
  },
});

export class KakaoSearchClient implements HttpClient {
  constructor(private readonly client: KyInstance) {}

  public get = async <T>(url: string, options?: RequestOptions): Promise<T> => {
    const kyOptions = convertKyOptions(options);

    const response = await this.client.get(url, kyOptions);

    return response.json<T>();
  };

  public post = async <T>(url: string, body: unknown, options?: RequestOptions): Promise<T> => {
    const kyOptions = convertKyOptions(options);

    const wrapperdOptions = {
      ...kyOptions,
      json: body,
    };

    const response = await this.client.post(url, wrapperdOptions);

    return response.json<T>();
  };

  public patch = async <T>(url: string, body: unknown, options?: RequestOptions): Promise<T> => {
    const kyOptions = convertKyOptions(options);

    const wrapperdOptions = {
      ...kyOptions,
      json: body,
    };

    const response = await this.client.patch(url, wrapperdOptions);

    return response.json<T>();
  };

  public put = async <T>(url: string, body: unknown, options?: RequestOptions): Promise<T> => {
    const kyOptions = convertKyOptions(options);

    const wrapperdOptions = {
      ...kyOptions,
      json: body,
    };

    const response = await this.client.put(url, wrapperdOptions);

    return response.json<T>();
  };

  public delete = async <T>(url: string, options?: RequestOptions): Promise<T> => {
    const kyOptions = convertKyOptions(options);

    const response = await this.client.delete(url, kyOptions);

    return response.json<T>();
  };
}

export const kakaoSearchClientAdapter = new KakaoSearchClient(kakaoSearchClient);
