import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CaretDown, CaretDownIcon } from "phosphor-react-native";

const QuantitySelector = ({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: (q: number) => void;
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const quantities = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <View className="w-full h-[36~px] relative">
      {/* Button to open dropdown */}
      <TouchableOpacity
        className="flex-row justify-between items-center h-8 px-3 border border-primary-50 rounded-sm bg-surface"
        onPress={() => setDropdownVisible(!dropdownVisible)}
      >
        <Text className="text-textSecondary">Quantity: {quantity}</Text>
        <CaretDownIcon size={20} color="#000" />
      </TouchableOpacity>

      {/* Dropdown list */}
      {dropdownVisible && (
        <View className="absolute top-9 w-full bg-white border border-gray-200 rounded-md z-50 shadow-md">
          {quantities.map((item) => (
            <TouchableOpacity
              key={item}
              className="px-4 py-2 border-b border-gray-200"
              onPress={() => {
                setQuantity(item);
                setDropdownVisible(false);
              }}
            >
              <Text className="text-textSecondary text-[14px] font-poppins">
                Quantity: {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default QuantitySelector;
