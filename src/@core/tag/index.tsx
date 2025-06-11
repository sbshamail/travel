import React from 'react';
import { Text, View, ViewProps, TextProps, TextInputProps, TextInput } from 'react-native';
// export { Button } from "./Button";
import { ClassNameType } from '../../utils/interfaces/commonTypes';
import { styleKey } from '../theme/themeContext';
import { cn } from '../../lib/cn';
export { Button } from './Button';

interface PropType extends ViewProps {
  children?: React.ReactNode;
  className?: ClassNameType;
}
export const V = ({ children, className, ...props }: PropType) => (
  <View className={cn(`bg-background`, `${className}`)} {...props}>
    {children}
  </View>
);

export const T = ({ children, className, ...props }: TextProps) => (
  <Text className={` text-foreground ${className}`} {...props}>
    {children}
  </Text>
);
interface TInputType extends TextInputProps {
  theme?: Record<styleKey, string>;
  className?: ClassNameType;
  error?: Record<string, string | any>;
  label?: string;
}
export const TInput = ({ theme, className, error, label, ...props }: TInputType) => (
  <>
    {label && <T className="mb-1 text-sm font-medium text-foreground">{label}</T>}
    <TextInput
      placeholderTextColor={theme?.['muted-foreground'] ?? '#A1A1AA'}
      className={`w-full rounded-xl border border-border bg-accent p-3 text-foreground ${className}`}
      {...props}
    />
    {error && <T className="text-red-500">{error?.message}</T>}
  </>
);
