import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Eye, EyeClosedIcon, EyeIcon, EyeSlash } from "phosphor-react-native"; // 👁️ import from phosphor

interface CustomInputProps extends React.ComponentProps<typeof TextInput> {
  label: string;
  required?: boolean;
}

export default function CustomInput({
  label,
  required,
  secureTextEntry,
  ...props
}: CustomInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const isPasswordField = secureTextEntry !== undefined;

  return (
    <View className="my-2">
      <Text className="text-gray-700 font-medium mb-1">
        {label} {required && <Text className="text-primary-500">*</Text>}
      </Text>

      <View className="relative">
        <TextInput
          {...props}
          secureTextEntry={isPasswordField ? !isPasswordVisible : false}
          className={`rounded-xl px-4 py-3 bg-white text-gray-900 border-2 border-black pr-10`}
          placeholderTextColor="#9CA3AF"
        />

        {/* 👁️ Eye icon toggle */}
        {isPasswordField && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            className="absolute right-3 top-3"
          >
            {isPasswordVisible ? (
              <EyeClosedIcon size={22} color="#6B7280" weight="regular" />
            ) : (
              <EyeIcon size={22} color="#6B7280" weight="regular" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
