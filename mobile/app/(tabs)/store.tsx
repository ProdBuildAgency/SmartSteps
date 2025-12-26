import { AppBar } from "@/components/ui/appbars/AppBar";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/contexts/ProductContext";
import { useRouter } from "expo-router";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "phosphor-react-native";
import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { ProductCard } from "@/components/ui/cards/ProductCard";
import ProductCardHorizontal from "@/components/ui/cards/ProductCardHorizontal";
import { useCategories } from "@/contexts/CategoriesContext";

export default function StorePage() {
  const router = useRouter();
  const { getCartCount } = useCart();

  const { products, loading, error } = useProducts();
  const { categories } = useCategories();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");


  const filteredProducts = products.filter((item) => {
    const q = searchQuery.toLowerCase();

    const matchesTitle = item.title?.toLowerCase()?.includes(q);

    const matchesCategoryName =
      item.category?.name?.toLowerCase()?.includes(q);

    const matchesTags = item.tags?.some((tag: any) =>
      tag.name?.toLowerCase()?.includes(q)
    );

    const matchesSearch =
      matchesTitle || matchesCategoryName || matchesTags;

    const matchesCategory =
      activeTab === "all" ||
      item.category?.name?.toLowerCase() === activeTab.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const noResults =
    !loading &&
    !error &&
    filteredProducts.length === 0 &&
    searchQuery.trim().length > 0;


  return (
    <View className="flex-1 items-center bg-background-950">
      <AppBar title="Smart Store" />

      {/* Search Bar and Cart */}
      <View className="flex-row justify-between  items-center p-4 gap-6">
        <View className="flex-row items-center justify-items-center min-w-[300px] gap-2 border-2 border-black bg-white rounded-2xl">
          <View className="pl-4">
            <MagnifyingGlassIcon size={24} color="#FFD83D" weight="bold" />
          </View>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={`Search for "Curriculum"`}
            className="text-textSecondary text-body "
            placeholderTextColor="#6B7280"
          />
        </View>

        {/* Cart Icon */}
        <TouchableOpacity onPress={() => router.push("/cart")}>
          <View className="h-[42px] w-[42px]">
            <ShoppingCartIcon size={40} weight="fill" color="#FFD83D" />
            {getCartCount() > 0 && (
              <View className="absolute bottom-[26px] left-[26px] bg-secondary-500 rounded-full w-[16px] h-[16px] justify-center items-center">
                <Text className="text-white text-xs">{getCartCount()}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View className="w-full bg-background-950 px-2">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row mx-[16px]"
        >
          {/* All Tab */}
          <TouchableOpacity
            onPress={() => setActiveTab("all")}
            className="px-[8px] mx-1"
            style={{
              borderBottomWidth: 1,
              borderBottomColor:
                activeTab === "all" ? "#1e2a38" : "transparent",
            }}
          >
            <Text className="text-center text-sm w-[80px] h-[16px]">
              All
            </Text>
          </TouchableOpacity>

          {/* Category Tabs */}
          {categories
            .filter((cat) => cat.name?.toLowerCase() !== "all")
            .map((cat) => (

              <TouchableOpacity
                key={cat.id}
                onPress={() => setActiveTab(cat.name.toLowerCase())}
                className="px-[8px] mx-1"
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor:
                    activeTab === cat.name.toLowerCase() ? "#1e2a38" : "transparent",
                }}
              >
                <Text
                  className="text-center text-sm w-[80px] h-[16px]"
                  style={{ color: "#1e2a38" }}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>

      {/* Product Grid */}
      <ScrollView className="flex-1 w-full bg-background-950">
        <View className="flex-1 p-3 items-center justify-items-center">
          {/* Loading */}
          {loading && (
            <View className="mt-10 items-center">
              <ActivityIndicator size="large" color="white" />
            </View>
          )}

          {/* Error */}
          {error && (
            <Text className="text-red-500 text-center mt-6">{error}</Text>
          )}

          {/* Product List OR No Results */}
          {noResults ? (
            <View className="mt-20 items-center justify-center px-6 ">
              <Text className="text-primary-50 font-poppins font-bold text-[22px]">
                No Result Found
              </Text>
              <Text className="text-textSecondary font-poppins text-center mt-2 text-[16px]">
                Please check your spelling or try a different keyword.
              </Text>
            </View>
          ) : (

          <View className="w-full items-center justify-items-center">
            <View className="flex-row flex-wrap justify-start w-full">
              {!loading &&
                filteredProducts.map((product, index) => {
                  const isAllTab = activeTab === "all";

                  return (
                    <View
                      key={product.id}
                      className="gap-4"
                    >
                      {isAllTab ? (
                        <ProductCard product={product} />
                      ) : (
                        <ProductCardHorizontal product={product} />
                      )}
                    </View>
                  );
                })}
            </View>
          </View>
          )}

        </View>
      </ScrollView>
    </View>
  );
}
