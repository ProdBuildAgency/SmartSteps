import { AppBar } from "@/components/ui/appbars/AppBar";
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { serviceCards } from "@/constants";

export default function Explore() {
  return (
    <View className="flex-1 bg-background-950">
      <AppBar title="Smart Services" />

      <View className="flex-1 p-4 mt-[16px]">
        <FlatList
          data={serviceCards}
          numColumns={2}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={{ gap: 16 }}
          contentContainerStyle={{ gap: 16 }}
          renderItem={({ item, index }) => {
            const Icon = item.icon;
            const row = Math.floor(index / 2);
            const col = index % 2;


            const blue = "#0096D6";
            const orange = "#FF8C1A";


            const iconColor =
              row % 2 === 0
                ? col === 0 ? blue : orange
                : col === 0 ? orange : blue;
            return (
              <TouchableOpacity
                onPress={() => router.push(`/service?title=${encodeURIComponent(item.title)}`)}
                className="flex-1 w-[177px] h-[200px] flex-col bg-white rounded-2xl p-6 shadow-md shadow-black/10 items-center"
                style={{
                  borderWidth: 2,
                  borderColor: iconColor,
                  // shadowColor: "#000",
                  shadowOpacity: 0.15,
                  shadowOffset: { width: 0, height: 3 },
                  shadowRadius: 6,
                  elevation: 6,
                }}
              >
                <View
                  className="w-[48px] h-[48px] bg-background-950 rounded-md items-center justify-center"
                  style={{
                    shadowColor: "#000",
                    shadowOpacity: 0.15,
                    shadowOffset: { width: 0, height: 3 },
                    shadowRadius: 6,
                    elevation: 6,
                  }}
                >

                  <Icon size={32} weight="fill" color={iconColor} />
                </View>

                <Text className="text-lg mt-[8px] w-[144px] h-[44px] leading-[22px] font-poppins text-black text-center text-[18px] font-bold">
                  {item.title}
                </Text>
                <Text className="text-center justify-center text-[12px] w-[148px] h-[48px] text-textSecondary font-poppins">
                  {item.description}
                </Text>
                <Text
                  className="text-textSecondary text-[12px] font-bold font-poppins"
                  style={{
                    position: "absolute",
                    left: 82,
                    top: 177,
                  }}
                >
                  Learn more {'>'}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}
