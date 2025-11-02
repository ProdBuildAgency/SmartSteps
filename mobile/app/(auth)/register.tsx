import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import BusinessForm from "../../components/BuisnessForm"; // adjust the path if needed
import IndividualForm from "@/components/IndividualForm";

export default function RegisterScreen() {
  const [selectedRole, setSelectedRole] = useState("Business");

  return (
    <ScrollView
      className="flex-1 bg-[#ff8c1a]"
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      {/* Top Illustration */}
      <View className="items-center mt-8 ">
        <Image
          source={require("../../assets/images/register-illustration.png")}
          className="w-100 h-100"
          resizeMode="contain"
        />
      </View>

      {/* Content */}
      <View
        className="flex-1 px-6 mt-4"
        style={{
          backgroundColor: "#fff7e5",
          borderTopLeftRadius: 68,
          borderTopRightRadius: 68,
        }}
      >
        <Text className="mt-16 text-center text-4xl font-extrabold text-text-100">
          Welcome To
        </Text>
        <Text className="text-accent-600 text-4xl font-bold text-center">Smart Steps!</Text>

        {/* Role Selector */}
        <View className="flex-row justify-center m-1">
          <TouchableOpacity
            className={`px-4 py-2 mx-2 rounded-lg border ${
              selectedRole === "Business"
                ? "bg-primary-400 border-[#F7A400]"
                : "border-gray-300"
            }`}
            onPress={() => setSelectedRole("Business")}
          >
            <Text
              className={`font-medium ${
                selectedRole === "Business" ? "text-white" : "text-gray-700"
              }`}
            >
              Business
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`px-4 py-2 mx-2 rounded-lg border ${
              selectedRole === "Individual"
                ? "bg-[#0096d6] border-[#F7A400]"
                : "border-gray-300"
            }`}
            onPress={() => setSelectedRole("Individual")}
          >
            <Text
              className={`font-medium ${
                selectedRole === "Individual" ? "text-white" : "text-gray-700"
              }`}
            >
              Individual
            </Text>
          </TouchableOpacity>
        </View>

        {/* Conditional Rendering */}
        {selectedRole === "Business" ? (
          <BusinessForm />
        ) : (
          <IndividualForm/>
        )}
      </View>
    </ScrollView>
  );
}
