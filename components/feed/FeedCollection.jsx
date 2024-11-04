import { View, Text } from "react-native";
import React from "react";
import Post from "./Post";

const FeedCollection = () => {
  return (
    <View className="px-4 pb-24 pt-4 flex gap-10">
      <Post
        image={
          "https://i.pinimg.com/474x/b5/cd/56/b5cd56a1698c7e03efec4963770cffbb.jpg"
        }
        title={"chest day was a success"}
        bulletPoints={[
          "3x sets bench press",
          "4x sets incline bench press",
          "3x sets cable flys",
          "3x sets dips",
        ]}
      />
      <Post
        image={
          "https://i.pinimg.com/1200x/d7/0e/44/d70e44acd2d7b71ee59b36533608b169.jpg"
        }
        title="tom n tom grind sesh"
        bulletPoints={[
          "Finished tinykeywords API endpoints",
          "Spent the rest of the time building kazien",
          "Had lot a good time",
        ]}
      />
      <Post
        image={
          "https://i.pinimg.com/474x/18/10/b1/1810b19e620bee72c384356e9e98732e.jpg"
        }
        title="cutest dog in the world 🐶"
      />
      <Post
        image={
          "https://i.pinimg.com/474x/5f/43/3a/5f433a54776c1ab47fa76e4b900e3d61.jpg"
        }
        title="cant sleep :("
        bulletPoints={[
          "Added custome swipiing anmiations to kazien",
          "Decideding what to do next",
          "Thinking about how tomm if going to go",
        ]}
      />
    </View>
  );
};

export default FeedCollection;
