import React, { useEffect } from "react";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import { RegisterUserProvider } from "@/contexts/RegisterUserContext"; // ✅ unified provider
import { SessionProvider } from "@/contexts/SessionContext";

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <SessionProvider>
    <RegisterUserProvider>
      <Stack
        initialRouteName="(auth)/login"
        screenOptions={{ headerShown: false }}
      />
    </RegisterUserProvider>
    </SessionProvider>
  );
}
