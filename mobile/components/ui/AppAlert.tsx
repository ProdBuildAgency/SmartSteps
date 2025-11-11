import React, { useEffect } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { X } from "phosphor-react-native";

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

  showCloseIcon = false,
}: AppAlertProps) {

  useEffect(() => {
    if (visible && autoClose) {
      const timer = setTimeout(() => {
        onClose?.();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [visible, autoClose, onClose]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/40">

        {/* TOAST */}
        {type === "toast" && (
          <View className="absolute bottom-20 px-6 py-3 rounded-xl bg-text-100 shadow-lg border-2">
            <Text className="text-background-950 font-poppins text-body">{message}</Text>
          </View>
        )}

        {/* POPUP / DIALOG / CONFIRM */}
        {type !== "toast" && (
          <View className="w-4/5 rounded-2xl bg-background-950 p-6 shadow-2xl ">

            {/* Close icon */}
            {showCloseIcon && onClose && (
              <TouchableOpacity
                className="absolute right-4 top-4 z-10 bg-primary-500 rounded-full p-1"
                onPress={onClose}
              >
                <X size={18} color="#fff7e5" weight="bold" />
              </TouchableOpacity>
            )}

            {/* Title */}
            {title && (
              <Text className="text-h2 text-text-100 font-poppins text-center mb-3">
                {title}
              </Text>
            )}

            {/* Message */}
            <Text className="text-body text-text-200 font-poppins text-center mb-6">
              {message}
            </Text>

            {/* Buttons */}
            {type === "dialog" && (
              <TouchableOpacity
                onPress={() => onPrimary?.()}
                className="w-full bg-primary-500 rounded-full py-3 items-center justify-center"
              >
                <Text className="text-background-950 font-poppins text-button">
                  {primaryText}
                </Text>
              </TouchableOpacity>
            )}

            {type === "confirm" && (
              <View className="flex-row gap-3 w-full">

                {/* Secondary Button */}
                <TouchableOpacity
                  onPress={() => onSecondary?.()}
                  className="flex-1 border border-text-300 rounded-full py-3 items-center justify-center"
                >
                  <Text className="text-text-200 font-poppins text-button">
                    {secondaryText}
                  </Text>
                </TouchableOpacity>

                {/* Primary Button */}
                <TouchableOpacity
                  onPress={() => onPrimary?.()}
                  className="flex-1 bg-primary-500 rounded-full py-3 items-center justify-center"
                >
                  <Text className="text-text-50 font-poppins text-button">
                    {primaryText}
                  </Text>
                </TouchableOpacity>

              </View>
            )}

          </View>
        )}
      </View>
    </Modal>
  );
}
