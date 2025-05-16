import { apiFetcher } from './fetcher';

export async function registerUser(
  data: {
    fullName: string;
    phone: string;
    password: string;
    cnic?: string;
    address: string;
    photoUrl?: string;
    otp?: string;
  },
  setLoading?: (b: boolean) => void
) {
  return apiFetcher({
    api: 'auth/register',
    body: data,
    setLoading: setLoading,
  });
}

export async function loginUser(
  data: { phone: string; password: string },
  setLoading?: (b: boolean) => void
) {
  return apiFetcher({
    api: 'auth/login',
    body: data,
    setLoading,
  });
}
