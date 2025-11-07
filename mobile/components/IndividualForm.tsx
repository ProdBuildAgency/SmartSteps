import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import StepNavigator from "./StepNavigator";
import CustomInput from "./ui/CustomInput";
import { useIndividualForm } from "../contexts/RegisterUserContext"; 

interface IndividualFormProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function IndividualForm({setIsLoading }: IndividualFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const totalSteps = 2;

  const { formData, updateFormData, submitForm } = useIndividualForm();

const handleNext = async () => {
  if (step < totalSteps - 1) {
    setStep(step + 1);
  } else {
    try {
      setIsLoading(true); // show loading
      await submitForm();
      setIsLoading(false); // hide loading
      router.push("/(auth)/login");
    } catch (error) {
      setIsLoading(false); // hide loading on error
      console.error("Error during registration:", error);
      Alert.alert("Error", "Registration failed. Please try again.");
    }
  }
};


  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <View className="flex-1 justify-between">
      {/* Step Content */}
      <View className="space-y-4 mt-6">
        {step === 0 && (
          <>
            <Text className="text-center text-textSecondary">
              Let's get to know you a little
            </Text>

            <CustomInput
              label="Full Name"
              required
              placeholder="Enter Full Name"
              value={formData.name}
              onChangeText={(text) => updateFormData({ name: text })}
            />

            <CustomInput
              label="Email address"
              required
              placeholder="Enter Email Address"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => updateFormData({ email: text })}
            />

            <CustomInput
              label="Phone Number"
              required
              placeholder="Enter Phone Number"
              keyboardType="phone-pad"
              value={formData.phoneNumber}
              onChangeText={(text) => updateFormData({ phoneNumber: text })}
            />
          </>
        )}

        {step === 1 && (
          <>
            <Text className="text-center text-textSecondary">
              Secure your account
            </Text>

            <CustomInput
              label="Password"
              required
              placeholder="Enter Your Password"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => updateFormData({ password: text })}
            />

            <CustomInput
              label="Confirm Password"
              required
              placeholder="Confirm Your Password"
              secureTextEntry
              value={formData.confirmPassword}
              onChangeText={(text) => updateFormData({ confirmPassword: text })}
            />
          </>
        )}
      </View>

      {/* Step Navigator */}
      <StepNavigator
        step={step}
        totalSteps={totalSteps}
        onBack={handleBack}
        onNext={handleNext}
      />

      {/* Already have an account */}
      <View className="mt-4 mb-6">
        <Text className="text-center text-gray-700">
          Already have an Account?{" "}
          <Text
            className="text-[#F7A400] font-semibold"
            onPress={() => router.push("/(auth)/login")}
          >
            Login
          </Text>
        </Text>
      </View>

    </View>
  );
}
