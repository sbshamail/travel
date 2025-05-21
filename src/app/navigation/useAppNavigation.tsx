import { useNavigation, NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from './RootNavigator'; // or wherever you define it

export const useAppNavigation = () => useNavigation<NavigationProp<RootStackParamList>>();
