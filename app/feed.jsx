import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/dashboard/Header";
import { Image } from "expo-image";
import Post from "../components/feed/Post";
import TopCalView from "../components/dashboard/TopCalView";
import BottomMenu from "../components/BottomMenu";

const Feed = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="w-full flex flex-row items-start justify-center gap-3 mt-3">
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
      <Header selectedDate={selectedDate} />
      <TopCalView
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {/* <View className="w-full flex flex-row items-start justify-center gap-3 mt-3">
        <View className="flex gap-2 items-center">
          <Text className="text-black font-medium text-base">Following</Text>
        </View>
        <View className="flex gap-1 items-center">
          <Text className="text-black font-medium text-base">Your Wins</Text>
          <View className="w-full bg-black p-[1px]" />
        </View>
      </View> */}
      <View className="px-4 py-10 flex gap-10">
        <Post
          image={
            "https://i.pinimg.com/474x/b5/cd/56/b5cd56a1698c7e03efec4963770cffbb.jpg"
          }
          title={"leg day was a success"}
          bulletPoints={[
            "3x sets deadlift",
            "4x sets squats",
            "3x sets lunges",
            "3x sets leg press",
          ]}
        />
        <Post
          image={
            "https://i.pinimg.com/474x/02/33/e4/0233e412e7de690fd38e404de28b3a23.jpg"
          }
        />
        <Post image={""} />
        <Post image={""} />
      </View>
      <BottomMenu />
    </SafeAreaView>
  );
};

export default Feed;
