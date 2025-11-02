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
    // Password validation on step 1
    if (step === 1) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match. Please re-enter your password.");
        return;
      }
    }

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
            <Text className="text-center text-textSecondary">
              Let's get to know you a little
            </Text>
            <CustomInput
              label="Business Name"
              required
              placeholder="Enter Business Name"
              value={formData.name}
              onChangeText={(text) => updateFormData({ name: text })}
            />
            <CustomInput
              label="Email Address"
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

        {/* STEP 1 — Password */}
        {step === 1 && (
          <>
            <Text className="text-center text-textSecondary">
              Let's get to know you a little
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
        {step === 2 && (
          <>
            <Text className="text-center text-text-100 font-extrabold text-2xl">
              Tell us about your <Text className="text-accent-600">preschool</Text>
            </Text>
            <Text className="text-center">
              This helps us to personalize your experience
            </Text>
            <CustomInput
              label="Name of Preschool"
              required
              placeholder="Enter Name of Preschool"

              // value={formData.preschoolName}
              onChangeText={(text) => updateFormData({ password: text })}
            />
          </>
        )}

        {step === 3 && (
          <>
            <Text className="text-center text-text-100 font-extrabold text-2xl">
              Tell us about your <Text className="text-accent-600">preschool</Text>
            </Text>
            <Text className="text-center">
              This helps us to personalize your experience
            </Text>
            <CustomInput
              label="Address"
              required
              placeholder="Enter Preschool Address"
              value={formData.address}
              onChangeText={(text) => updateFormData({ address: text })}
            />
            <View className="flex-row gap-x-4">
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
              keyboardType="number-pad"
              value={formData.pincode}
              onChangeText={(text) => updateFormData({ pincode: text })}
            />
          </>
        )}

        {step === 4 && (
          <>
            <Text className="text-center text-text-100 font-extrabold text-2xl">
              Tell us about your <Text className="text-accent-600">preschool</Text>
            </Text>
            <Text className="text-center">
              This helps us to personalize your experience
            </Text>
            <Text className="text-gray-700 font-medium mb-1">
              Number of Preschoolers <Text className="text-primary-500">*</Text>
            </Text>
            <View className="flex-row gap-x-4">
              <View className="flex-1">
                <CustomInput
                  label="PG"
                  required
                  placeholder="PG"
                  keyboardType="number-pad"
                  value={formData.preschoolersPg}
                  onChangeText={(text) => updateFormData({ preschoolersPg: text })}
                />
              </View>

              <View className="flex-1">
                <CustomInput
                  label="Nursery"
                  required
                  placeholder="Nursery"
                  keyboardType="number-pad"
                  value={formData.preschoolersNur}
                  onChangeText={(text) => updateFormData({ preschoolersNur: text })}
                />
              </View>

              <View className="flex-1">
                <CustomInput
                  label="Jr. KG"
                  required
                  placeholder="Jr. KG"
                  keyboardType="number-pad"
                  value={formData.preschoolersJkg}
                  onChangeText={(text) => updateFormData({ preschoolersJkg: text })}
                />
              </View>

              <View className="flex-1">
                <CustomInput
                  label="Sr. KG"
                  required
                  placeholder="Sr. KG"
                  keyboardType="number-pad"
                  value={formData.preschoolersSkg}
                  onChangeText={(text) => updateFormData({ preschoolersSkg: text })}
                />
              </View>

            </View>
            <Text className="text-gray-700 font-medium mb-1">
              Fee Range <Text className="text-primary-500">*</Text>
            </Text>
            <View className="flex-row gap-x-4">
              <View className="flex-1">
                <CustomInput
                  label="Min"
                  required
                  placeholder="Min"
                  keyboardType="number-pad"
                  value={formData.feeRangeMin}
                  onChangeText={(text) => updateFormData({ feeRangeMin: text })}
                />
              </View>

              <View className="flex-1">
                <CustomInput
                  label="Max"
                  required
                  placeholder="Max"
                  keyboardType="number-pad"
                  value={formData.feeRangeMax}
                  onChangeText={(text) => updateFormData({ feeRangeMax: text })}
                />
              </View>
            </View>


          </>
        )}



      </View>

      {/* Navigation Buttons */}
      <StepNavigator step={step} totalSteps={totalSteps} onBack={handleBack} onNext={handleNext} />

      {/* Footer Login Redirect */}
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
