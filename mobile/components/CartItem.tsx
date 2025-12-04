import { CartItem } from "@/types/cart";
import { useCart } from "@/contexts/CartContext";
import { Minus, MinusIcon, Plus, PlusIcon } from "phosphor-react-native";
import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

interface CartItemComponentProps {
  item: CartItem;
}

export function CartItemComponent({ item }: CartItemComponentProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <View className="bg-background-950 rounded-xl p-4 flex-row shadow-sm mb-3 border-[0.5px] border-secondary-700 shadow-secondary-700 w-[370px] h-[132px] justify-items-center items-center">
      <View className="w-[100px] h-[100px] border-2 border-primary-500 rounded-xl p-2 bg-gray-50">
        <Image
          source={item.image}
          className="w-[84px] h-[84px] items-center justify-center"
          resizeMode="contain"
        />
      </View>

      <View className="flex-1 ml-3">
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-textSecondary text-[12px]" numberOfLines={2}>
              {item.description}
            </Text>
            <Text className="text-gray-900 font-semibold text-[15px] ">
              {item.title}
            </Text>

             <View className="flex-row justify-between items-center ">
          <Text className="text-gray-900 font-bold text-[15px]">
            ₹ {item.price * item.quantity}
          </Text>

          <View className="w-[60px] h-[24px] flex-row items-center bg-gray-100 rounded-lg border-[1px] justify-between">
            <TouchableOpacity
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-2"
            >
              <MinusIcon size={9} color="#FFD83D" />
            </TouchableOpacity>

            <Text className="text-gray-900 font-poppins text-[12px] text-center">
              {item.quantity}
            </Text>

            <TouchableOpacity
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-2"
            >
              <PlusIcon size={9} color="#FFD83D" />
            </TouchableOpacity>
          </View>
        </View>

          </View>
        </View>

       
      </View>
    </View>
  );
}