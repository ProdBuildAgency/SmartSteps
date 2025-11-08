import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { EyeClosedIcon, EyeIcon } from "phosphor-react-native";

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
      <Text className="text-textSecondary mb-1 text-body ">
        {label} {required && <Text className="text-primary-500">*</Text>}
      </Text>

      <View className="relative">
        <TextInput
          {...props}
          secureTextEntry={isPasswordField ? !isPasswordVisible : false}
          className={`rounded-xl px-4 py-3 bg-white text-gray-900 border-2 border-black pr-10 placeholder:text-body`}
          placeholderTextColor="#9CA3AF"
        />

        {isPasswordField && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            className="absolute right-3 top-3"
          >
            {isPasswordVisible ? (
              <EyeClosedIcon size={24} color="#0096d6" weight="regular" />
            ) : (
              <EyeIcon size={24} color="#0096d6" weight="regular" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
