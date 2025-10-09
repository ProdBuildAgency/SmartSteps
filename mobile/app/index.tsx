import React from "react";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-background-950">
      <Text className="text-h1 font-bold font-poppins text-text-100">
        Og Here!
      </Text>
      <Text className="text-h2 font-bold font-poppins text-primary-500">
        Og Here!
      </Text>
      <Text className="text-h3 font-bold font-poppins text-secondary-500">
        Og Here!
      </Text>
      <Text className="text-body font-bold font-poppins text-accent-600">
        Og Here!
      </Text>
      <Text className="text-caption font-bold font-poppins text-textSecondary">
        Og Here!
      </Text>
      <Text className="text-button font-bold font-poppins text-success">
        Og Here!
      </Text>
    </View>
  );
}
