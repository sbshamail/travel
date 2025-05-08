import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
// import LoginScreen from "../screens/Login";
// import { V } from '../@core/tag';
// import { useTheme } from '../@core/theme/themeContext';
// import LoginScreen from '@/screens/Login';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  // const { theme } = useTheme();
  return (
    // <V className={`flex-1 ${theme}`}>
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
    </Stack.Navigator>
    // </V>
  );
};

export default RootNavigator;
