import { useState } from 'react';
import { Alert } from 'react-native';
import { V, T, TInput, Button } from '../../../@core/tag';
import { PhoneInput } from '../../../components/dataEntry/PhoneInput';
import { loginUser } from '@/actions/auth';

import { useAppNavigation } from '@/navigation/useAppNavigation';

export default function LoginScreen() {
  const navigation = useAppNavigation();

  const [phone, setPhone] = useState({ country: '92', number: '' });
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setPhone({ country: '92', number: '' });
    setPassword('');
  };
  const handleSubmit = async (otp?: string | null) => {
    if (!phone || !password) {
      return Alert.alert('Error', 'Please fill correctly');
    }
    const fullPhone = `${phone.country}${phone.number}`;
    try {
      let data = { phone: fullPhone, password };

      const res = await loginUser(data, setLoading);

      if (res.success) {
        navigation.navigate('Home');
        handleClose();
      }
    } catch (err: any) {
      console.log('Error', err.message);
      Alert.alert('Error', err.message);
    }
  };

  return (
    <>
      <V className="flex-1 items-center justify-center px-4">
        <V className="w-full ">
          <T className="mb-6 text-center text-2xl font-bold">Login</T>

          <V className="w-full gap-4 px-4">
            <PhoneInput value={phone} onChange={setPhone} />
            <TInput
              value={password}
              placeholder="Password"
              secureTextEntry
              onChangeText={setPassword}
            />

            <Button variant="primary" className="w-full" onPress={() => handleSubmit()}>
              Login
            </Button>

            <Button variant="ghost" className="mt-4">
              <T onPress={() => navigation.navigate('Register')}>
                Don&#39;t have an account? Register
              </T>
            </Button>
          </V>
        </V>
      </V>
    </>
  );
}
