import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useSession } from "@/contexts/SessionContext";

export default function Home() {
  const { user, logout } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login"); 
  };

  return (
    <View className="flex-1 justify-center items-center gap-3 bg-background-950">
      <Text className="text-h1 text-text-100 font-bold">Home</Text>

      {user ? (
        <>
          <Text className="text-h3">Welcome, {user.name}</Text>
          <Text className="text-body text-textSecondary">Role: {user.role}</Text>

          <TouchableOpacity
            onPress={handleLogout}
            className="bg-error px-6 py-2 rounded-lg mt-5"
          >
            <Text className="text-background-950 font-semibold">Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text className="text-gray-500 mt-3">No active session</Text>
      )}
    </View>
  );
}
