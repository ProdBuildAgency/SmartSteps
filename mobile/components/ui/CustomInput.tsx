import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";

interface CustomInputProps extends TextInputProps {
  label: string;
  required?: boolean;
}

export default function CustomInput({ label, required, ...props }: CustomInputProps) {
  return (
    <View className="my-2">
      <Text className="text-gray-700 font-medium mb-1">
        {label} {required && <Text className="text-primary-500">*</Text>}
      </Text>
      <TextInput
        {...props}
        className={`rounded-xl px-4 py-3 bg-white text-gray-900 ${
          "border-2 border-black" 
        } ${props.className || ""}`}
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );
}
