import React from "react";
import { Stack } from "expo-router";
import { useSession } from "@/contexts/SessionContext";
import { View, ActivityIndicator } from "react-native";

export default function RootNavigator() {
  const { user, isLoadingSession } = useSession();

  if (isLoadingSession) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="(tabs)/index" />
      ) : (
        <Stack.Screen name="(auth)/login" />
      )}
    </Stack>
  );
}
