// FetchAdapter.ts
import type { HttpClient, RequestOptions } from '@/shared/lib/https/interface';

export class FetchAdapter implements HttpClient {
  async get<T>(url: string, opts: RequestOptions = {}): Promise<T> {
    const params = opts.queryParams
      ? '?' +
        new URLSearchParams(
          Object.entries(opts.queryParams)
            .filter(([_, v]) => v != null)
            .map(([k, v]) => [k, String(v)])
        ).toString()
      : '';
    const res = await fetch(`${url}${params}`, {
      headers: opts.headers,
      next: opts.next,
    });

    return res.json();
  }

  async post<T>(url: string, body: unknown, opts: RequestOptions = {}): Promise<T> {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...opts.headers },
      body: JSON.stringify(body),
      next: opts.next,
    });
    return res.json();
  }

  // put, patch, delete는 post와 유사하게 구현
  async put<T>(url: string, body: unknown, opts: RequestOptions = {}): Promise<T> {
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...opts.headers },
      body: JSON.stringify(body),
      next: opts.next,
    });
    return res.json();
  }

  async patch<T>(url: string, body: unknown, opts: RequestOptions = {}): Promise<T> {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...opts.headers },
      body: JSON.stringify(body),
      next: opts.next,
    });
    return res.json();
  }

  async delete<T>(url: string, opts: RequestOptions = {}): Promise<T> {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: opts.headers,
      next: opts.next,
    });
    return res.json();
  }
}

export const fetchAdapter = new FetchAdapter();
