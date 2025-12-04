import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Product } from "@/types/product";
import { useRouter } from "expo-router";
import { useCart } from "@/contexts/CartContext";

export function ProductCard({ product }: { product: Product }) {
    const router = useRouter();
    const { addToCart } = useCart();

    //   const imageSource = product.assets?.[0]?.url
    //     ? { uri: product.assets[0].url }
    //     : require("@/assets/images/chair.png");


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
        <View className="w-[177px] h-[280px] bg-background-950 border-[0.1px] border-primary-600  rounded-2xl p-3 mb-4 shadow-sm">

            {/* Product Image */}
            <TouchableOpacity
                onPress={() => console.log("Push to product page")}
                className="w-full"
            >
                <View className="w-[145px] h-[125px] justify-center items-center justify-items-center bg-white border-2 border-primary-400 rounded-md">
                    <Image
                        source={imageSource}
                        className="w-[100px] h-[100px]"
                        resizeMode="cover"
                    />
                </View>

            </TouchableOpacity>

            <Text className=" w-[44px] h-[18px] text-[13px] text-white mt-1  bg-secondary-600 text-center justify-center rounded-md ">
                ₹ {product.price}
            </Text>



            <Text
                className="text-[12px] text-gray-500 mt-1"
                numberOfLines={3} // truncate after 2 lines
            >
                {product.description}
            </Text>

                        {/* Title */}
            <Text className="mt-2 text-[14px] font-semibold text-gray-800">
                {product.title}
            </Text>

            {/* Add Button */}
            <TouchableOpacity
                className="absolute top-[103px] left-[73px] w-[80px] h-[28px] bg-background-900 rounded-md items-center justify-center"
                style={{
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderBottomWidth: 2,
                    borderRightWidth: 2,
                    borderColor: '#008fcc',
                }}
                onPress={handleAddToCart}
            >
                <Text className="font-semibold text-[15px] text-primary-500">
                    Add
                </Text>
            </TouchableOpacity>
        </View>
    );
}
