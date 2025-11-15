import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import BusinessForm from "@/components/BusinessForm";
import IndividualForm from "@/components/IndividualForm";
import LoadingOverlay from "@/components/LoadingOverlay";
import RegistrationIllustration from "../../assets/images/Registration_Illustration.svg"

export default function RegisterScreen() {
  const [selectedRole, setSelectedRole] = useState("Business");
  const [isLoading, setIsLoading] = useState(false);

  const [step, setStep] = useState(0);

  const hideRoleSelector = step > 0;
  const stepText = () => {
    const isBusiness = selectedRole === "Business";

    /* ---------- BUSINESS ROLE ---------- */
    if (isBusiness) {
      // Step 0 & 1 → Intro
      if (step === 0 || step === 1)
        return (
          <Text className="mt-[12px] text-center text-body text-textSecondary">
            Let's get to know you a little
          </Text>
        );

      // Step 2 → Preschool Header (2-line)
      if (step === 2)
        return (
          <>
            <Text className="text-center mt-[12px] text-text-100 text-h3">
              Tell us about your <Text className="text-accent-600">preschool</Text>
            </Text>
            <Text className="text-center text-caption">
              This helps us to personalize your experience
            </Text>
          </>
        );

      // Step 3 & 4 → Same Preschool Header
      if (step === 3 || step === 4)
        return (
          <>
            <Text className="text-center mt-[12px]  text-text-100 text-h3">
              Tell us about your <Text className="text-accent-600">preschool</Text>
            </Text>
            <Text className="text-center text-caption">
              This helps us to personalize your experience
            </Text>
          </>
        );
    }

    /* ---------- INDIVIDUAL ROLE ---------- */
    if (step === 0 || step === 1)
      return (
        <Text className="mt-[12px] text-center text-body text-textSecondary">
          Let's get to know you a little
        </Text>
      );

    return null;
  };

  return (
    <View className="flex-1 bg-primary-500">
      {/* Top Illustration */}

      <View className="absolute top-0 left-0 right-0 z-0 items-center mt-8">
        <View className="w-[455px] h-[389px]">
          <RegistrationIllustration width="100%" height="100%" />
        </View>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="relative z-10 h-full px-6 mt-[336px] bg-background-950 rounded-t-[68px] pt-12 pb-8">
          <Text className="text-center text-h1 font-extrabold text-text-100">
            Welcome To
          </Text>
          <Text className="text-accent-600 text-h1 font-bold text-center">
            Smart Steps!
          </Text>

          {stepText()}


          {/* ✅ Role Selector (hidden after step > 0) */}
          {!hideRoleSelector && (
            <View className="flex-row justify-center mt-3">
              <TouchableOpacity
                className={`px-4 py-2 mx-2 rounded-lg ${selectedRole === "Business"
                    ? "bg-primary-400"
                    : "border-b-[1px] border-textSecondary"
                  }`}
                onPress={() => setSelectedRole("Business")}
              >
                <Text
                  className={`font-medium ${selectedRole === "Business"
                      ? "text-white"
                      : "text-textSecondary"
                    }`}
                >
                  Business
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`px-4 py-2 mx-2 rounded-lg ${selectedRole === "Individual"
                    ? "bg-primary-500"
                    : "border-b-[1px] border-textSecondary"
                  }`}
                onPress={() => setSelectedRole("Individual")}
              >
                <Text
                  className={`font-medium ${selectedRole === "Individual"
                      ? "text-white"
                      : "text-textSecondary"
                    }`}
                >
                  Individual
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ✅ Pass step and setStep to forms */}
          {selectedRole === "Business" ? (
            <BusinessForm setIsLoading={setIsLoading} step={step} setStep={setStep} />
          ) : (
            <IndividualForm setIsLoading={setIsLoading} step={step} setStep={setStep} />
          )}
        </View>
      </ScrollView>

      {isLoading && <LoadingOverlay />}
    </View>
  );
}
