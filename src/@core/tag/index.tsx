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
}
export const TInput = ({ theme, className, ...props }: TInputType) => (
  <TextInput
    placeholderTextColor={theme?.['muted-foreground'] ?? '#A1A1AA'}
    className={`border-border text-foreground bg-accent w-full rounded-xl border p-3 ${className}`}
    {...props}
  />
);
