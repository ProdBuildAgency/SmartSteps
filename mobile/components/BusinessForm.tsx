import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import StepNavigator from "./StepNavigator";
import CustomInput from "./ui/CustomInput";
import { useBusinessForm } from "@/contexts/RegisterUserContext";
import { useSession } from "@/contexts/SessionContext";
import AppAlert from "@/components/ui/AppAlert"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface BusinessFormProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  step: number;                // ✅ coming from RegisterScreen
  setStep: React.Dispatch<React.SetStateAction<number>>;  // ✅ coming from RegisterScreen
}

export default function BusinessForm({ setIsLoading, step, setStep }: BusinessFormProps) {

  const router = useRouter();
  const totalSteps = 5;
  const { formData, updateFormData, submitForm } = useBusinessForm();
  const { login } = useSession();



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

        // 🔍 Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email))
          return "Please enter a valid email address.";

        break;

      case 1:
        if (!formData.password || !formData.confirmPassword)
          return "Please enter and confirm your password.";

        if (formData.password.length < 8)
          return "Password must be at least 8 characters long.";

        if (formData.password !== formData.confirmPassword)
          return "Passwords do not match. Please re-enter.";

        break;

      case 3:
        if (formData.pincode.length > 6)
          return "Pincode not longer than 6.";
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

        // ✅ Convert values to numbers
        const min = Number(formData.feeRangeMin);
        const max = Number(formData.feeRangeMax);

        // ❗ Check if min < max
        if (isNaN(min) || isNaN(max)) {
          return "Fee values must be valid numbers.";
        }

        if (min >= max) {
          return "Minimum fee must be less than maximum fee.";
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
        setIsLoading(true);

        const result = await submitForm();

        // ✅ Validate response
        if (!result || !result.token || !result.user) {
          setIsLoading(false);
          showAlert("Registration failed. Please try again.");
          return;
        }

        // ✅ Store session (only once)
        await login(result.token, result.user);

        setIsLoading(false);
        showAlert("Registration successful!");

        setTimeout(() => router.push("/(tabs)/home"), 1500);
      } catch (err) {
        setIsLoading(false);
        showAlert("Something went wrong. Please try again.");
      }
    }
  };



  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 0, justifyContent: "flex-start" }}
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={20}
    >
      <View className="flex-1">
        <View className="space-y-4 mt-6 ">
          {/* STEP 0 — Basic Details */}
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

              <CustomInput
                label="Name"
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

              <Text className="text-textSecondary font-medium mb-1">
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
                    placeholder="NUR"
                    keyboardType="number-pad"
                    value={formData.preschoolersNur}
                    onChangeText={(text) => updateFormData({ preschoolersNur: text })}
                  /></View>
                <View className="flex-1">
                  <CustomInput
                    label="Jr. KG"
                    required
                    placeholder="JKG"
                    keyboardType="number-pad"
                    value={formData.preschoolersJkg}
                    onChangeText={(text) => updateFormData({ preschoolersJkg: text })}
                  /></View>
                <View className="flex-1">
                  <CustomInput
                    label="Sr. KG"
                    required
                    placeholder="SKG"
                    keyboardType="number-pad"
                    value={formData.preschoolersSkg}
                    onChangeText={(text) => updateFormData({ preschoolersSkg: text })}
                  /></View>
              </View>

              <Text className="text-textSecondary font-medium mt-[12px]">
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
        {/* footer */}
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
          type="toast"
          autoClose={1000}
          message={alertMessage}
          onPrimary={hideAlert}
          onError={true}
          onClose={hideAlert}
        />



      </View>
    </KeyboardAwareScrollView>
  );
}
