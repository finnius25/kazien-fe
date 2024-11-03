import { View, Text } from "react-native";
import React from "react";

const BottomMenu = () => {
  return (
    <View className="w-full flex flex-row">
      <View className="flex-1 flex justify-center items-center">
        <View className="size-16 rounded-full bg-red-600 flex items-center justify-center">
          <Text className="text-4xl text-white">+</Text>
        </View>
      </View>
    </View>
  );
};

export default BottomMenu;
