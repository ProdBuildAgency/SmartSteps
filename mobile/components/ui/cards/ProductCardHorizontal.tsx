import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types/product';
import { useRouter } from 'expo-router';
import { ShoppingCartSimpleIcon } from 'phosphor-react-native';
import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';

const ProductCardHorizontal = ({ product }: { product: Product }) => {

  const router = useRouter();
  const { addToCart } = useCart();

  const imageSource = require("@/assets/images/chair.png");

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      description: product.description,
      price: Number(product.price),
      image: imageSource,
      rating: 0
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        router.push({
          pathname: "/product/[id]",
          params: { id: product.id },
        })
      }
      className="w-[370px] h-[160px] mb-3"
    >
      {/* Card */}
      <View className="bg-background-950 rounded-xl p-4 flex-row shadow-sm border-[0.5px] border-secondary-700 h-full">

        {/* Image */}
        <View className="w-[100px] h-[128px] border-2 border-primary-500 items-center justify-center rounded-xl p-2 bg-gray-50">
          <Image
            source={imageSource}
            className="w-[84px] h-[84px]"
            resizeMode="contain"
          />
        </View>

        {/* Details */}
        <View className="flex-1 ml-3">
          <Text className="text-textSecondary text-[12px]" numberOfLines={2}>
            {product.description}
          </Text>

          <Text className="text-gray-900 font-semibold text-[15px]">
            {product.title}
          </Text>

          <Text className="text-gray-900 font-bold text-[15px]">
            ₹ {product.price}
          </Text>

          {/* Add to Cart (Independent button) */}
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation(); // Prevents card navigation
              handleAddToCart();
            }}
            className="w-[222px] h-[28px] bg-primary-500 rounded-full justify-center items-center mt-1"
          >
            <View className="flex-row items-center">
              <Text className="text-white font-bold text-[15px] mr-[8px]">
                Add To Cart
              </Text>
              <ShoppingCartSimpleIcon size={16} weight="fill" color="#FFF" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardHorizontal;
