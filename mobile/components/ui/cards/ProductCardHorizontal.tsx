import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types/product'
import { useRouter } from 'expo-router';
import { PlusIcon, ShoppingCartIcon, ShoppingCartSimpleIcon } from 'phosphor-react-native';
import React from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'

const ProductCardHorizontal = ({ product }: { product: Product }) => {

    const router = useRouter();
    const { addToCart } = useCart();

    //   const imageSource = product.assets?.[0]?.url
    //     ? { uri: product.assets[0].url }
    //     : require("@/assets/images/chair.png");

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


    const imageSource = require("@/assets/images/chair.png");

    return (
        <View className="bg-background-950 rounded-xl p-4 flex-row shadow-sm mb-3 border-[0.5px] border-secondary-700 shadow-secondary-700 w-[370px] h-[160px] justify-items-center items-center">
            <View className="w-[100px] h-[128px] border-2 border-primary-500 
                items-center justify-center rounded-xl p-2 bg-gray-50">
                <Image
                    source={imageSource}
                    className="w-[84px] h-[84px] items-center justify-center"
                    resizeMode="contain"
                />
            </View>

            <View className="flex-1 ml-3">
                <View className="flex-row justify-between items-start">
                    <View className="flex-1">
                        <Text className="text-textSecondary text-[12px]" numberOfLines={2}>
                            {product.description}
                        </Text>
                        <Text className="text-gray-900 font-semibold text-[15px] ">
                            {product.title}
                        </Text>

                        <Text className="text-gray-900 font-bold text-[15px]">
                            ₹ {product.price}
                        </Text>
                        <TouchableOpacity
                            onPress={handleAddToCart}
                            className='w-[222px] h-[28px] bg-primary-500 rounded-full justify-center items-center'
                        >
                            <View className='flex-row justify-items-center items-center'>
                                <Text
                                    className='text-white font-poppins font-bold text-[15px] mr-[8px]'
                                >
                                    Add To Cart
                                </Text>
                                <ShoppingCartSimpleIcon size={16} weight="fill" color="#FFF" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ProductCardHorizontal