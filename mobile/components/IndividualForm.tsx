import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import StepNavigator from "./StepNavigator";
import CustomInput from "./ui/CustomInput";
import { useIndividualForm } from "../contexts/RegisterUserContext";
import { useSession } from "@/contexts/SessionContext";
import AppAlert from "@/components/ui/AppAlert";


interface IndividualFormProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function IndividualForm({ setIsLoading, step, setStep }: IndividualFormProps) {


  const router = useRouter();


  const totalSteps = 2;
  const { login } = useSession();
  const { formData, updateFormData, submitForm } = useIndividualForm();
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

      // ✅ Email format check
      if (!formData.email.includes("@") || !formData.email.includes("."))
        return "Please enter a valid email address.";

      break;

    case 1:
      if (!formData.password || !formData.confirmPassword)
        return "Please enter and confirm your password.";

      // ✅ Password should be at least 8 characters
      if (formData.password.length < 8)
        return "Password must be at least 8 characters long.";

      if (formData.password !== formData.confirmPassword)
        return "Passwords do not match. Please re-enter.";

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
        setIsLoading(true);
        const result = await submitForm();

        if (!result || !result.token || !result.user) {
          setIsLoading(false);
          showAlert("Registration failed. Please try again.");
          return;
        }

        await login(result.token, result.user);
        setIsLoading(false);
        showAlert("Registration successful!");

        setTimeout(() => router.push("/(tabs)/home"), 1500);

      } catch (error) {
        setIsLoading(false);
        showAlert("Something went wrong. Please try again.");
      }
    }
  };



  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <View className="flex-1 ">
      {/* Step Content */}
      <View className="space-y-4 mt-6">
        {step === 0 && (
          <>

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
{step === 0 && (
  <View className="mt-4 mb-6">
    <Text className="text-center text-gray-700">
      Already have an Account?{" "}
      <Text
        className="text-accent-600 font-semibold"
        onPress={() => router.push("/(auth)/login")}
      >
        Login
      </Text>
    </Text>
  </View>
)}

      <AppAlert
        visible={alertVisible}
        message={alertMessage}
        type="toast"
        autoClose={1000}
        primaryText="OK"
        onPrimary={hideAlert}
        onClose={hideAlert}
      />

    </View>
  );
}
