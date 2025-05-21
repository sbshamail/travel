import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { V } from '../../@core/tag';
import { useTheme } from '../../@core/theme/themeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Footer } from '@/components/Footer';
//screens
import Home from '../screens/Home';
import LoginScreen from '../screens/auth/Login';
import RegisterScreen from '../screens/auth/Register';
import SelectRouteScreen from '@/app/screens/SelectRouteScreen';
import { useAuth } from '@/contexts/AuthContext';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  SelectRoute: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { isAuth, isLoading } = useAuth();
  const { theme, ct } = useTheme();
  if (isLoading) return null; // or loading screen
  return (
    <V className={`flex-1 ${theme}`}>
      <SafeAreaView className="flex-1 bg-background ">
        <StatusBar backgroundColor={ct.background} style={'auto'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAuth ? (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="SelectRoute" component={SelectRouteScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          )}
        </Stack.Navigator>
        <Footer />
      </SafeAreaView>
    </V>
  );
};

export default RootNavigator;
