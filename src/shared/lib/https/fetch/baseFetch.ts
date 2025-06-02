// FetchAdapter.ts
import type { HttpClient, RequestOptions } from '@/shared/lib/https/interface';

export class FetchAdapter implements HttpClient {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || '';
  }

  // GET 요청: queryParams를 붙여서 호출
  async get<T>(url: string, opts: RequestOptions = {}): Promise<T> {
    const queryString = opts.queryParams
      ? '?' +
        new URLSearchParams(
          Object.entries(opts.queryParams)
            .filter(([, v]) => v != null)
            .map(([k, v]) => [k, String(v)])
        ).toString()
      : '';

    const res = await fetch(`${this.baseURL}${url}${queryString}`, {
      method: 'GET',
      headers: { ...opts.headers },
      credentials: opts.credentials, // 필요 시 include 등
      next: opts.next,
    });

    return this.parseResponse<T>(res);
  }

  // POST 요청: JSON 또는 x-www-form-urlencoded
  async post<T>(url: string, body: unknown, opts: RequestOptions = {}): Promise<T> {
    // 1) headers 복사 (caller가 헤더에 Content-Type을 지정했을 수 있음)
    const headers: Record<string, string> = { ...opts.headers };

    // 2) body 직렬화:
    //    - 만약 caller가 Content-Type을 "application/x-www-form-urlencoded"로 줬다면,
    //      body는 반드시 URLSearchParams나 직접 직렬화된 문자열이라고 가정
    //    - 그렇지 않으면 body를 JSON으로 직렬화
    let serializedBody: string | undefined;

    if (headers['Content-Type']?.startsWith('application/x-www-form-urlencoded')) {
      // caller가 URLSearchParams를 body로 넘겼다면:
      if (body instanceof URLSearchParams) {
        serializedBody = body.toString();
      } else if (typeof body === 'string') {
        serializedBody = body;
      } else {
        // 잘못된 사용: 객체가 넘어왔는데 Content-Type만 form-urlencoded인 경우
        throw new Error('[FetchAdapter] form-urlencoded 요청 시 body를 URLSearchParams 또는 문자열로 넘겨주세요');
      }
    } else {
      // 기본: JSON 요청
      headers['Content-Type'] = headers['Content-Type'] || 'application/json;charset=UTF-8';
      serializedBody = JSON.stringify(body);
    }

    const res = await fetch(`${this.baseURL}${url}`, {
      method: 'POST',
      headers,
      body: serializedBody,
      credentials: opts.credentials,
      next: opts.next,
    });

    return this.parseResponse<T>(res);
  }

  // PUT 요청 (JSON 전용)
  async put<T>(url: string, body: unknown, opts: RequestOptions = {}): Promise<T> {
    const headers: Record<string, string> = { ...opts.headers };
    headers['Content-Type'] = headers['Content-Type'] || 'application/json;charset=UTF-8';

    const res = await fetch(`${this.baseURL}${url}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
      credentials: opts.credentials,
      next: opts.next,
    });

    return this.parseResponse<T>(res);
  }

  // PATCH 요청 (JSON 전용)
  async patch<T>(url: string, body: unknown, opts: RequestOptions = {}): Promise<T> {
    const headers: Record<string, string> = { ...opts.headers };
    headers['Content-Type'] = headers['Content-Type'] || 'application/json;charset=UTF-8';

    const res = await fetch(`${this.baseURL}${url}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body),
      credentials: opts.credentials,
      next: opts.next,
    });

    return this.parseResponse<T>(res);
  }

  // DELETE 요청 (JSON 전용)
  async delete<T>(url: string, opts: RequestOptions = {}): Promise<T> {
    const res = await fetch(`${this.baseURL}${url}`, {
      method: 'DELETE',
      headers: { ...opts.headers },
      credentials: opts.credentials,
      next: opts.next,
    });

    return this.parseResponse<T>(res);
  }

  // 응답 처리: JSON인지 아닌지 판별 후 파싱, 오류 시 throw
  private async parseResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
      // 4xx/5xx 에러 시 가능한 JSON 메시지를 뽑아보고, 그렇지 않으면 상태 코드만 표시
      let errorMsg = `HTTP error: ${res.status}`;
      try {
        const data = await res.json();
        // { error: '메시지'} 같은 구조를 기대
        errorMsg = data.error || data.message || errorMsg;
      } catch {
        // JSON 파싱 실패 시 무시
      }
      throw new Error(errorMsg);
    }

    // 성공 응답: Content-Type을 보고 파싱
    const contentType = res.headers.get('Content-Type') || '';
    if (contentType.includes('application/json')) {
      return res.json() as Promise<T>;
    } else {
      // JSON이 아니라면 텍스트로 리턴
      return res.text() as unknown as T;
    }
  }
}

export const fetchAdapter = new FetchAdapter();
