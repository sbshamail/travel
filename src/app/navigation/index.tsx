import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './RootNavigator';
import { ThemeProvider } from '@/@core/theme/themeContext';
import { AuthProvider } from '@/contexts/AuthContext';

const Navigation = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <ThemeProvider>
          <RootNavigator />
        </ThemeProvider>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default Navigation;
