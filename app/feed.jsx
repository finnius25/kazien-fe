import { View, Dimensions, FlatList, Text } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
  withSpring,
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

  const renderHorizontalItem = ({ item: date, index }) => {
    const dateStr = formatDate(date);

    // Filter tasks for just this specific date
    const tasks = tasksData[dateStr] || [];

    // Only create feedData if there are tasks for this date
    const feedData = {
      id: dateStr,
      posts: tasks.map((task) => ({
        id: task.id,
        title: task.title,
        bulletPoints: task.bulletPoints,
        image: task.image,
        timestamp: task.timestamp,
      })),
    };

    return (
      <View style={{ width: SCREEN_WIDTH }}>
        <FeedCollection id={dateStr} posts={feedData.posts} />
        <View>
          <Text>Posts for {dateStr}</Text>
          <Text>{feedData.posts.length} posts</Text>
        </View>
      </View>
    );
  };

  // migratePosts();

  const selectedDateStr = formatDate(selectedDate);
  const selectedTasks = tasksData[selectedDateStr] || [];
  const feedData = {
    id: selectedDateStr,
    posts: selectedTasks.map((task) => ({
      id: task.id,
      title: task.title,
      bulletPoints: task.bulletPoints,
      image: task.image,
      timestamp: task.timestamp,
    })),
  };

  const swipeGesture = Gesture.Pan().onEnd((e) => {
    if (e.velocityX > 0) {
      // Swiped right (previous day)
      setSelectedDate((prevDate) => {
        const newDate = new Date(prevDate);
        newDate.setDate(newDate.getDate() - 1);
        return newDate;
      });
    } else if (e.velocityX < 0) {
      // Swiped left (next day)
      setSelectedDate((prevDate) => {
        const newDate = new Date(prevDate);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
      });
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
      {/* <GestureDetector gesture={swipeGesture}> */}
      {/* <View className="pb-[40rem]"> */}
      <FeedCollection id={feedData.id} posts={feedData.posts} />
      {/* <View>
          <Text>Posts for {selectedDateStr}</Text>
          <Text>{feedData.posts.length} posts</Text>
        </View>
      </View> */}
      {/* </GestureDetector> */}
      <BottomMenu />
    </SafeAreaView>
  );
};

export default Feed;
