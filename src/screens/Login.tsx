import React, { useState } from 'react';
import { Alert, Linking } from 'react-native';
import { useTheme } from '../@core/theme/themeContext';
import { V, T, TInput, Button } from '../@core/tag';
import { PhoneInput } from '../components/dataEntry/PhoneInput';
//firebase
import { signInWithEmailAndPassword, signInWithPhoneNumber } from 'firebase/auth';
// import { auth, db } from "../lib/firebase";

export default function LoginScreen() {
  const { ct } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState({ country: '92', number: '' });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    // if (
    //   (!isLogin && !fullname.trim()) ||
    //   !phone ||
    //   !password ||
    //   (!isLogin && password !== confirmPassword)
    // ) {
    //   return Alert.alert("Error", "Please fill correctly");
    // }
    const fullPhone = `+${phone.country}${phone.number}`;
    try {
      // const confirmation = await signInWithEmailAndPassword(
      //   auth,
      //   fullname,
      //   password
      // );
      // console.log(confirmation);
      // const confirmation = await signInWithPhoneNumber(auth, fullPhone);
      // console.log("OTP Sent:", confirmation);
      // const saveUserToFirestore = async (uid: string) => {
      //   const userRef = doc(db, "users", uid);
      //   const existing = await getDoc(userRef);
      //   if (!existing.exists()) {
      //     await setDoc(userRef, {
      //       uid,
      //       fullName: fullname.trim(),
      //       phone,
      //       createdAt: serverTimestamp(),
      //       updatedAt: serverTimestamp(),
      //     });
      //   }
      // };
    } catch (err: any) {
      console.log('Error', err.message);
      Alert.alert('Error', err.message);
    }
  };
  return (
    <V className="flex-1 items-center justify-center px-4">
      <V className="w-full ">
        <T className="mb-6 text-center text-2xl font-bold">{isLogin ? 'Login' : 'Register'}</T>

        <V className="w-full gap-4 px-4">
          {!isLogin && (
            <TInput value={fullname} placeholder="Enter FullName" onChangeText={setFullname} />
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
