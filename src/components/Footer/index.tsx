import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../@core/theme/themeContext';

import { useAppNavigation } from '../../app/navigation/useAppNavigation';
import { Card } from '../wrapper';
import { useAuth } from '@/contexts/AuthContext';
export const Footer = () => {
  const { ct, theme, toggleTheme } = useTheme();
  const navigation = useAppNavigation();
  const { logout } = useAuth();
  return (
    <Card className="w-full flex-row items-center justify-between px-6 py-4 ">
      {/* Home Button */}
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Icon name="home-outline" size={24} color={ct.foreground} />
      </Pressable>

      {/* Toggle Theme */}
      <Pressable onPress={toggleTheme}>
        <Icon
          name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'}
          size={24}
          color={ct.foreground}
        />
      </Pressable>

      {/* Auth Page Button */}
      <Pressable onPress={() => logout()}>
        <Icon name="person-circle-outline" size={24} color={ct.foreground} />
      </Pressable>
    </Card>
  );
};
