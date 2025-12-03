import { AppBar } from "@/components/ui/AppBar";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "expo-router";
import { MagnifyingGlassIcon, ShoppingCartIcon } from "phosphor-react-native";
import React, { useState } from "react";
import { TouchableOpacity, View, Text, TextInput, ScrollView } from "react-native";

// Mock data
const productsByCategory = {
  all: [

  ],
  curriculum: [

  ],
  worksheets: [

  ],
  assessment: [

  ],
  presentation: [

  ],
};

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'curriculum', label: 'Curriculum' },
  { id: 'worksheets', label: 'Worksheets' },
  { id: 'assessment', label: 'Assessment' },
  { id: 'preschoolers', label: 'Preschoolers' },
  { id: 'nursery', label: 'Nusrsery' },
];

export default function StorePage() {
  const router = useRouter();
  const { getCartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const currentProducts: any[] = [];

  return (
    <View className="flex-1 items-center bg-background-950">
      <AppBar title="Smart Store" />

      {/* Search Bar and Cart */}
      <View className="flex-row justify-between items-center p-4 m-[16px]">
        {/* Search Bar */}
        <View className="flex-row items-center w-[304px] h-[48px] px-4 mr-3 border-2 border-black bg-white rounded-2xl">
          <MagnifyingGlassIcon size={20} color="#6B7280" weight="bold" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search..."
            className="flex-1 ml-2 text-[16px] text-gray-500 font-poppins"
            placeholderTextColor="#6B7280"
            textAlignVertical="center"
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
      <View className="w-full bg-background-950 px-2 ">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row mx-[16px]"
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              className="px-[8px] mx-1 "
              style={{
                borderBottomWidth: 1,
                borderBottomColor: activeTab === tab.id ? '#1e2a38' : 'transparent',
              }}
            >
              <Text
                className="text-center text-sm w-[80px] h-[16px]"
                style={{
                  fontWeight: 'normal',
                  color: '#1e2a38',
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
        <View className="flex-row flex-wrap justify-between p-2">
          {currentProducts.map((product) => (
            <></>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}