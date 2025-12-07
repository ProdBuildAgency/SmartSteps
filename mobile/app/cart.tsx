import React from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useCart } from "@/contexts/CartContext";
import { CartItemComponent } from "@/components/ui/cards/CartItem";
import { BackAppBar } from "@/components/ui/appbars/BackAppBar";


export default function CartPage() {
  const { cart, clearCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <View className="flex-1  items-center bg-background-950">
        <BackAppBar title="Cart" />
        <Text className="text-lg text-gray-500">Your cart is empty.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center bg-background-950">
      <BackAppBar title="Cart" />
      <View className="h-[32px]"></View>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItemComponent item={item} />}
        ItemSeparatorComponent={() => <View className="h-2" />}
      />

      <TouchableOpacity className="mt-4 h-[64px] justify-items-center items-center">
        <View className="w-[338px] h-[48px] bg-secondary-600 justify-center items-center rounded-2xl">
          <Text className="text-xl text-white font-poppins">
            Pay ₹{getCartTotal().toFixed(0)}
          </Text>
        </View>


      </TouchableOpacity>
    </View>
  );
}
