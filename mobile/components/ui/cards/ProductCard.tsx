import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Product } from "@/types/product";
import { useRouter } from "expo-router";
import { useCart } from "@/contexts/CartContext";

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart } = useCart();

  const productImage =
    product.assets?.[0]?.url ?? "https://via.placeholder.com/150";

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      description: product.description,
      price: Number(product.price),
      image: productImage,
      rating: 0,
    });
  };

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/product/[id]",
          params: { id: product.id },
        })
      }
      activeOpacity={0.9}
      className="w-[177px] h-[280px]"
    >
      <View className="w-full h-full bg-background-950 border-[0.1px] border-primary-600 rounded-2xl p-3 mb-4 shadow-sm">

        {/* Product Image */}
        <View className="w-[145px] h-[125px] justify-center items-center bg-white border-2 border-primary-400 rounded-md">
          <Image
            source={{ uri: productImage }}
            className="w-[100px] h-[100px]"
            resizeMode="cover"
          />
        </View>

        <Text className="w-[44px] h-[18px] text-[13px] text-white mt-1 bg-secondary-600 text-center rounded-md">
          ₹ {product.price}
        </Text>

        <Text className="text-[12px] text-gray-500 mt-1" numberOfLines={3}>
          {product.description}
        </Text>

        <Text className="mt-2 text-[14px] font-semibold text-gray-800">
          {product.title}
        </Text>

        {/* Add Button — clickable only itself */}
        <TouchableOpacity
          className="absolute top-[103px] left-[73px] w-[80px] h-[28px] bg-background-900 rounded-md items-center justify-center"
          style={{
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderBottomWidth: 2,
            borderRightWidth: 2,
            borderColor: "#008fcc",
          }}
          onPress={(e) => {
            e.stopPropagation(); // ⛔ Prevents navigating to product page
            handleAddToCart();
          }}
        >
          <Text className="font-semibold text-[15px] text-primary-500">
            Add
          </Text>
        </TouchableOpacity>

      </View>
    </TouchableOpacity>
  );
}
