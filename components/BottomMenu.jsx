import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const BottomMenu = () => {
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
          <View className="size-16 rounded-full bg-[#022348] flex items-center justify-center">
            <Text className="text-4xl text-white">+</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BottomMenu;
