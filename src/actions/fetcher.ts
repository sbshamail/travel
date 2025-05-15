type FetcherOptions = {
  api?: string;
  domain?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  token?: string;
};

export async function apiFetcher<T = any>({
  api,
  domain = 'http://192.168.18.17:4000/api',
  method = 'POST',
  body,
  headers = {},
  token,
}: FetcherOptions): Promise<T> {
  const finalHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };
  console.log(domain);
  if (token) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }
  const baseUrl = `${domain}/${api}`;
  const res = await fetch(`${baseUrl}`, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || 'API error');
  }

  return res.json();
}
