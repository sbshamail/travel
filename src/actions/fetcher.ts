import React from 'react';
import { API_URL } from 'config';
import { Toastify } from '@/components/toast/Toastify';
import { getToken } from '@/utils/asyncStorage';
type QueryParams = Record<string, string | number | boolean | undefined>;
type FetcherOptions = {
  api?: string;
  domain?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  query?: QueryParams;
  headers?: Record<string, string>;
  token?: string;
  setLoading?: (b: boolean) => void;
  showToast?: boolean;
  setValue?: React.Dispatch<React.SetStateAction<any>>;
  errorToast?: boolean;
};
function buildQueryParams(query?: QueryParams): string {
  if (!query) return '';
  const searchParams = new URLSearchParams();
  for (const key in query) {
    const value = query[key];
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  }
  return searchParams.toString();
}
export async function apiFetcher<T = any>({
  api,
  domain = 'http://192.168.18.17:4000/api', //192.168.100.64
  method = 'POST',
  body,
  query,
  headers = {},
  setLoading,
  showToast,
  setValue,
  errorToast = true,
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
    let baseUrl = `${domain}/${api}`;
    const queryString = buildQueryParams(query);
    if (queryString) {
      baseUrl += `?${queryString}`;
    }
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
      Toastify(response.status.toLowerCase() ?? 'success', response.message);
    }
    if (setValue) {
      setValue(response.data);
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
    if (showToast || errorToast) {
      Toastify('error', error.message || 'Something went wrong');
    }
  }
}
