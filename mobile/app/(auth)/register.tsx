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

              {/* BUSINESS BUTTON */}

              <TouchableOpacity onPress={() => setSelectedRole("Business")} className="`w-[79px] h-[26px] ">
                <View className={`px-[4px] py-[2px] items-center justify-center mx-2 rounded-md
    ${selectedRole === "Business" ? "bg-primary-400" : "border-b-[1px]"}`}>
                  <Text
                    className={`font-poppins font-bold text-[16px] ${selectedRole === "Business" ? "text-white" : "text-textSecondary"
                      }`}
                    style={{
                      textDecorationColor:
                        selectedRole !== "Business" ? "#A1A1A1" : "transparent",

                    }}
                  >
                    Business
                  </Text>
                </View>
              </TouchableOpacity>


              {/* INDIVIDUAL BUTTON */}
              <TouchableOpacity onPress={() => setSelectedRole("Individual")} className="`w-[88px] h-[26px] ">
                <View className={` px-[4px] py-[2px] items-center rounded-md justify-center mx-2
    ${selectedRole === "Individual" ? "bg-primary-400" : "border-b-[1px]"}`}>
                  <Text
                    className={`font-poppins font-bold text-[16px] ${selectedRole === "Individual" ? "text-white" : "text-textSecondary"
                      }`}
                    style={{

                      textDecorationColor:
                        selectedRole !== "Individual" ? "#A1A1A1" : "transparent",

                    }}
                  >
                    Individual
                  </Text>
                </View>
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
