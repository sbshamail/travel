import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Nav from '../../components/Nav';
import { V, T } from '../../@core/tag';
import { useTheme } from '../../@core/theme/themeContext';

import RideForm from '@/components/forms/Ride/Ride';
import RideList from './RideList';

// import LoginScreen from './Login';
export default function Home() {
  const { theme, toggleTheme, ct } = useTheme();
  // console.log(theme);
  const insets = useSafeAreaInsets();

  return (
    <>
      <V className="flex-1">
        <Nav />
        {/* <RideForm /> */}
        <RideList />
      </V>
    </>
  );
}
