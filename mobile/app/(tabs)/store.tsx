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

const tabs = [
  { id: "all", label: "All" },
  { id: "curriculum", label: "Curriculum" },
  { id: "worksheets", label: "Worksheets" },
  { id: "assessment", label: "Assessment" },
  { id: "preschoolers", label: "Preschoolers" },
  { id: "nursery", label: "Nursery" },
  { id: "Book", label: "Book" },
];

export default function StorePage() {
  const router = useRouter();
  const { getCartCount } = useCart();

  const { products, loading, error } = useProducts();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // 🔍 Filtering Logic
  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeTab === "all" ||
      item.category?.name?.toLowerCase() === activeTab.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <View className="flex-1 items-center bg-background-950">
      <AppBar title="Smart Store" />

      {/* Search Bar and Cart */}
      <View className="flex-row justify-between items-center p-4 m-[16px]">
        <View className="flex-row items-center justify-center w-[304px] h-[48px] px-4 mr-3 border-2 border-black bg-white rounded-2xl">
          <MagnifyingGlassIcon size={20} color="#5F6C7B" weight="bold" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={`Search for "Curriculum"`}
            className="flex-1 ml-2 text-[16px] text-textSecondary font-poppins"
            placeholderTextColor="#6B7280"
          />
        </View>

        {/* Cart */}
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
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              className="px-[8px] mx-1"
              style={{
                borderBottomWidth: 1,
                borderBottomColor:
                  activeTab === tab.id ? "#1e2a38" : "transparent",
              }}
            >
              <Text
                className="text-center text-sm w-[80px] h-[16px]"
                style={{
                  color: "#1e2a38",
                }}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Product Grid */}
      <ScrollView className="flex-1 w-full bg-background-950">
        <View className="flex-1 p-3">

          {/* Loading State */}
          {loading && (
            <View className="mt-10 items-center">
              <ActivityIndicator size="large" color="white" />
            </View>
          )}

          {/* Error State */}
          {error && (
            <Text className="text-red-500 text-center mt-6">{error}</Text>
          )}


          {/* Grid */}
          <View className="flex-row flex-wrap">
            {!loading &&
              filteredProducts.map((product, index) => (
                <View
                  key={product.id}
                  className={`w-[48%] mb-4 ${index % 2 === 0 ? "" : "ml-4"
                    }`} // 16px gap for every second card
                >
                  <ProductCard product={product} />
                </View>
              ))}
          </View>


        </View>
      </ScrollView>
    </View>
  );
}
