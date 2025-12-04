import React from "react";
import { View, Text } from "react-native";
import { Tabs } from "expo-router";
import { StyleSheet, ViewStyle } from "react-native";
import {
  HouseIcon,
  CirclesThreePlusIcon,
  StorefrontIcon,
  UserIcon,
} from "phosphor-react-native";

export default function TabsLayout() {

  const styles = StyleSheet.create({
    icon: {
      width: 48,
      height: 48,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      justifyContent: "center",
      alignItems: "center",
    } as ViewStyle,
  });

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
          elevation: 20,
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
          tabBarLabel: ({ focused }) => (focused ? null : <Text className = "text-secondary-500 font-bold">Home</Text>),

          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.icon, { backgroundColor: focused ? "rgba(95,108,123,0.1)" : "transparent" }]}>
              <HouseIcon size={28} color={color} weight="fill" />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="services"
        options={{
          title: "Services",
          tabBarLabel: ({ focused }) => (focused ? null : <Text className = "text-secondary-500 font-bold">Services</Text>),
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.icon, { backgroundColor: focused ? "rgba(95,108,123,0.1)" : "transparent" }]}>
              <CirclesThreePlusIcon size={28} color={color} weight="fill" />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="store"
        options={{
          title: "Store",
          tabBarLabel: ({ focused }) => (focused ? null : <Text className = "text-secondary-500 font-bold">Store</Text>),
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.icon, { backgroundColor: focused ? "rgba(95,108,123,0.1)" : "transparent" }]}>
              <StorefrontIcon size={28} color={color} weight="fill" />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: ({ focused }) => (focused ? null : <Text className = "text-secondary-500 font-bold">Profile</Text>),
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.icon, { backgroundColor: focused ? "rgba(95,108,123,0.1)" : "transparent" }]}>
              <UserIcon size={28} color={color} weight="fill" />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
