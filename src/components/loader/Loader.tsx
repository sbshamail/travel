import { ActivityIndicator, View, ViewStyle } from 'react-native';
import { useTheme } from '../../@core/theme/themeContext';
import { V, T } from '../../@core/tag';

interface LoaderProps {
  fullscreen?: boolean;
  loading?: boolean;
  size?: 'small' | 'large';
  message?: string;
  style?: ViewStyle;
}

export const Loader = ({
  fullscreen = true,
  loading = true,
  size = 'large',
  message,
  style,
}: LoaderProps) => {
  const { ct } = useTheme();
  if (!loading) return;
  if (fullscreen) {
    return (
      <V
        className="absolute inset-0 z-50 items-center justify-center bg-background/60"
        style={style}>
        <ActivityIndicator size={size} color={ct.primary} />
        {message && <T className="mt-2 text-base text-muted">{message}</T>}
      </V>
    );
  }

  return (
    <V className="items-center justify-center" style={style}>
      <ActivityIndicator size={size} color={ct.primary} />
      {message && <T className="mt-2 text-base text-muted">{message}</T>}
    </V>
  );
};
