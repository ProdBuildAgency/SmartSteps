import React, { useEffect, useState } from "react";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { SplashScreen as ExpoSplashScreen, Stack } from "expo-router";
import "./global.css";
import { RegisterUserProvider, SessionProvider } from "@/contexts";
import SplashScreen from "@/components/ui/SplashScreen";
import RootNavigator from "@/components/RootNavigator";

ExpoSplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  const [fontsLoaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (fontsLoaded) {
      ExpoSplashScreen.hideAsync();

      setTimeout(() => {
        setShowSplashScreen(false);
      }, 5000);
    }
  }, [fontsLoaded]);

  if (showSplashScreen || !fontsLoaded) {
    return <SplashScreen />;
  }

  return (
    <SessionProvider>
      <RegisterUserProvider>
        <RootNavigator />
      </RegisterUserProvider>
    </SessionProvider>
  );
}
