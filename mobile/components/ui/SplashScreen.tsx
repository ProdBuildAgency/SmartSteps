import { View, Image, Text } from "react-native";
import React from "react";

export default function SplashScreen() {
    return (
        <View className="flex-1 justify-center items-center bg-background-950">
            <View className="w-[320px] h-[320px]">
                <Image
                    source={require("../../assets/images/main_logo.png")}
                    className="w-full h-full"
                    resizeMode="contain"
                />
            </View>
            <Text className="mt-8 font-bold text-4xl font-poppins text-text-100 text-center">
                Welcome To
            </Text>
            <Text className="font-bold text-4xl font-poppins text-accent-600 text-center">
                Smart Steps!
            </Text>
        </View>
    );
}