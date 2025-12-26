import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Picker } from '@react-native-picker/picker';

import { router, useLocalSearchParams } from "expo-router";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/contexts/ProductContext";
import { ProductCard } from "@/components/ui/cards/ProductCard"; // import your card
import QuantitySelector from "@/components/ui/QuantitySelector";
import { CaretLeftIcon, MagnifyingGlassIcon, MinusIcon, PlusIcon, ShoppingCartSimpleIcon, StarHalfIcon, StarIcon } from "phosphor-react-native";

export default function ProductPage() {
  const { id } = useLocalSearchParams();
  const { cart, addToCart, updateQuantity, getCartCount } = useCart();



  const { getProductById, fetchProducts, products, loading: productLoading } =
    useProducts();

  const [localLoading, setLocalLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const product = getProductById(id as string);
  const cartItem = product ? cart.find((item) => item.id === product.id) : null;


  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLocalLoading(true);
        setError("");

        if (!product) {
          await fetchProducts({ ids: [id as string] });
        }
      } catch (e) {
        setError("Failed to load product");
      } finally {
        setLocalLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // Combined loading state
  if (localLoading || productLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-600 text-lg">{error || "Product not found"}</Text>
      </View>
    );
  }

  // Filter similar products by category
  const similarProducts = products.filter(
    (p) => p.category?.id === product.category?.id && p.id !== product.id
  );

  return (
    <View className="flex-1 bg-background-950">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View className="w-full h-[500px] bg-surface items-center justify-center">
          <Image
            source={{
              uri: product.assets?.[0]?.url ?? "https://via.placeholder.com/300",
            }}
            className="w-[350px] h-[400px] bg-slate-400"
            resizeMode="cover"
          />
        </View>

        <View className="absolute flex-row justify-between top-[44px] w-full px-4">

          {/* BACK BUTTON */}
          <TouchableOpacity
            className="w-12 h-12 rounded-full bg-background-950 items-center justify-center"
            onPress={() => router.back()}
          >
            <CaretLeftIcon color="#FFD83D" />
          </TouchableOpacity>

          {/* SEARCH BUTTON */}
          <TouchableOpacity
            className="w-12 h-12 rounded-full bg-background-950 items-center justify-center"
            onPress={() => router.push("/search")}
          >
            <MagnifyingGlassIcon color="#FFD83D" />
          </TouchableOpacity>
        </View>


        {/* Info Section */}
        <View className="bg-background-950 p-4 m-[16px] rounded-lg border-[0.1px] border-black">
          <Text className="text-base text-primary-50 leading-6">
            {product.description}
          </Text>
          <View className="flex-row items-center mt-2">
            <StarIcon size={14} weight="fill" color="#FFD83D" />
            <StarIcon size={14} weight="fill" color="#FFD83D" />
            <StarIcon size={14} weight="fill" color="#FFD83D" />
            <StarHalfIcon size={14} weight="fill" color="#FFD83D" />
            <StarIcon size={14} weight="regular" color="#FFD83D" />
            <Text className="font-poppins text-[14px]">3.5</Text>
          </View>
          <Text className="text-2xl text-textSecondary font-poppins font-bold mt-4">
            {product.title}
          </Text>

          <Text className="text-surface rounded-md w-[42px] h-[18px] mb-2 bg-secondary-500 text-[12px] text-center justify-center border-b-2 border-r-2 border-black">
            ₹ {product.price}
          </Text>

          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />



          {/* Similar Products */}
          <View className="mt-6">
            <Text className="text-[16px] font-Poppins_600SemiBold text-textSecondary">
              Similar Products
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-2"
            >
              {similarProducts.map((p, index) => (
                <View
                  key={p.id}
                  className={index === 0 ? "mr-3" : "mx-3"}
                >
                  <ProductCard product={p} />
                </View>
              ))}
            </ScrollView>

          </View>
        </View>
      </ScrollView>

      {/* Bottom Add to Cart bar */}
      <View className="w-full p-4 bg-background-950 border-t border-gray-200 flex flex-row items-center justify-center">

        {/* If item exists => show stepper */}
        {cartItem ? (
          <View className="w-[148px] h-[48px] bg-secondary-500 rounded-2xl flex-row items-center justify-between px-3">

            <TouchableOpacity
              onPress={() => updateQuantity(product.id, cartItem.quantity - 1)}
              className="p-2"
            >
              <MinusIcon size={14} color="#FFD83D" weight="bold" />

            </TouchableOpacity>

            <Text className="text-surface font-poppins text-[16px] font-semibold">
              {cartItem.quantity}
            </Text>

            <TouchableOpacity
              onPress={() => updateQuantity(product.id, cartItem.quantity + 1)}
              className="p-2"
            >
              <PlusIcon size={14} color="#FFD83D" weight="bold" />
            </TouchableOpacity>

          </View>
        ) : (
          /* Default Add to Cart button */
          <TouchableOpacity
            className="bg-secondary-600 p-4 rounded-2xl w-[222px] h-[48px] mr-4"
            onPress={() =>
              addToCart({
                id: product.id,
                title: product.title,
                description: product.description,
                price: Number(product.price),
                image: product.assets?.[0]?.url,
                rating: 0,
              })
            }
          >
            <Text className="text-white text-center text-lg font-bold">
              Add to Cart
            </Text>
          </TouchableOpacity>
        )}


        {/* Cart button with View Cart label */}
        <TouchableOpacity
          className={`flex-row items-center justify-center border-2 border-secondary-500 rounded-lg h-[48px] ml-2 
  ${cartItem ? "w-[148px]" : "w-[80px]"}`}
          onPress={() => router.push("/cart")}
        >
          {/* Icon wrapper */}
          <View className="relative">
            <ShoppingCartSimpleIcon size={24} color="#1E2A38" weight="fill" />

            {/* Badge: show if ANY item exists */}
            {getCartCount() > 0 && (
              <View className="absolute -top-[6px] -right-[6px] bg-secondary-500 rounded-full w-[16px] h-[16px] items-center justify-center z-50 elevation-10">
                <Text className="text-white text-[9px] font-bold">
                  {getCartCount()}
                </Text>
              </View>
            )}
          </View>

          {/* Text: ONLY if current product is in cart */}
          {cartItem && (
            <Text className="text-primary-50 ml-2 font-poppins font-semibold">
              View Cart
            </Text>
          )}
        </TouchableOpacity>



      </View>

    </View>
  );
}
