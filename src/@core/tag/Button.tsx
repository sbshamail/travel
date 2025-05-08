import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { cn } from '../../lib/cn';
import { T } from './index';
interface ButtonProps extends TouchableOpacityProps {
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'destructive'
    | 'outline'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  textClassName?: string;
  children: React.ReactNode;
}

export const Button = ({
  variant = 'default',
  size = 'default',
  className,
  textClassName,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const variantClasses: Record<string, string> = {
    default: 'bg-primary text-primary-foreground',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
    outline: 'border border-border bg-transparent text-foreground',
    ghost: 'bg-transparent text-foreground',
    link: 'bg-transparent underline text-primary',
  };

  const sizeClasses: Record<string, string> = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3 rounded-md',
    lg: 'h-11 px-8 rounded-md',
    icon: 'h-10 w-10',
  };

  return (
    <TouchableOpacity
      className={cn(
        'items-center justify-center rounded-xl',
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50',
        className
      )}
      disabled={disabled}
      activeOpacity={0.8}
      {...props}>
      {typeof children === 'string' ? (
        <T className={cn('font-medium', textClassName)}>{children}</T>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};
