import { CartItem } from "@/types/cart";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash } from "phosphor-react-native";
import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

interface CartItemComponentProps {
  item: CartItem;
}

export function CartItemComponent({ item }: CartItemComponentProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <View className="bg-white rounded-xl p-4 flex-row shadow-sm mb-3">
      <View className="border-2 border-blue-500 rounded-lg p-2 bg-gray-50 w-20 h-20">
        <Image 
          source={item.image} 
          className="w-full h-full" 
          resizeMode="contain"
        />
      </View>

      <View className="flex-1 ml-3">
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-gray-900 font-semibold text-base mb-1">
              {item.title}
            </Text>
            <Text className="text-gray-600 text-xs" numberOfLines={1}>
              {item.description}
            </Text>
          </View>

          <TouchableOpacity 
            onPress={() => removeFromCart(item.id)}
            className="p-2"
          >
            <Trash size={20} color="#ef4444" weight="bold" />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between items-center mt-3">
          <Text className="text-gray-900 font-bold text-lg">
            ₹ {item.price * item.quantity}
          </Text>

          <View className="flex-row items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
            <TouchableOpacity 
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-2"
            >
              <Minus size={16} color="#374151" weight="bold" />
            </TouchableOpacity>

            <Text className="text-gray-900 font-semibold text-base min-w-[30px] text-center">
              {item.quantity}
            </Text>

            <TouchableOpacity 
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-2"
            >
              <Plus size={16} color="#374151" weight="bold" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}