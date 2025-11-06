import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import StepNavigator from "./StepNavigator";
import CustomInput from "./ui/CustomInput";
import AwesomeAlert from "react-native-awesome-alerts";
import { useBusinessForm } from "@/contexts/RegisterUserContext";
// import AppAlert from "@/components/ui/AppAlert";


export default function BusinessForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const totalSteps = 5;
  const { formData, updateFormData, submitForm } = useBusinessForm();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const hideAlert = () => setAlertVisible(false);

  const validateStepFields = () => {
    switch (step) {
      case 0:
        if (!formData.name || !formData.email || !formData.phoneNumber)
          return "Please fill all the required fields.";
        break;
      case 1:
        if (!formData.password || !formData.confirmPassword)
          return "Please enter and confirm your password.";
        if (formData.password !== formData.confirmPassword)
          return "Passwords do not match. Please re-enter.";
        break;
      case 3:
        if (!formData.address || !formData.city || !formData.state || !formData.pincode)
          return "Please fill all address fields.";
        break;
      case 4:
        if (
          formData.preschoolersPg === "" ||
          formData.preschoolersNur === "" ||
          formData.preschoolersJkg === "" ||
          formData.preschoolersSkg === "" ||
          formData.feeRangeMin === "" ||
          formData.feeRangeMax === ""
        ) {
          return "Please fill all preschooler and fee details.";
        }
        break;

      default:
        break;
    }
    return null;
  };

  const handleNext = async () => {
    const error = validateStepFields();
    if (error) {
      showAlert(error);
      return;
    }

    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      try {
        await submitForm();
        showAlert("Registration successful!");
        setTimeout(() => router.push("/(auth)/login"), 1500);
      } catch (err) {
        showAlert("Something went wrong. Please try again.");
      }
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <View className="flex-1 justify-between">
      <View className="space-y-4 mt-6">
        {/* STEP 0 — Basic Details */}
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

        {/* STEP 1 — Password Setup */}
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

        {/* STEP 2 — Preschool Basic Info */}
        {step === 2 && (
          <>
            <Text className="text-center text-text-100 font-extrabold text-2xl">
              Tell us about your <Text className="text-accent-600">preschool</Text>
            </Text>
            <Text className="text-center">
              This helps us to personalize your experience
            </Text>
              <CustomInput
              label="Preschool Name"
              required
              placeholder="Enter Preschool Name"
              value={formData.businessName}
              onChangeText={(text) => updateFormData({ businessName: text })}
            />
          </>
        )}

        {/* STEP 3 — Address Info */}
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

        {/* STEP 4 — Preschool Details */}
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
                /></View>
              <View className="flex-1">
                <CustomInput
                  label="Jr. KG"
                  required
                  placeholder="Jr. KG"
                  keyboardType="number-pad"
                  value={formData.preschoolersJkg}
                  onChangeText={(text) => updateFormData({ preschoolersJkg: text })}
                /></View>
              <View className="flex-1">
                <CustomInput
                  label="Sr. KG"
                  required
                  placeholder="Sr. KG"
                  keyboardType="number-pad"
                  value={formData.preschoolersSkg}
                  onChangeText={(text) => updateFormData({ preschoolersSkg: text })}
                /></View>
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
                /></View>
              <View className="flex-1">
                <CustomInput
                  label="Max"
                  required
                  placeholder="Max"
                  keyboardType="number-pad"
                  value={formData.feeRangeMax}
                  onChangeText={(text) => updateFormData({ feeRangeMax: text })}
                /></View>
            </View>
          </>
        )}
      </View>

      {/* Step Navigation */}
      <StepNavigator
        step={step}
        totalSteps={totalSteps}
        onBack={handleBack}
        onNext={handleNext}
      />

      {/* Footer */}
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

      {/* <AppAlert visible={alertVisible} message={alertMessage} onClose={hideAlert} /> */}

    </View>
  );
}
