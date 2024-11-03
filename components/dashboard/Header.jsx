import { View, Text } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View className="pt-10 px-12">
      <View className="w-full flex flex-row justify-between">
        <View className="flex flex-row gap-2 items-center">
          <Text className="text-7xl font-bold text-black">Fri</Text>
          <View className="size-5 bg-red-500 rounded-full"></View>
        </View>
        <View className="flex items-end">
          <View>
            <Text className="text-3xl font-semibold text-stone-500">
              January 17
            </Text>
          </View>
          <View>
            <Text className="text-3xl font-medium text-neutral-400/80">
              2024
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;
