import { router } from "expo-router";
import {
  CaretLeftIcon,
  XIcon,
} from "phosphor-react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useProducts } from "@/contexts/ProductContext";
import ProductCardHorizontal from "@/components/ui/cards/ProductCardHorizontal";

const Search = () => {
  const { products } = useProducts();

  const [searchQuery, setSearchQuery] = useState("");


  const filteredProducts = products.filter((item) => {
    const q = searchQuery.toLowerCase();

    const matchesTitle = item.title?.toLowerCase()?.includes(q);

    const matchesCategoryName =
      item.category?.name?.toLowerCase()?.includes(q);

    const matchesTags = item.tags?.some((tag: any) =>
      tag.name?.toLowerCase()?.includes(q)
    );

    const matchesSearch = matchesTitle || matchesCategoryName || matchesTags;

    return matchesSearch;
  });

  const isEmpty = searchQuery.trim().length === 0;
  const noResults = !isEmpty && filteredProducts.length === 0;

  return (
    <View className="flex-1 bg-background-950 px-4">

      {/* Search Bar */}
      <View className="flex-row items-center justify-center mt-12 w-full h-[48px] px-4 border-2 border-black bg-white rounded-2xl">
        
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()}>
          <CaretLeftIcon size={20} color="#FFD83D" weight="bold" />
        </TouchableOpacity>

        {/* Search Input */}
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder='Search for "Curriculum"'
          className="flex-1 ml-2 text-[16px] text-textSecondary font-poppins"
          placeholderTextColor="#6B7280"
        />

        {/* Clear Search */}
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <XIcon size={20} color="#5F6C7B" weight="bold" />
          </TouchableOpacity>
        )}
      </View>


      {/* search is empty */}
      {isEmpty && (
        <View className="flex-1 items-center justify-center">
          <Text className="text-primary-50 font-poppins font-bold text-[22px]">
            What are you looking for?
          </Text>
          <Text className="text-textSecondary font-poppins text-[16px]">
            Start typing in the box above to find results.
          </Text>
        </View>
      )}

      {/*no results found */}
      {noResults && (
        <View className="flex-1 items-center justify-center">
          <Text className="text-primary-50 font-poppins font-bold text-[22px]">
            No Result Found
          </Text>
          <Text className="text-textSecondary font-poppins text-center justify-center text-[16px]">
            Please check your spelling or try a different keyword.
          </Text>
        </View>
      )}

      {/* Search Results */}
      {!isEmpty && filteredProducts.length > 0 && (
        <ScrollView className="mt-6">
          {filteredProducts.map((product) => (
            <View key={product.id} className="mb-4">
              <ProductCardHorizontal product={product} />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Search;
