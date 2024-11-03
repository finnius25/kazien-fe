import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { Link } from "expo-router";
import gymPic from "../assets/images/gym-pic2.jpeg";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const TaskView = () => {
  return (
    <SafeAreaView className="flex-1 pt-4 px-3 flex gap-2">
      {/* <View className="flex flex-row items-center gap-2">
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
      </View> */}
      <View className="relative">
        <Link href="/" asChild className="absolute top-4 left-4 z-10">
          <Pressable>
            <View className=" bg-white rounded-full  size-10 flex items-center justify-center">
              <Entypo name="chevron-small-left" size={24} color="black" />
            </View>
          </Pressable>
        </Link>
        <View className="max-h-[40rem] rounded-2xl overflow-hidden">
          <Image
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "#0553",
            }}
            source={gymPic}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
        </View>
      </View>
      <View className="mt-4">
        <Text className="text-4xl font-semibold">hit gym</Text>
      </View>
    </SafeAreaView>
  );
};

export default TaskView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
});
