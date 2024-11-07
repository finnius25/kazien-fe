import { View, FlatList, Text } from "react-native";
import React from "react";
import Post from "./Post";
import { Image } from "expo-image";
import MountainImg from "../../assets/images/moutain.jpg";
import { blurhash } from "../../utils/general/blurhash";

const FeedCollection = ({ posts = [] }) => {
  const renderPost = ({ item: post }) => (
    <Post
      post={post}
      timestamp={post.timestamp}
      key={post.id}
      image={post.image}
      title={post.title}
      bulletPoints={post.bulletPoints}
    />
  );

  return (
    <>
      {posts?.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(post) => post.id}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 20,
            paddingTop: 16,
          }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 40 }} />}
        />
      ) : (
        <View className="flex-1 h-full w-full flex items-center justify-center mb-32">
          <View className="size-72 rounded-full overflow-hidden">
            <Image
              style={{
                flex: 1,
                width: "100%",
                // backgroundColor: "#0553",
              }}
              source={MountainImg}
              placeholder={{ blurhash }}
              contentFit="contain"
              transition={1000}
            />
          </View>
          <Text>No posts for this date</Text>
        </View>
      )}
    </>
  );
};

export default FeedCollection;
