import AsyncStorage from '@react-native-async-storage/async-storage';

export const TOKEN_KEY = 'auth_token';

export const storeValue = async (key: string, value: string | any) => {
  if (typeof value !== 'string') {
    value = JSON.stringify(value);
  }
  await AsyncStorage.setItem(key, value);
};

export const getSorageValue = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  try {
    // Try to parse if it's a JSON string
    return value ? JSON.parse(value) : null;
  } catch {
    // If parsing fails, return raw string
    return value;
  }
};

export const removeSorageValue = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

export const isAuth = async () => {
  const token = await getSorageValue(TOKEN_KEY);
  const user = await getSorageValue('user');
  if (token && user.id) {
    return { token, user };
  }
  return null;
};
