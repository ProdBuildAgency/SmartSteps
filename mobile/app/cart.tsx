import React from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useCart } from "@/contexts/CartContext";
import { CartItemComponent } from "@/components/CartItem";


export default function CartPage() {
  const { cart, clearCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-lg text-gray-500">Your cart is empty.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItemComponent item={item} />}
        ItemSeparatorComponent={() => <View className="h-2" />}
      />

      <View className="mt-4">
        <Text className="text-xl font-bold">
          Total: ₹ {getCartTotal().toFixed(2)}
        </Text>

        <TouchableOpacity
          className="mt-4 bg-red-500 p-3 rounded"
          onPress={() =>
            Alert.alert("Clear Cart", "Are you sure you want to clear the cart?", [
              { text: "Cancel", style: "cancel" },
              { text: "Yes", onPress: () => clearCart() },
            ])
          }
        >
          <Text className="text-white text-center font-semibold">Clear Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
