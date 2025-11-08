import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import BusinessForm from "@/components/BusinessForm";
import IndividualForm from "@/components/IndividualForm";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function RegisterScreen() {
  const [selectedRole, setSelectedRole] = useState("Business");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1 bg-secondary-500"
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        {/* Top Illustration */}
        <View className="items-center mt-8 ">
          <View className="w-[280px] h-[280px]">
            <Image
              source={require("../../assets/images/main_logo.png")}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Content */}
        <View className="flex-1 px-6 mt-4 bg-background-950 rounded-t-[68px]">
          <Text className="mt-16 text-center text-h1 font-extrabold text-text-100">
            Welcome To
          </Text>
          <Text className="text-accent-600 text-h1 font-bold text-center">Smart Steps!</Text>

          <Text className="mt-0.5 text-center text-body text-textSecondary">
            Let's get to know you a little
          </Text>
          {/* Role Selector */}
          <View className="flex-row justify-center mt-3">
            <TouchableOpacity
              className={`px-4 py-2 mx-2 rounded-lg ${selectedRole === "Business"
                ? "bg-primary-400"
                : "border-gray-300"
                }`}
              onPress={() => setSelectedRole("Business")}
            >
              <Text
                className={`font-medium ${selectedRole === "Business" ? "text-white" : "text-gray-700"
                  }`}
              >
                Business
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`px-4 py-2 mx-2 rounded-lg ${selectedRole === "Individual"
                ? "bg-primary-500"
                : "border-gray-300"
                }`}
              onPress={() => setSelectedRole("Individual")}
            >
              <Text
                className={`font-medium ${selectedRole === "Individual" ? "text-white" : "text-gray-700"
                  }`}
              >
                Individual
              </Text>
            </TouchableOpacity>
          </View>

          {/* Conditional Rendering */}
          {selectedRole === "Business" ? (
            <BusinessForm setIsLoading={setIsLoading} />
          ) : (
            <IndividualForm setIsLoading={setIsLoading} />
          )}

        </View>
      </ScrollView>
      {isLoading && <LoadingOverlay />}
    </View>
  );
}
