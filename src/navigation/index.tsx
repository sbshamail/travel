import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './RootNavigator';
import { ThemeProvider } from '@/@core/theme/themeContext';

const Navigation = () => {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <RootNavigator />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default Navigation;
