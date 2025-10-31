import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import StepNavigator from "./StepNavigatior";
import CustomInput from "./ui/CustomInput";
import { useBusinessForm } from "../contexts/BuisnessFormContext";

export default function BusinessForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const totalSteps = 5;
  const { formData, updateFormData, submitForm } = useBusinessForm();

  const handleNext = async () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      // Final step → submit
      await submitForm();
      router.push("/(auth)/login");
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <View className="flex-1 justify-between">
      <View className="space-y-4 mt-6">
        {step === 0 && (
          <>
            <CustomInput
              label="Full Name"
              required
              placeholder="Enter Full Name"
              value={formData.fullName}
              onChangeText={(text) => updateFormData({ fullName: text })}
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
              value={formData.phone}
              onChangeText={(text) => updateFormData({ phone: text })}
            />
          </>
        )}

        {step === 1 && (
          <>
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

        {step === 2 && (
          <CustomInput
            label="Name"
            required
            placeholder="Enter Name of Preschool"
            value={formData.preschoolName}
            onChangeText={(text) => updateFormData({ preschoolName: text })}
          />
        )}

        {step === 3 && (
          <>
            <CustomInput
              label="Address"
              required
              placeholder="Enter Address of Preschool"
              value={formData.address}
              onChangeText={(text) => updateFormData({ address: text })}
            />
            <View className="flex-row space-x-4">
              <View className="flex-1">
                <CustomInput
                  label="City"
                  required
                  placeholder="Enter City"
                  value={formData.city}
                  onChangeText={(text) => updateFormData({ city: text })}
                />
              </View>
              <View className="flex-1">
                <CustomInput
                  label="State"
                  required
                  placeholder="Enter State"
                  value={formData.state}
                  onChangeText={(text) => updateFormData({ state: text })}
                />
              </View>
            </View>
            <CustomInput
              label="Pincode"
              required
              placeholder="Enter Pincode"
              value={formData.pincode}
              onChangeText={(text) => updateFormData({ pincode: text })}
            />
          </>
        )}

        {step === 4 && (
          <>
            <Text className="text-gray-700 font-medium mb-1">
              Number of Preschoolers <Text className="text-red-500">*</Text>
            </Text>
            <View className="flex-row space-x-4">
              {["pg", "nur", "jkg", "skg"].map((field) => (
                <View className="flex-1" key={field}>
                  <CustomInput
                    label={field.toUpperCase()}
                    required
                    placeholder={field.toUpperCase()}
                    value={(formData as any)[field]}
                    onChangeText={(text) => updateFormData({ [field]: text })}
                  />
                </View>
              ))}
            </View>

            <Text className="text-gray-700 font-medium mb-1">
              Fee Range <Text className="text-red-500">*</Text>
            </Text>
            <View className="flex-row space-x-4">
              <View className="flex-1">
                <CustomInput
                  label="Min"
                  required
                  placeholder="Min"
                  value={formData.feeMin}
                  onChangeText={(text) => updateFormData({ feeMin: text })}
                />
              </View>
              <View className="flex-1">
                <CustomInput
                  label="Max"
                  required
                  placeholder="Max"
                  value={formData.feeMax}
                  onChangeText={(text) => updateFormData({ feeMax: text })}
                />
              </View>
            </View>
          </>
        )}
      </View>

      <StepNavigator step={step} totalSteps={totalSteps} onBack={handleBack} onNext={handleNext} />

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
