import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import LoginScreen from '../screens/Login';
import { V } from '../@core/tag';
import { useTheme } from '../@core/theme/themeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Footer } from '@/components/Footer';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { theme, ct } = useTheme();
  return (
    <V className={`flex-1 ${theme}`}>
      <SafeAreaView className="bg-background flex-1 ">
        <StatusBar backgroundColor={ct.background} style={'auto'} />
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
        <Footer />
      </SafeAreaView>
    </V>
  );
};

export default RootNavigator;
