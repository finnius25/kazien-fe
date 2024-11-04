import { View, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import TopTabs from "../components/feed/TopTabs";
import Header from "../components/dashboard/Header";
import TopCalView from "../components/dashboard/TopCalView";
import FeedCollection from "../components/feed/FeedCollection";
import BottomMenu from "../components/BottomMenu";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = 50;

const Feed = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const scrollY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const HEADER_HEIGHT = 90;
  const TOPTABS_HEIGHT = 80;
  const CALENDAR_HEIGHT = 0;

  const springConfig = {
    damping: 15,
    mass: 1,
    stiffness: 100,
  };

  const updateDate = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  // Modified gesture to work better with scrolling
  const gesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-5, 5]) // Added to better handle vertical scrolling
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        const direction = event.translationX > 0 ? -1 : 1;
        runOnJS(updateDate)(direction);
      }
      translateX.value = withSpring(0, springConfig);
    });

  const headerStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [HEADER_HEIGHT, 0],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [1, 0],
      Extrapolation.CLAMP
    );

    return {
      height,
      opacity,
    };
  });

  const calendarStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [0, -(HEADER_HEIGHT - TOPTABS_HEIGHT)],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT * 0.5],
      [1, 0.98],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        {
          translateY: withSpring(translateY, springConfig),
        },
        { scale: withSpring(scale, springConfig) },
      ],
      zIndex: 1,
    };
  });

  const feedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      flex: 1, // Added to ensure proper layout
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const delta = event.contentOffset.y - scrollY.value;
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <TopTabs />
      <Animated.View style={headerStyle}>
        <Header selectedDate={selectedDate} />
      </Animated.View>
      <Animated.View style={calendarStyle} className="rounded-b-3xl">
        <TopCalView
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </Animated.View>
      <GestureDetector gesture={gesture}>
        <Animated.View style={feedStyle}>
          <Animated.ScrollView
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            bounces={false}
          >
            <FeedCollection />
          </Animated.ScrollView>
        </Animated.View>
      </GestureDetector>
      <BottomMenu />
    </SafeAreaView>
  );
};

export default Feed;
