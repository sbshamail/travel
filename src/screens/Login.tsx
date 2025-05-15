import { useState } from 'react';
import { Alert } from 'react-native';
import { useTheme } from '../@core/theme/themeContext';
import { V, T, TInput, Button } from '../@core/tag';
import { PhoneInput } from '../components/dataEntry/PhoneInput';
import { registerUser } from '@/actions/auth';

export default function LoginScreen() {
  const { ct } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [values, setValues] = useState({
    fullname: '',
    cnic: '',
    address: '',
    photoUrl: '',
    otp: '',
  });
  const [phone, setPhone] = useState({ country: '92', number: '' });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    if (
      (!isLogin && !values.fullname.trim()) ||
      !phone ||
      !password ||
      (!isLogin && password !== confirmPassword)
    ) {
      return Alert.alert('Error', 'Please fill correctly');
    }
    const fullPhone = `+${phone.country}${phone.number}`;
    try {
      const res = await registerUser({ ...values, phone: fullPhone, password });
      console.log(res);
    } catch (err: any) {
      console.log('Error', err.message);
      Alert.alert('Error', err.message);
    }
  };
  const handleValues = (name: string, value: string) => {
    setValues({ ...values, [name]: value });
  };
  return (
    <V className="flex-1 items-center justify-center px-4">
      <V className="w-full ">
        <T className="mb-6 text-center text-2xl font-bold">{isLogin ? 'Login' : 'Register'}</T>

        <V className="w-full gap-4 px-4">
          {!isLogin && (
            <TInput
              value={values.fullname}
              placeholder="Enter FullName"
              onChangeText={(v) => handleValues('fullname', v)}
            />
          )}
          {!isLogin && (
            <TInput
              value={values.cnic}
              placeholder="Enter CNIC"
              onChangeText={(v) => handleValues('cnic', v)}
            />
          )}
          {!isLogin && (
            <TInput
              value={values.address}
              placeholder="Enter Address"
              onChangeText={(v) => handleValues('address', v)}
            />
          )}
          <PhoneInput value={phone} onChange={setPhone} />
          <TInput
            value={password}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
          />
          {!isLogin && (
            <TInput
              value={confirmPassword}
              placeholder="Confirm Password"
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          )}

          <Button variant="primary" className="w-full" onPress={handleSubmit}>
            {isLogin ? 'Login' : 'Register'}
          </Button>

          <Button variant="ghost" onPress={() => setIsLogin(!isLogin)} className="mt-4">
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </Button>
        </V>
      </V>
    </V>
  );
}
