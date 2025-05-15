import { apiFetcher } from './fetcher';

export async function registerUser(data: {
  fullname: string;
  phone: string;
  password: string;
  cnic?: string;
  address: string;
  photoUrl?: string;
  otp?: string;
}) {
  return apiFetcher({
    api: 'auth/register',
    body: data,
  });
}

export async function loginUser(data: { phone: string; password: string }) {
  return apiFetcher({
    api: 'auth/login',
    body: data,
  });
}
