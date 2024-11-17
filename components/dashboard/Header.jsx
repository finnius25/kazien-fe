import { View, Text } from "react-native";
import React from "react";
import formatMonth from "../../utils/date/formatMonth";
import formatDay from "../../utils/date/formatDay";

const Header = ({ selectedDate }) => {
  if (!selectedDate) {
    selectedDate = new Date();
  }
  return (
    <View className="pt-8 px-4">
      <View className="w-full flex flex-row justify-between">
        <View className="flex flex-row gap-2 items-center">
          <Text className="text-7xl font-bold text-black">
            {formatDay(selectedDate)}
          </Text>
          <View className="size-5 bg-[#022348] rounded-full"></View>
        </View>
        <View className="flex items-end">
          <View>
            <Text className="text-3xl font-semibold text-stone-500">
              {formatMonth(selectedDate)} {selectedDate.getDate()}
            </Text>
          </View>
          <View>
            <Text className="text-3xl font-medium text-neutral-400/80">
              {selectedDate.getFullYear()}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;
