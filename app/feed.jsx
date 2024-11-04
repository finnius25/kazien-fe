import { View, Dimensions, FlatList } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Feed = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [postsData, setPostsData] = useState([]);
  const horizontalListRef = useRef(null);
  const scrollY = useSharedValue(0);
  const HEADER_HEIGHT = 90;
  const TOPTABS_HEIGHT = 80;

  useEffect(() => {
    // Load posts from AsyncStorage
    const loadPosts = async () => {
      try {
        const storedPosts = await AsyncStorage.getItem("posts");
        if (storedPosts) {
          setPostsData(JSON.parse(storedPosts));
        } else {
          console.log("No posts found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    };

    loadPosts();
  }, []);

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

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems[0]) {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() + viewableItems[0].index - 1);
      setSelectedDate(newDate);
    }
  };

  // Helper function to check if two dates are the same day
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // Render each horizontal page (contains a vertical FlatList)
  const renderHorizontalItem = ({ index }) => {
    const itemDate = new Date(selectedDate);
    itemDate.setDate(selectedDate.getDate() + index - 1);

    // Filter posts for the specific date
    const dateFilteredPosts = postsData.filter((post) =>
      isSameDay(new Date(post.timestamp), itemDate)
    );

    console.log("postsData", postsData);

    // Create feed data with filtered posts
    const feedData =
      dateFilteredPosts.length > 0
        ? [
            {
              id: itemDate.toISOString(),
              posts: dateFilteredPosts,
            },
          ]
        : [];

    return (
      <View style={{ width: SCREEN_WIDTH }}>
        <Animated.FlatList
          data={feedData}
          renderItem={({ item }) => <FeedCollection posts={item.posts} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => {
            scrollY.value = nativeEvent.contentOffset.y;
          }}
          scrollEventThrottle={16}
          bounces={false}
        />
      </View>
    );
  };

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
      <FlatList
        ref={horizontalListRef}
        horizontal
        pagingEnabled
        data={[0, 1, 2]} // Previous, Current, Next
        renderItem={renderHorizontalItem}
        keyExtractor={(item) => item.toString()}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        initialScrollIndex={1}
        getItemLayout={(data, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />
      <BottomMenu />
    </SafeAreaView>
  );
};

export default Feed;
