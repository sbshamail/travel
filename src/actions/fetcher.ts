import { API_URL } from 'config';
type FetcherOptions = {
  api?: string;
  domain?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  token?: string;
  setLoading?: (b: boolean) => void;
};

export async function apiFetcher<T = any>({
  api,
  domain = 'http://192.168.18.17:4000/api',
  method = 'POST',
  body,
  headers = {},
  token,
  setLoading,
}: FetcherOptions): Promise<T> {
  console.log(API_URL);
  const finalHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };
  if (setLoading) {
    setLoading(true);
  }
  if (token) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }
  const baseUrl = `${domain}/${api}`;
  const res = await fetch(`${baseUrl}`, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (setLoading) {
    setLoading(false);
  }
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || 'API error');
  }

  return res.json();
}
