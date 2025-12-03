import React from "react";
import { Stack } from "expo-router";
import { useSession } from "@/contexts/SessionContext";
import { View, ActivityIndicator } from "react-native";

export default function RootNavigator() {
  const { user, isLoadingSession } = useSession();

  // While checking SecureStore → show loader
  if (isLoadingSession) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{ headerShown: false }}
      initialRouteName={user ? "(tabs)" : "(auth)"}

    />
  );
}
