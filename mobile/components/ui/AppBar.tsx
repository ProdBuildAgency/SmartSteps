import React from "react";
import { View, Text, Image } from "react-native";

export function AppBar({ title }: { title: string }) {
  return (
    <View className="bg-background-950 border-b border-primary-500 px-4 pt-[53px] pb-[8px] h-[100px] flex-row items-center">

      <Image
        source={require("@/assets/images/main_logo.png")} // Update this path to your logo
        className="w-[48px] h-[48px]"
        resizeMode="contain"
      />
      

      <View className="flex-1 items-center">
        <Text className="text-secondary-500 text-[24px] font-Poppins_600SemiBold font-semibold ">
          {title}
        </Text>
      </View>
      
      
      <View className="w-10" />
    </View>
  );
}