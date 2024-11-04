import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/dashboard/Header";
import TopCalView from "../components/dashboard/TopCalView";
import TaskList from "../components/dashboard/TaskList";
import BottomMenu from "../components/BottomMenu";
import { useState } from "react";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <SafeAreaView className="flex-1">
      <Header selectedDate={selectedDate} />
      <TopCalView
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <TaskList />
      <BottomMenu />
    </SafeAreaView>
  );
}
