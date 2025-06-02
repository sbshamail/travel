import { StatusBar } from 'expo-status-bar';

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Nav from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { V, T } from '../../@core/tag';
import { useTheme } from '../../@core/theme/themeContext';

import RideForm from '@/components/forms/Ride';

// import LoginScreen from './Login';
export default function Home() {
  const { theme, toggleTheme, ct } = useTheme();
  // console.log(theme);
  const insets = useSafeAreaInsets();

  return (
    <>
      <V className="flex-1">
        <Nav />
        <RideForm />
      </V>
    </>
  );
}
