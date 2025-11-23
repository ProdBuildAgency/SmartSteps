import AppAlert from "@/components/ui/AppAlert";
import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import LoginScreen from "./(auth)/login";

export default function Index() {

  const [toastVisible, setToastVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);;

  return (
    // <View className="flex-1 items-center justify-center bg-background-900">
    //   <Text className="text-h1 font-bold font-poppins text-text-100">
    //     Og Here!
    //   </Text>
    //   <Text className="text-h2 font-bold font-poppins text-primary-500">
    //     Og Here!
    //   </Text>
    //   <Text className="text-h3 font-bold font-poppins text-secondary-500">
    //     Og Here!
    //   </Text>
    //   <Text className="text-body font-bold font-poppins text-accent-600">
    //     Og Here!
    //   </Text>
    //   <Text className="text-caption font-bold font-poppins text-textSecondary">
    //     Og Here!
    //   </Text>
    //   <Text className="text-button font-bold font-poppins text-success">
    //     Og Here!
    //   </Text>


    //   {/* Toast Button */}
    //   <Button
    //     title="Show Toast"
    //     onPress={() => setToastVisible(true)}
    //   />

    //   {/* Popup Button */}
    //   <Button
    //     title="Show Popup"
    //     onPress={() => setPopupVisible(true)}
    //   />

    //   {/* Confirm Button */}
    //   <Button
    //     title="Show Confirm Dialog"
    //     onPress={() => setConfirmVisible(true)}
    //   />

    //   {/* Toast Alert */}
    //   <AppAlert
    //     visible={toastVisible}
    //     type="toast"
    //     message="This is a toast message!"
    //     autoClose={2000}
    //     onClose={() => setToastVisible(false)}
    //   />

    //   {/* Popup Alert */}
    //   <AppAlert
    //     visible={popupVisible}
    //     type="popup"
    //     title="Heads up!"
    //     message="This is a popup alert."
    //     onClose={() => setPopupVisible(false)}
    //   />

    //   {/* Confirm Alert */}
    //   <AppAlert
    //     visible={confirmVisible}
    //     type="confirm"
    //     title="Delete Item?"
    //     message="Are you sure you want to delete this?"
    //     primaryText="Delete"
    //     secondaryText="Cancel"
    //     onPrimary={() => {
    //       console.log("Deleted");
    //       setConfirmVisible(false);
    //     }}
    //     onSecondary={() => setConfirmVisible(false)}
    //   />

    // </View>

    <LoginScreen/>
  );
}
