import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Product } from "@/types/product";
import { useRouter } from "expo-router";
import { useCart } from "@/contexts/CartContext";
import { StarHalfIcon, StarIcon } from "phosphor-react-native";

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

    <View className="w-[177px] h-[280px] bg-background-950 border-[0.1px] border-primary-600 rounded-2xl m-2 pt-4 items-center relative">

      {/* CLICKABLE AREA ONLY FOR NAVIGATION */}
      <TouchableOpacity
        className="w-full items-center"
        onPress={() =>
          router.push({
            pathname: "/product/[id]",
            params: { id: product.id },
          })
        }
        activeOpacity={0.9}
      >
        <View className="w-[145px] h-[125px] justify-center items-center bg-white border-2 border-primary-400 rounded-md">
          <Image
            source={{ uri: productImage }}
            className="w-[100px] h-[100px]"
            resizeMode="cover"
          />
          {/* ADD BUTTON */}
          <TouchableOpacity
            className="w-[80px] h-[28px] bg-background-900 rounded-md items-center justify-center"
            style={{
              left: "50%",
              transform: [{ translateX: -40 }], // half of width (80 / 2)
              borderTopWidth: 1,
              borderLeftWidth: 1,
              borderBottomWidth: 2,
              borderRightWidth: 2,
              borderColor: "#008fcc",
            }}
            onPress={handleAddToCart}
          >
            <Text className="text-button text-primary-500">
              Add
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex p-4">
          <Text className="w-[44px] h-[18px] text-[13px] text-white mt-1 bg-secondary-600 text-center rounded-md">
            ₹ {product.price}
          </Text>

          <View className="h-[45px] overflow-hidden">
            <Text
              className="text-body text-gray-500 "
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {product.description}
            </Text>
          </View>

          <Text className="text-button text-gray-800">
            {product.title}
          </Text>

          <View className="flex-row items-center mt-2">
            <StarIcon size={14} weight="fill" color="#FFD83D" />
            <StarIcon size={14} weight="fill" color="#FFD83D" />
            <StarIcon size={14} weight="fill" color="#FFD83D" />
            <StarHalfIcon size={14} weight="fill" color="#FFD83D" />
            <StarIcon size={14} weight="regular" color="#FFD83D" />
            <Text className="text-[14px] ml-1">3.5</Text>
          </View>
        </View>
      </TouchableOpacity>



    </View>

  );
}

