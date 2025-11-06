// components/ui/AppAlert.tsx
import React from "react";
import AwesomeAlert from "react-native-awesome-alerts";

interface AppAlertProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

export default function AppAlert({ visible, message, onClose }: AppAlertProps) {
  return (
    <AwesomeAlert
      show={visible}
      showProgress={false}
      title="Alert"
      message={message}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={true}
      showConfirmButton={true}
      confirmText="OK"
      confirmButtonColor="#F7A400"
      onConfirmPressed={onClose}
    />
  );
}
