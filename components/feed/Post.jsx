import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import { blurhash } from "../../utils/general/blurhash";
import { Link, router } from "expo-router";

const Post = ({ image, bulletPoints = [], title = "", post, timestamp }) => {
  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) {
      return "just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d`;
    } else {
      // Format date for older posts
      const options = { month: "short", day: "numeric" };
      return date.toLocaleDateString(undefined, options);
    }
  };

  const relativeTime = getRelativeTime(timestamp);

  return (
    // <Pressable
    //   onPress={() => router.push("/taskView")}
    //   delayLongPress={150}
    //   style={({ pressed }) => [
    //     {
    //       opacity: pressed ? 0.9 : 1,
    //     },
    //   ]}
    //   hitSlop={{ top: 10, bottom: 10 }}
    // >
    <View className="flex gap-2">
      <View className="flex flex-row items-center gap-2">
        <View className="size-10 rounded-full overflow-hidden border border-neutral-300">
          <Image
            style={{
              flex: 1,
              width: "100%",
              backgroundColor: "#0553",
            }}
            source="https://firebasestorage.googleapis.com/v0/b/ellie-18430.appspot.com/o/images%2FKCQrKUybc1gGGfPjoFoVekcJH0k2%2Fundefined?alt=media&token=8f3dc03c-93ae-456b-99d0-bc48760cb15b"
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
        </View>
        <View className="mr-2">
          <Text className="font-medium text-base text-black">You</Text>
        </View>
        <View>
          <Text className="text-stone-400 text-base font-medium">
            {relativeTime}
          </Text>
        </View>
      </View>
      <View className="max-h-[20rem] rounded-2xl overflow-hidden">
        <Image
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#0553",
          }}
          source={image}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
      </View>
      <View>
        <Text className="text-4xl font-bold my-2">{title}</Text>
        {bulletPoints.map((point, i) => (
          <BulletPoint key={i} text={point} />
        ))}
      </View>
    </View>
    // </Pressable>
  );
};

export default Post;

const BulletPoint = ({ text }) => {
  return (
    <View className="flex flex-row gap-4 py-1 px-2">
      <Text className="font-bold text-xl">•</Text>
      <Text className="text-xl">{text}</Text>
    </View>
  );
};
