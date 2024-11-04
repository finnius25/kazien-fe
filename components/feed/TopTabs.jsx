import { View, Text } from "react-native";
import React from "react";

const TopTabs = () => {
  return (
    <View className="w-full flex flex-row items-start justify-center gap-3">
      <View className="flex gap-2 items-center">
        <Text className="text-black font-medium text-lg">Following</Text>
      </View>
      <View className="flex gap-1 items-center">
        <Text className="text-black font-medium text-lg">Your Day</Text>
        <View className="w-full px-4">
          <View className="w-full bg-black p-[1px]" />
        </View>
      </View>
    </View>
  );
};

export default TopTabs;
