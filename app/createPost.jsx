import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera, X } from "lucide-react-native";
import uuid from "react-native-uuid";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TASKS_STORAGE_KEY = "@tasks";
const DATE_INDEX_STORAGE_KEY = "@dateIndex";

const CreatePost = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [bulletPoints, setBulletPoints] = useState([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    if (title.trim() || image || bulletPoints.some((point) => point.trim())) {
      Alert.alert(
        "Discard Changes",
        "Are you sure you want to go back? Your changes will be lost.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Discard",
            onPress: () => router.back(),
            style: "destructive",
          },
        ]
      );
    } else {
      router.back();
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const addBulletPoint = () => {
    setBulletPoints([...bulletPoints, ""]);
  };

  const updateBulletPoint = (text, index) => {
    const newBulletPoints = [...bulletPoints];
    newBulletPoints[index] = text;
    setBulletPoints(newBulletPoints);
  };

  const removeBulletPoint = (index) => {
    if (bulletPoints.length > 1) {
      const newBulletPoints = bulletPoints.filter((_, i) => i !== index);
      setBulletPoints(newBulletPoints);
    }
  };

  const savePost = async (newTask) => {
    try {
      // Get existing tasks and dateIndex
      const [tasksJson, dateIndexJson] = await Promise.all([
        AsyncStorage.getItem(TASKS_STORAGE_KEY),
        AsyncStorage.getItem(DATE_INDEX_STORAGE_KEY),
      ]);

      const tasks = tasksJson ? JSON.parse(tasksJson) : {};
      const dateIndex = dateIndexJson ? JSON.parse(dateIndexJson) : {};

      // Add new task to tasks object
      tasks[newTask.id] = newTask;

      // Add task ID to dateIndex
      const dateStr = new Date(newTask.timestamp).toISOString().split("T")[0];
      if (!dateIndex[dateStr]) {
        dateIndex[dateStr] = [];
      }
      dateIndex[dateStr].unshift(newTask.id); // Add to beginning of array

      // Save both structures back to AsyncStorage
      await Promise.all([
        AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks)),
        AsyncStorage.setItem(DATE_INDEX_STORAGE_KEY, JSON.stringify(dateIndex)),
      ]);
    } catch (error) {
      console.error("Error saving post:", error);
      throw new Error("Failed to save post");
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a title");
      return;
    }

    try {
      setIsSubmitting(true);

      const taskId = uuid.v4();
      const timestamp = new Date().getTime();

      const newTask = {
        id: taskId,
        title: title.trim(),
        bulletPoints: bulletPoints.filter((point) => point.trim()),
        image,
        timestamp,
      };

      await savePost(newTask);
      router.replace("/feed"); // This will cause a fresh render of the feed
    } catch (error) {
      Alert.alert("Error", "Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <ScrollView className="flex-1 bg-white pt-12">
        <View className="flex-row items-center justify-between px-4 pb-4 border-b border-gray-200">
          <TouchableOpacity onPress={handleBack} className="p-2 -ml-2">
            <X size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold">Create Post</Text>
          <View className="w-10" />
        </View>

        <View className="p-4">
          <TextInput
            className="text-lg border-b border-gray-200 py-2 mb-5"
            placeholder="Enter post title..."
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />

          <TouchableOpacity
            className="w-full h-48 mb-5 rounded-lg overflow-hidden"
            onPress={pickImage}
          >
            {image ? (
              <Image source={{ uri: image }} className="w-full h-full" />
            ) : (
              <View className="w-full h-full bg-gray-100 justify-center items-center rounded-lg border border-gray-200 border-dashed">
                <Camera size={24} color="#666" />
                <Text className="mt-2 text-gray-500">Add Photo</Text>
              </View>
            )}
          </TouchableOpacity>

          <View className="mb-5">
            <Text className="text-base font-bold mb-3">
              Bullet Points (Optional)
            </Text>
            {bulletPoints.map((point, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <TextInput
                  className="flex-1 border border-gray-200 rounded p-2 mr-2"
                  placeholder={`Bullet point ${index + 1}`}
                  value={point}
                  onChangeText={(text) => updateBulletPoint(text, index)}
                />
                <TouchableOpacity
                  className="p-2"
                  onPress={() => removeBulletPoint(index)}
                >
                  <Text className="text-xl text-red-500">×</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              className="p-3 bg-gray-100 rounded items-center mt-2"
              onPress={addBulletPoint}
            >
              <Text className="text-gray-600">+ Add Bullet Point</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className={`bg-blue-500 p-4 rounded-lg items-center ${
              isSubmitting ? "opacity-50" : ""
            }`}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text className="text-white text-base font-bold">
              {isSubmitting ? "Creating Post..." : "Create Post"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePost;
