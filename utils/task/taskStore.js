import AsyncStorage from "@react-native-async-storage/async-storage";

const TASKS_KEY = "@tasks";
const DATE_INDEX_KEY = "@dateIndex";

const formatDate = (date) => date.toISOString().split("T")[0];

const getAllTasks = async () => {
  try {
    const data = await AsyncStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Error getting tasks:", error);
    return {};
  }
};

const getDateIndex = async () => {
  try {
    const data = await AsyncStorage.getItem(DATE_INDEX_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Error getting date index:", error);
    return {};
  }
};

const addTask = async (task) => {
  try {
    const [tasks, dateIndex] = await Promise.all([
      getAllTasks(),
      getDateIndex(),
    ]);

    // Add to tasks
    tasks[task.id] = task;

    // Add to date index
    const dateStr = formatDate(new Date(task.timestamp));
    dateIndex[dateStr] = [...(dateIndex[dateStr] || []), task.id];

    await Promise.all([
      AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks)),
      AsyncStorage.setItem(DATE_INDEX_KEY, JSON.stringify(dateIndex)),
    ]);
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

const getTasksForDate = async (date) => {
  try {
    const [tasks, dateIndex] = await Promise.all([
      getAllTasks(),
      getDateIndex(),
    ]);

    const dateStr = formatDate(date);
    const taskIds = dateIndex[dateStr] || [];
    return taskIds.map((id) => tasks[id]).filter(Boolean);
  } catch (error) {
    console.error("Error getting tasks for date:", error);
    return [];
  }
};

const deleteTask = async (taskId, date) => {
  try {
    const [tasks, dateIndex] = await Promise.all([
      getAllTasks(),
      getDateIndex(),
    ]);

    // Remove from tasks
    delete tasks[taskId];

    // Remove from date index
    const dateStr = formatDate(date);
    dateIndex[dateStr] = (dateIndex[dateStr] || []).filter(
      (id) => id !== taskId
    );

    await Promise.all([
      AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks)),
      AsyncStorage.setItem(DATE_INDEX_KEY, JSON.stringify(dateIndex)),
    ]);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

export { addTask, getTasksForDate, deleteTask, formatDate };
