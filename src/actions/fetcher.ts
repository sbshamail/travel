import { API_URL } from 'config';
import { Toastify } from '@/components/toast/Toastify';
import { getToken } from '@/utils/asyncStorage';
type FetcherOptions = {
  api?: string;
  domain?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  token?: string;
  setLoading?: (b: boolean) => void;
  showToast?: boolean;
};

export async function apiFetcher<T = any>({
  api,
  domain = 'http://192.168.18.17:4000/api',
  method = 'POST',
  body,
  headers = {},
  setLoading,
  showToast,
}: FetcherOptions) {
  const token = await getToken();
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
  try {
    const baseUrl = `${domain}/${api}`;
    const res = await fetch(`${baseUrl}`, {
      method,
      headers: finalHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (setLoading) {
      setLoading(false);
    }
    const response = await res.json();
    if (showToast) {
      Toastify('success', response.message);
    }
    if (response.data) {
      return response.data;
    }

    return res.json();
  } catch (error: any) {
    console.log(error);
    if (setLoading) {
      setLoading(false);
    }
    if (showToast) {
      Toastify('error', error.message || 'Something went wrong');
    }
  }
}
