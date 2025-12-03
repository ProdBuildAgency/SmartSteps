import React from "react";
import { Tabs } from "expo-router";
import { HouseIcon, DotsNineIcon, StorefrontIcon, UserIcon, House, ShoppingCart } from "phosphor-react-native";
import { useCart } from "@/contexts/CartContext";





export default function TabsLayout() {
  const { getCartCount } = useCart();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0096D6",
        tabBarInactiveTintColor: "#FF8C1A",
        tabBarStyle: {
          backgroundColor: "#fff7e5",
          borderTopColor: "#0096D6",
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,

          elevation: 20, // Android shadow

          // iOS shadow
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.9,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Poppins_500Medium",
        },
      }}
    >

      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <HouseIcon size={28} color={color} weight="fill" />
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: "Services",
          tabBarIcon: ({ color, size }) => (
            <DotsNineIcon size={28} color={color} weight="fill" />
          ),
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: "Store",
          tabBarIcon: ({ color, size }) => (
            <StorefrontIcon size={28} color={color} weight="fill" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <UserIcon size={28} color={color} weight="fill" />
          ),
        }}
      />

      {/* <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarBadge: getCartCount() > 0 ? getCartCount() : undefined, // ✅ badge from context
          tabBarIcon: ({ color, focused }) => (
            <ShoppingCart
              size={28}
              color={color}
              weight={focused ? "fill" : "regular"}
            />
          ),
        }}
      /> */}
    </Tabs>
  );
}