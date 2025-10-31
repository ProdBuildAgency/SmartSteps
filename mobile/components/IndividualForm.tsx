import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import StepNavigator from "./StepNavigatior";
import CustomInput from "./ui/CustomInput";

export default function IndividualForm() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const totalSteps = 2;

    const handleNext = () => {
        if (step < totalSteps - 1) {
            setStep(step + 1);
        } else {
            router.push("/(auth)/login");
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
                        <CustomInput label="Full Name" required placeholder="Enter Full Name" />
                        <CustomInput
                            label="Email address"
                            required
                            placeholder="Enter Email Address"
                            keyboardType="email-address"
                        />
                        <CustomInput
                            label="Phone Number"
                            required
                            placeholder="Enter Phone Number"
                            keyboardType="phone-pad"
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
                        />
                        <CustomInput
                            label="Confirm Password"
                            required
                            placeholder="Confirm Your Password"
                            secureTextEntry
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
