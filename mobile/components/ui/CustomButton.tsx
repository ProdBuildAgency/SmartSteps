import React from "react";
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  View,
} from "react-native";
import * as PhosphorIcons from "phosphor-react-native";
import { getHexFromTailwind } from "@/lib/tailwind";

interface CustomButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  type?: "primary" | "secondary";
  disabled?: boolean;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  className?: string;
  icon?: keyof typeof PhosphorIcons;
  iconPlacement?: "left" | "right";
  iconSize?: number;
  iconWeight?: PhosphorIcons.IconWeight;
  iconColor?: string;
}

export default function CustomButton({
  label,
  onPress,
  type = "primary",
  disabled = false,
  bgColor,
  textColor,
  borderColor,
  containerStyle,
  textStyle,
  className = "",
  icon,
  iconPlacement = "left",
  iconSize = 20,
  iconWeight = "regular",
  iconColor,
}: CustomButtonProps) {
  const isPrimary = type === "primary";
  const IconComponent = icon ? (PhosphorIcons[icon] as React.ComponentType<PhosphorIcons.IconProps>) : null;

  const finalIconColor =
    iconColor ?? (textColor ? getHexFromTailwind(`text-${textColor}`) : "#fff7e5");

  const iconContent = IconComponent ? (
    <IconComponent
      size={iconSize}
      weight={iconWeight}
      color={String(finalIconColor)}
    />
  ) : null;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      // activeOpacity={0.7}
      className={`flex-row items-center justify-center rounded-full px-6 py-3 
        ${isPrimary ? `bg-${bgColor}` : `border border-${borderColor}`} 
        ${disabled ? "opacity-50" : ""} 
        ${className}`}
      style={containerStyle}
    >
      {iconPlacement === "left" && iconContent && (
        <View className="mr-1">{iconContent}</View>
      )}
      <Text
        className={`text-button
          ${isPrimary ? "text-background-950" : `text-${textColor}`}`}
        style={textStyle}
      >
        {label}
      </Text>
      {iconPlacement === "right" && iconContent && (
        <View className="ml-1">{iconContent}</View>
      )}
    </TouchableOpacity>
  );
}