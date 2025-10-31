import React from "react";
import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";

interface CustomButtonProps {
  label: string;
  onPress: () => void;
  type?: "primary" | "secondary";
  disabled?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export default function CustomButton({
  label,
  onPress,
  type = "primary",
  disabled = false,
  containerStyle,
  textStyle,
}: CustomButtonProps) {
  const isPrimary = type === "primary";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`flex-row items-center justify-center rounded-full px-6 py-3 ${
        isPrimary ? "bg-[#F7A400]" : "border border-[#F7A400]"
      } ${disabled ? "opacity-50" : ""}`}
      style={containerStyle}
    >
      <Text
        className={`font-semibold ${
          isPrimary ? "text-white" : "text-[#F7A400]"
        }`}
        style={textStyle}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
