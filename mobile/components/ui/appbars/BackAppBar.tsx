import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CaretLeftIcon } from "phosphor-react-native"; // Back arrow icon
import { useRouter } from "expo-router";

export function BackAppBar({ title }: { title: string }) {
  const router = useRouter();

  return (
    <View className="bg-background-950 border-b border-primary-500 px-2 pt-[53px] pb-[8px] h-[100px] flex-row items-center">
      
      {/* Back button */}
      <TouchableOpacity onPress={() => router.back()} className="w-12 h-12 justify-center items-center">
        <CaretLeftIcon size={28} weight="bold" color="#FFD83D" />
      </TouchableOpacity>

      {/* Title */}
      <View className="flex-1 items-start">
        <Text className="text-primary-50 text-[20px] font-Poppins_600SemiBold font-semibold">
          {title}
        </Text>
      </View>

      {/* Placeholder for spacing */}
      <View className="w-12" />
    </View>
  );
}
