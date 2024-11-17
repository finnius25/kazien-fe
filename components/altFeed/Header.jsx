import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";

const Header = () => {
  return (
    <View className=" flex flex-row justify-between px-6 mt-2 mb-6 items-center">
      <View className="w-14"></View>
      <View className="flex flex-row items-center gap-2">
        <Text className="text-2xl">My Journal</Text>
        <AntDesign name="down" size={14} color="black" />
      </View>
      <View className="bg-neutral-100 border border-neutral-500 rounded-full overflow-hidden size-12">
        <Image
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: "#0553",
          }}
          source="https://i.pinimg.com/736x/ca/c3/78/cac3788b0b83d397f968dbc8b5613aa5.jpg"
          contentFit="cover"
          transition={1000}
        />
      </View>
    </View>
  );
};

export default Header;
