import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import LoadingOverlay from "@/components/LoadingOverlay";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import AppAlert from "@/components/ui/AppAlert";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSession } from "@/contexts/SessionContext";
import { useLoginForm } from "@/contexts/LoginUserContext";

export default function LoginScreen() {
  const router = useRouter();
  const { submitLogin, formData, updateFormData } = useLoginForm();

  // ⬅ Session context
  const { login } = useSession();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const showAlert = (msg: string) => {
    setAlertMessage(msg);
    setAlertVisible(true);
  };

  const hideAlert = () => setAlertVisible(false);

  const validateLogin = () => {
    if (!formData.emailOrPhone.trim() || !formData.password.trim()) {
      return "Please fill all required fields.";
    }

    if (
      formData.emailOrPhone.includes("@") &&
      !formData.emailOrPhone.includes(".")
    ) {
      return "Please enter a valid email address.";
    }

    if (formData.password.length < 8) {
      return "Password must be at least 8 characters long.";
    }

    return null;
  };

  /** -----------------------------
   *  LOGIN SUBMIT HANDLER
   * ----------------------------- */
  const handleLogin = async () => {
    const error = validateLogin();
    if (error) {
      showAlert(error);
      return;
    }

    try {
      setIsLoading(true);


      const result = await submitLogin(); // must return { token, user }

      await login(result.token, result.user);

      setIsLoading(false);
      showAlert("Login successful!");

      // prevent navigating back to login screen
      setTimeout(() => {
        router.replace("/(tabs)/home");
      }, 800);

    } catch (err: any) {
      setIsLoading(false);
      showAlert(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <View className="flex-1">
      <KeyboardAwareScrollView
        className="flex-1 bg-secondary-500"
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={20}
      >
        {/* Illustration */}
        <View className="items-center mt-8">
          <View className="w-[280px] h-[280px]">
            <Image
              source={require("../../assets/images/main_logo.png")}
              className="w-full h-full mt-2"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Content */}
        <View className="flex-1 px-6 mt-4 bg-background-950 rounded-t-[68px]">

          <Text className="mt-[48px] text-center text-h1 font-extrabold text-text-100">
            Welcome To
          </Text>
          <Text className="text-accent-600 text-h1 font-bold text-center">
            Smart Steps!
          </Text>

          <Text className="mt-[12px] text-center text-body text-textSecondary">
            Let’s begin your learning journey together.
          </Text>

          {/* Inputs */}
          <CustomInput
            label="Email / Phone Number"
            required
            placeholder="Enter Email / Phone Number"
            value={formData.emailOrPhone}
            isEmail= {true}
            onChangeText={(v) => updateFormData({ emailOrPhone: v })}
          />

          <CustomInput
            label="Password"
            required
            placeholder="Enter Your Password"
            secureTextEntry
            value={formData.password}
            onChangeText={(v) => updateFormData({ password: v })}
          />

          {/* Login Button */}
          <CustomButton
            label="Login"
            type="primary"
            bgColor="primary-500"
            className="mt-4 h-[48px]"
            onPress={handleLogin}
          />

          {/* Footer */}
          <View className="mt-4 mb-6">
            <Text className="text-center text-gray-700">
              New here?{" "}
              <Text
                className="text-accent-600 font-semibold"
                onPress={() => router.push("/(auth)/register")}
              >
                Create Account
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>

      {isLoading && <LoadingOverlay />}

      <AppAlert
        visible={alertVisible}
        message={alertMessage}
        type="toast"
        autoClose={1200}
        primaryText="OK"
        onPrimary={hideAlert}
        onError={true}
        onClose={hideAlert}
      />
    </View>
  );
}
