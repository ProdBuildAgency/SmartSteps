import React, { useEffect } from "react";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { SplashScreen, Stack } from "expo-router";
import "./global.css"

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts ({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  useEffect(() =>  {
    if(error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error])

  return(
    <Stack 
      screenOptions={{ headerShown: false }}
    />
  ) 
}
