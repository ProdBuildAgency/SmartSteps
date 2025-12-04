import React, { useEffect, useState } from "react";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { SplashScreen as ExpoSplashScreen, Stack } from "expo-router";
import "./global.css";
import { RegisterUserProvider, SessionProvider, useSession } from "@/contexts";
import SplashScreen from "@/components/ui/SplashScreen";
import RootNavigator from "@/components/RootNavigator";
import { LoginProvider } from "@/contexts/LoginUserContext";
import { CartProvider } from "@/contexts/CartContext";
import { ProductProvider } from "@/contexts/ProductContext";

ExpoSplashScreen.preventAutoHideAsync();


function AppContent() {
  const { restoreSession } = useSession();

  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <LoginProvider>
      <RegisterUserProvider>
        <RootNavigator />
      </RegisterUserProvider>
    </LoginProvider>
  );
}

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
      <ProductProvider>
        <CartProvider>

          <AppContent />

        </CartProvider>
      </ProductProvider>
    </SessionProvider>
  );
}