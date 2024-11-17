import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/altFeed/Card";
import BottomMenu from "../components/BottomMenu";
import MonthCollection from "../components/altFeed/MonthCollection";
import Header from "../components/altFeed/Header";

const AltFeed = () => {
  return (
    <SafeAreaView className="flex-1 bg-neutral-100 relative">
      <Header />
      <View></View>
      <ScrollView>
        <MonthCollection month="November 2024">
          <Card
            texts={[
              "Something I built",
              "I like build. I has a good time",
              "I like building",
            ]}
            day="SUN"
            date="17"
            imgSrc="https://i.pinimg.com/736x/59/23/7c/59237c66ac03ca6e0097124ebf1afe0a.jpg"
          />
          <Card
            title="a sky photo"
            day="SAT"
            date="16"
            imgSrc="https://i.pinimg.com/736x/b3/6e/80/b36e8009947d41e52cccaab9d92fa381.jpg"
          />
        </MonthCollection>
        <MonthCollection month="October 2024">
          <Card
            title="dinner with friends"
            day="FRI"
            date="15"
            imgSrc="https://i.pinimg.com/736x/ef/76/39/ef76397d5a60a0f115725c9497af5625.jpg"
          />
          <Card
            title="leg day"
            day="FRI"
            date="14"
            imgSrc="https://i.pinimg.com/736x/96/e7/6b/96e76bf0a0403d668d42e2a6122aad21.jpg"
            texts={["- deadlifts 3x5", "- squats 3x5", "- leg press 3x5"]}
          />
          <Card
            title="grind time"
            day="FRI"
            date="14"
            imgSrc="https://i.pinimg.com/736x/ef/76/39/ef76397d5a60a0f115725c9497af5625.jpg"
          />
        </MonthCollection>
        <MonthCollection month="September 2024" />
        <View className="h-20" />
      </ScrollView>
      <BottomMenu />
    </SafeAreaView>
  );
};

export default AltFeed;
