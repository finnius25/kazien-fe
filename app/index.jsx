import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Link } from "expo-router";
import { Button } from "react-native";

export default function Index() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 flex flex-col items-center justify-center">
        <Link href="/dashboard" asChild>
          <Pressable>
            <Text>dashboard</Text>
          </Pressable>
        </Link>
        <Link href="/feed" asChild>
          <Pressable>
            <Text>feed</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
