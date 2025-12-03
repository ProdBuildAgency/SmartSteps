// app/(tabs)/profile.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSession } from "@/contexts/SessionContext";
import { useRouter } from "expo-router";

export default function Profile() {
  const { user, logout } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1 justify-center items-center bg-background-950 gap-3">
      <Text className="text-h1 text-text-100 font-bold">Profile</Text>
      
      {user && (
        <>
          <Text className="text-h3 text-text-100">{user.name}</Text>
          <Text className="text-body text-textSecondary">Role: {user.role}</Text>
          
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-error px-6 py-2 rounded-lg mt-5"
          >
            <Text className="text-background-950 font-semibold">Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
