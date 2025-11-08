import React from "react";
import { View } from "react-native";
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
  const isFirstStep = step === 0;
  const isLastStep = step === totalSteps - 1;

  return (
    <View className="items-center mt-8">
      {/* Step Dots */}
      <View className="flex-row space-x-5 mb-6">
        {[...Array(totalSteps)].map((_, index) => (
          <View
            key={index}
            className={`h-2.5 w-2.5 mx-1 rounded-full ${index === step ? "bg-secondary-500" : "bg-textSecondary"
              }`}
          />
        ))}
      </View>

      {/* Navigation Buttons */}
      <View className="flex-row justify-between w-full px-8">
        {isFirstStep ? (
          // Only Next button (full width)
          <CustomButton
            label="Next →"
            onPress={onNext}
            type="primary"
            bgColor="secondary-500"
            className="flex-1"
          />
        ) : (
          <>
            <View className="flex-1 mr-2">
              <CustomButton
                label="Back"
                onPress={onBack}
                type="secondary"
                borderColor="secondary-500"
                textColor="secondary-500"
                icon="ArrowLeft"
              />
            </View>
            <View className="flex-1 ml-2">
              <CustomButton
                label={isLastStep ? "Finish" : "Next"}
                onPress={onNext}
                type="primary"
                bgColor="secondary-500"
                icon="ArrowRight"
                iconPlacement="right"
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
}
