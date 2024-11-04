import { Image } from "expo-image";
import { Text, View } from "react-native";
import { blurhash } from "../../utils/general/blurhash";

const Post = ({ image, bulletPoints = [], title = "" }) => {
  return (
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
          <Text className="text-stone-400 text-base font-medium">20m</Text>
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