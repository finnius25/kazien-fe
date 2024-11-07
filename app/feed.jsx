import { View, Dimensions, FlatList, Text } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import TopTabs from "../components/feed/TopTabs";
import Header from "../components/dashboard/Header";
import TopCalView from "../components/dashboard/TopCalView";
import FeedCollection from "../components/feed/FeedCollection";
import BottomMenu from "../components/BottomMenu";
import { formatDate, getTasksForDate } from "../utils/task/taskStore";
import migratePosts from "../scripts/dataMigration";
import getWeekDates, { toLocalDate } from "../utils/date/getWeekDates";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Feed = () => {
  const [weekDates, setWeekDates] = useState(getWeekDates());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasksData, setTasksData] = useState({});
  const horizontalListRef = useRef(null);
  const scrollY = useSharedValue(0);
  const HEADER_HEIGHT = 90;
  const TOPTABS_HEIGHT = 80;
  const currentIndexRef = useRef(0);
  const [feedData, setFeedData] = useState({
    id: formatDate(selectedDate),
    posts: [],
  });


  // Update weekDates when selectedDate changes
  useEffect(() => {
    setWeekDates(getWeekDates(selectedDate));
  }, [selectedDate]);

  // Load tasks for the current week
  useEffect(() => {
    const loadWeekTasks = async () => {
      const tasks = await Promise.all(
        weekDates.map((date) => getTasksForDate(date))
      );

      const newTasksData = {};
      weekDates.forEach((date, index) => {
        newTasksData[formatDate(date)] = tasks[index];
      });

      setTasksData(newTasksData);
    };

    loadWeekTasks();
  }, [weekDates]);

  const springConfig = {
    damping: 15,
    mass: 1,
    stiffness: 100,
  };

  const headerStyle = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [HEADER_HEIGHT, 0],
      Extrapolation.CLAMP
    ),
    opacity: interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [1, 0],
      Extrapolation.CLAMP
    ),
  }));

  const calendarStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSpring(
          interpolate(
            scrollY.value,
            [0, HEADER_HEIGHT],
            [0, -(HEADER_HEIGHT - TOPTABS_HEIGHT)],
            Extrapolation.CLAMP
          ),
          springConfig
        ),
      },
      {
        scale: withSpring(
          interpolate(
            scrollY.value,
            [0, HEADER_HEIGHT * 0.5],
            [1, 0.98],
            Extrapolation.CLAMP
          ),
          springConfig
        ),
      },
    ],
    zIndex: 1,
  }));

  useEffect(() => {
    const selectedDateStr = formatDate(selectedDate);
    const selectedTasks = tasksData[selectedDateStr] || [];
    setFeedData({
      id: selectedDateStr,
      posts: selectedTasks.map((task) => ({
        id: task.id,
        title: task.title,
        bulletPoints: task.bulletPoints,
        image: task.image,
        timestamp: task.timestamp,
      })),
    });
  }, [selectedDate, tasksData]);

  const updateDate = (direction) => {
    const newDate = new Date(selectedDate.getTime());
    newDate.setDate(selectedDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  const swipeGesture = Gesture.Pan().onEnd((e) => {
    "worklet";
    const swipeThreshold = 35;

    try {
      if (e.velocityX > 0 && e.translationX > swipeThreshold) {
        // Swiped right (previous day)
        runOnJS(updateDate)(-1);
      } else if (e.velocityX < 0 && e.translationX < -swipeThreshold) {
        // Swiped left (next day)
        runOnJS(updateDate)(1);
      }
    } catch (error) {
      console.error("Error in gesture handler:", error);
    }
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
          weekDates={weekDates}
        />
      </Animated.View>
      <GestureDetector gesture={swipeGesture}>
        <View className="flex-1">
          <FeedCollection id={feedData.id} posts={feedData.posts} />
        </View>
      </GestureDetector>
      <BottomMenu />
    </SafeAreaView>
  );
};

export default Feed;
