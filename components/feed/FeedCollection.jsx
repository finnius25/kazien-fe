import { View, Text } from "react-native";
import React from "react";
import Post from "./Post";

const FeedCollection = () => {
  return (
    <View className="px-4 pb-10 pt-4 flex gap-10">
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
      <Post
        image={
          "https://i.pinimg.com/474x/b1/c0/58/b1c058202242c367fa040a2dc6260557.jpg"
        }
      />
      <Post
        image={
          "https://i.pinimg.com/474x/5f/43/3a/5f433a54776c1ab47fa76e4b900e3d61.jpg"
        }
      />
    </View>
  );
};

export default FeedCollection;
