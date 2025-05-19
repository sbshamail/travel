import { StatusBar } from 'expo-status-bar';

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Nav from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { V, T } from '../../@core/tag';
import { useTheme } from '../../@core/theme/themeContext';
import { Text } from 'react-native';
import LoginScreen from './auth/Login';
import DriverLocationScreen from './DriverLocationScreen';

// import LoginScreen from './Login';
export default function Home() {
  const { theme, toggleTheme, ct } = useTheme();
  // console.log(theme);
  const insets = useSafeAreaInsets();
  return (
    <>
      <V className="flex-1">
        <Nav />
        <DriverLocationScreen />
        {/* <LoginScreen /> */}
      </V>
    </>
  );
}
{
  /* <V className={`flex-1 items-center justify-center `}>
            <TouchableOpacity onPress={toggleTheme}>
              <T className="bg-primary px-4 py-2 text-primary-foreground rounded">
                Switch to {theme === 'light' ? 'dark' : 'light'} mode
              </T>
            </TouchableOpacity>
            <T className="text-xl ">Welcome to WeTravel!</T>
          </V> */
}
