import React from "react";
import { View, Image, ActivityIndicator, Text } from "react-native";

export default function LoadingOverlay() {
  return (
    <View className="absolute inset-0 bg-background-950 flex items-center justify-center z-50">
      <Image
        source={require("../assets/images/main_logo.png")}
        className="w-[317px]  h-[317px]" 
        resizeMode="contain"
      />

      <Text className="mt-16 text-center text-4xl font-extrabold text-text-100">
        Setting up your
      </Text>
      <Text className="text-accent-600 text-4xl font-bold text-center">Smart Steps <Text className="text-text-100">journey...</Text></Text>

    </View>
  );
}
