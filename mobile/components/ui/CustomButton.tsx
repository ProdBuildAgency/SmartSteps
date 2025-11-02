import React from "react";
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from "react-native";

interface CustomButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  type?: "primary" | "secondary";
  disabled?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  className?: string;
}

export default function CustomButton({
  label,
  onPress,
  type = "primary",
  disabled = false,
  containerStyle,
  textStyle,
  className = "",
}: CustomButtonProps) {
  const isPrimary = type === "primary";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      className={`flex-row items-center justify-center rounded-full px-6 py-3 
        ${isPrimary ? "bg-secondary-500" : "border border-secondary-500"} 
        ${disabled ? "opacity-50" : ""} 
        ${className}`}
      style={containerStyle}
    >
      <Text
        className={`font-semibold text-base 
          ${isPrimary ? "text-white" : "text-[#F7A400]"}`}
        style={textStyle}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
