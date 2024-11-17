import { View, Text } from "react-native";
import React from "react";
import Card from "./Card";

const MonthCollection = ({ month = "", children }) => {
  return (
    <>
      {children && (
        <View className="flex mb-6">
          <View className="px-4 mb-4">
            <Text className="font-semibold text-2xl">{month}</Text>
          </View>
          {children}
        </View>
      )}
    </>
  );
};

export default MonthCollection;
