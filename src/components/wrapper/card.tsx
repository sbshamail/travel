import React from "react";
import { View, ViewProps } from "react-native";

import { useTheme } from "../../@core/theme/themeContext";
import { cn } from "../../lib/cn";

interface CardProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "outline" | "shadow" | "ghost";
}
const variantClasses: Record<string, string> = {
  default: "border border-border shadow",
  outline: "border border-border shadow",
  shadow: "shadow shadow-border",
  ghost: "border-none",
};
export const Card = ({
  className,
  children,
  variant = "default",
  ...props
}: CardProps) => {
  const { ct } = useTheme();

  return (
    <View
      className={cn(
        "bg-card  rounded-2xl p-4",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
};
