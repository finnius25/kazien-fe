import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/dashboard/Header";
import TopCalView from "../components/dashboard/TopCalView";
import TaskList from "../components/dashboard/TaskList";
import BottomMenu from "../components/BottomMenu";

export default function Index() {
  return (
    <SafeAreaView className="flex-1">
      <Header />
      <TopCalView />
      <TaskList />
      <BottomMenu />
    </SafeAreaView>
  );
}
