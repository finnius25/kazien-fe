import { View } from "react-native";
import React from "react";
import Post from "./Post";

const FeedCollection = ({ posts = [] }) => {
  return (
    <View className="px-4 pb-24 pt-4 flex gap-10">
      {posts.map((post) => (
        <Post
          post={post}
          timestamp={post.timestamp}
          key={post.id}
          image={post.image}
          title={post.title}
          bulletPoints={post.bulletPoints}
        />
      ))}
    </View>
  );
};

export default FeedCollection;
