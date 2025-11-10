import React, { useEffect } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { X } from "phosphor-react-native";
import CustomButton from "./CustomButton";

interface AppAlertProps {
  visible: boolean;

  type?: "toast" | "popup" | "dialog" | "confirm";

  title?: string;
  message: string;

  autoClose?: number;

  primaryText?: string;
  secondaryText?: string;

  onPrimary?: () => void;
  onSecondary?: () => void;
  onClose?: () => void;

  showCloseIcon?: boolean;
}

export default function AppAlert({
  visible,
  type = "dialog",
  title,
  message,

  autoClose,

  primaryText = "OK",
  secondaryText = "Cancel",

  onPrimary,
  onSecondary,
  onClose,

  showCloseIcon = true,
}: AppAlertProps) {

  useEffect(() => {
    if (visible && autoClose) {
      const timer = setTimeout(() => {
        onClose?.();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/40">

        {/* TOAST */}
        {type === "toast" && (
          <View className="absolute bottom-20 px-4 py-2 rounded-lg bg-text-100">
            <Text className="text-text-950 font-poppins">{message}</Text>
          </View>
        )}

        {/* POPUP / DIALOG / CONFIRM */}
        {type !== "toast" && (
          <View className="w-4/5 rounded-xl bg-surface p-5 shadow-lg">

            {/* Close icon */}
            {showCloseIcon && onClose && (
              <TouchableOpacity
                className="absolute right-3 top-3"
                onPress={onClose}
              >
                <X size={20} color="#1e2a38" />
              </TouchableOpacity>
            )}

            {/* Title */}
            {title && (
              <Text className="text-h3 text-text-100 font-poppins text-center mb-2">
                {title}
              </Text>
            )}

            {/* Message */}
            <Text className="text-body text-text-200 font-poppins text-center mb-4">
              {message}
            </Text>

            {/* Buttons */}
            {type === "dialog" && (
              <CustomButton
                label={primaryText}
                onPress={() => onPrimary?.()}
                type="primary"
                className="w-full"
              />
            )}

            {type === "confirm" && (
              <View className="flex-row space-x-3 w-full">
                <CustomButton
                  label={secondaryText}
                  onPress={() => onSecondary?.()}
                  bgColor="accent-600"
                  type="secondary"
                  className="flex-1"
                />
                <CustomButton
                  label={primaryText}
                  onPress={() => onPrimary?.()}
                  bgColor="secondary-500"
                  type="primary"
                  className="flex-1"
                />
              </View>
            )}

          </View>
        )}
      </View>
    </Modal>
  );
}