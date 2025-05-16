import { useState } from 'react';
import { Alert } from 'react-native';
import { useTheme } from '../../../@core/theme/themeContext';
import { V, T, TInput, Button } from '../../../@core/tag';
import { PhoneInput } from '../../../components/dataEntry/PhoneInput';
import { registerUser } from '@/actions/auth';
import { OtpModal } from '../../screenComponents/Modals/OtpModal';
import { useAppNavigation } from '@/navigation/useAppNavigation';

export default function RegisterScreen() {
  const { ct } = useTheme();
  const navigation = useAppNavigation();

  const initialValues = {
    fullName: '',
    cnic: '',
    address: '',
    photoUrl: '',
    otp: '',
  };
  const [values, setValues] = useState(initialValues);
  const [phone, setPhone] = useState({ country: '92', number: '' });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShowOtpModal(false);
    setPhone({ country: '92', number: '' });
    setPassword('');
    setConfirmPassword('');
    setValues(initialValues);
  };
  const handleSubmit = async (otp?: string | null) => {
    if (!values.fullName.trim() || !phone || !password || password !== confirmPassword) {
      return Alert.alert('Error', 'Please fill correctly');
    }
    const fullPhone = `${phone.country}${phone.number}`;
    try {
      let data = { ...values, phone: fullPhone, password };
      if (otp) {
        data.otp = otp;
      }
      const res = await registerUser(data, setLoading);

      if (res.success) {
        if (otp) {
          handleClose();
          setShowOtpModal(false);
        } else {
          setShowOtpModal(true);
        }
      }
    } catch (err: any) {
      console.log('Error', err.message);
      Alert.alert('Error', err.message);
    }
  };

  const handleValues = (name: string, value: string) => {
    setValues({ ...values, [name]: value });
  };
  return (
    <>
      <V className="flex-1 items-center justify-center px-4">
        <V className="w-full ">
          <T className="mb-6 text-center text-2xl font-bold">Register</T>

          <V className="w-full gap-4 px-4">
            <TInput
              value={values.fullName}
              placeholder="Enter FullName"
              onChangeText={(v) => handleValues('fullName', v)}
            />

            <TInput
              value={values.cnic}
              placeholder="Enter CNIC"
              onChangeText={(v) => handleValues('cnic', v)}
            />

            <TInput
              value={values.address}
              placeholder="Enter Address"
              onChangeText={(v) => handleValues('address', v)}
            />

            <PhoneInput value={phone} onChange={setPhone} />
            <TInput
              value={password}
              placeholder="Password"
              secureTextEntry
              onChangeText={setPassword}
            />

            <TInput
              value={confirmPassword}
              placeholder="Confirm Password"
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <Button variant="primary" className="w-full" onPress={() => handleSubmit()}>
              Register
            </Button>

            <Button variant="ghost" className="mt-4" onPress={() => navigation.navigate('Login')}>
              <T>Already have an account? Login</T>
            </Button>
          </V>
        </V>
      </V>
      <OtpModal
        visible={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onConfirm={(otp) => handleSubmit(otp)}
        loading={loading}
      />
    </>
  );
}
