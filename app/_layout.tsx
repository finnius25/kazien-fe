import { Stack } from "expo-router";

import "../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none", // This disables the animation for all screens
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="feed" />
        <Stack.Screen name="alt-feed" />
        <Stack.Screen name="createPost" />
        <Stack.Screen name="taskView" />
      </Stack>
    </GestureHandlerRootView>
  );
}
