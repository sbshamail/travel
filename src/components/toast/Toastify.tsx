import Toast from 'react-native-toast-message';

export const Toastify = (type: 'success' | 'error', text2: string, text1?: string) => {
  return Toast.show({
    type,
    text1: text1 ? text1 : type === 'success' ? 'Success' : 'Error',
    text2: text2,
  });
};
