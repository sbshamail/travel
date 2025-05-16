import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../app/screens/Home';
import { V } from '../@core/tag';
import { useTheme } from '../@core/theme/themeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Footer } from '@/components/Footer';
import LoginScreen from '../app/screens/auth/Login';
import RegisterScreen from '../app/screens/auth/Register';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { theme, ct } = useTheme();
  return (
    <V className={`flex-1 ${theme}`}>
      <SafeAreaView className="flex-1 bg-background ">
        <StatusBar backgroundColor={ct.background} style={'auto'} />
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
        <Footer />
      </SafeAreaView>
    </V>
  );
};

export default RootNavigator;
