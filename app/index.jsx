import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { Button } from "react-native";

export default function Index() {
  useEffect(() => {
    const redirect = setTimeout(() => {
      router.replace("/feed");
    }, 0);

    return () => clearTimeout(redirect);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
