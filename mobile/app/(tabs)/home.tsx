import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useSession } from "@/contexts/SessionContext";

export default function Home() {
  const { user, logout } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login"); // ✅ redirect to login
  };

  return (
    <View className="flex-1 justify-center items-center gap-3">
      <Text className="text-2xl font-bold">Home</Text>

      {user ? (
        <>
          <Text className="text-lg">Welcome, {user.name}</Text>
          <Text className="text-base text-gray-600">Role: {user.role}</Text>

          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-600 px-6 py-2 rounded-lg mt-5"
          >
            <Text className="text-white font-semibold">Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text className="text-gray-500 mt-3">No active session</Text>
      )}
    </View>
  );
}
