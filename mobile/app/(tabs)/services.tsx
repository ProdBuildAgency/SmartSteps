import { AppBar } from "@/components/ui/appbars/AppBar";
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { serviceCards } from "@/constants";
import { CaretLeftIcon, CaretRightIcon } from "phosphor-react-native";

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
                className="flex-1  flex-col bg-white rounded-2xl shadow-md shadow-black/10 items-center"
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
                <View className="flex items-center justify-items-center gap-2">
                <View className="flex items-center justify-items-center pt-4 px-4 gap-2">

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
                  <View className="flex items-center justify-items-center gap-1">
                    <Text className="text-black text-center font-poppins font-semibold text-base">
                      {item.title}
                    </Text>
                    <Text className="text-textSecondary text-center">
                      {item.description}
                    </Text>
                  </View>

                </View>
                <View className="flex flex-row pb-4 items-center justify-end gap-1 w-full pr-4">

                  <Text
                    className="text-textSecondary text-[12px] font-bold font-poppins"
                  >
                    Learn More
                  </Text>
                  <CaretRightIcon size={11} color={iconColor}/>
                </View>

                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}
