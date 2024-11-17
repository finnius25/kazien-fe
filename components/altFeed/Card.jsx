import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";

const Card = ({ title = "", texts = [], day = "", date = "", imgSrc = "" }) => {
  return (
    <View className="mx-4 bg-white flex flex-row pr-20 rounded-xl mb-4 border border-neutral-100">
      <View className="flex px-4 items-center mt-6">
        <Text className="text-neutral-900 font-medium text-sm">{day}</Text>
        <Text className="text-neutral-900 font-medium text-xl">{date}</Text>
      </View>
      <View className="">
        <View className="flex flex-row justify-between w-full py-4">
          <View className="flex text-lg">
            <View>
              {title && <Text className="font-semibold text-lg">{title}</Text>}
              {texts.map((text, index) => (
                <Text key={index} className="text-lg">
                  {text}
                </Text>
              ))}
            </View>
          </View>
          <View className="bg-neutral-400 rounded-xl overflow-hidden size-32">
            <Image
              style={{
                flex: 1,
                width: "100%",
                backgroundColor: "#0553",
              }}
              source={imgSrc}
              contentFit="cover"
              transition={1000}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;
