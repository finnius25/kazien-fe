import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const BottomMenu = () => {
  const router = useRouter();

  const handleCreatePost = () => {
    router.push("/createPost");
  };

  return (
    <View className="w-full flex flex-row absolute bottom-0">
      <LinearGradient
        colors={[
          "rgba(255,255,255,0)",
          "rgba(255,255,255,0.9)",
          "rgba(255,255,255,1)",
        ]}
        locations={[0, 0.5, 1]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 120,
          pointerEvents: "none",
        }}
      />

      <View className="w-full flex flex-row pb-10 relative">
        <View className="flex-1 flex justify-center items-center">
          <TouchableOpacity
            onPress={handleCreatePost}
            className="size-16 rounded-full bg-[#022348] flex items-center justify-center active:opacity-80"
          >
            <Text className="text-4xl text-white">+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BottomMenu;
