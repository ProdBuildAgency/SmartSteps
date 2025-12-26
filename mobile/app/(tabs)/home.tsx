// app/(tabs)/home.tsx
import React from "react";
import { useSession } from "@/contexts/SessionContext";
import { View, Text, Image } from "react-native";
import { AppBar } from "@/components/ui/appbars/AppBar";

export default function Home() {
  const { user } = useSession();

  return (
    <View className="flex-1 items-center gap-3 bg-background-950">
      <AppBar title="SmartSteps"/>
      
      {user && (
        <Text className="text-h3 text-text-100">Welcome, {user.name}</Text>
      )}
    </View>
  );
}