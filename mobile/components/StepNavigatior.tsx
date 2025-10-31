import React from "react";
import { View } from "react-native";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import CustomButton from "./ui/CustomButton";

interface StepNavigatorProps {
  step: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
}

export default function StepNavigator({
  step,
  totalSteps,
  onBack,
  onNext,
}: StepNavigatorProps) {
  return (
    <View className="items-center mt-8">
      {/* Step Dots */}
      <View className="flex-row space-x-2 mb-6">
        {[...Array(totalSteps)].map((_, index) => (
          <View
            key={index}
            className={`h-2.5 w-2.5 rounded-full ${
              index === step ? "bg-[#F7A400]" : "bg-gray-400"
            }`}
          />
        ))}
      </View>

      {/* Navigation Buttons */}
      <View className="flex-row justify-between w-full px-8">
        <CustomButton
          label="← Back"
          onPress={onBack}
          type="secondary"
          disabled={step === 0}
        />
        <CustomButton
          label={step === totalSteps - 1 ? "Finish →" : "Next →"}
          onPress={onNext}
          type="primary"
        />
      </View>
    </View>
  );
}
