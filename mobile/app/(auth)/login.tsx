import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Example: login validation (you can replace with Firebase or your API)
    if (email === "user@example.com" && password === "1234") {
      router.replace("/(tabs)/home");
    } else {
      Alert.alert("Invalid credentials");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-amber-50 px-6">
      <Text className="text-3xl font-bold text-amber-800 mb-8">
        Smart Steps
      </Text>

      <View className="w-full max-w-sm">
        <TextInput
          className="border border-amber-300 rounded-xl px-4 py-3 mb-4 bg-white text-base"
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          className="border border-amber-300 rounded-xl px-4 py-3 mb-6 bg-white text-base"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          className="bg-amber-600 rounded-xl py-3 active:bg-amber-700"
          onPress={handleLogin}
        >
          <Text className="text-center text-white font-semibold text-lg">
            Log In
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-4"
          onPress={() => router.push("/(auth)/register")}
        >
          <Text className="text-center text-amber-700">
            Don’t have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
