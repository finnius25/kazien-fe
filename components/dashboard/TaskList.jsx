import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Image } from "expo-image";

const TaskList = () => {
  const tasks = [
    {
      name: "hit gym",
      category: "Physical",
      dateTime: "Friday 2:00 PM",
      imagePath: require("../../assets/images/gym-pic2.jpeg"), // Changed to direct require
      blurhash: "LGF5]+Yk^6#M@-5c,1J5@[or[Q6.", // Example blurhash
    },
    {
      name: "work on TinyKeywords",
      category: "Work",
      dateTime: "Friday 1:00 PM",
    },
    {
      name: "wash dishes",
      dateTime: "Friday 2:00 PM",
    },
    {
      name: "fold laundry",
      dateTime: "Friday 3:00 PM",
    },
  ];

  return (
    <View className="flex-1 pt-10 px-6">
      {tasks.map((task, i) => {
        return (
          <Link href={`/taskView`} asChild key={i}>
            <Pressable>
              <View className="mt-4 px-4">
                <View className="flex flex-col gap-2">
                  <View className="flex flex-row items-center">
                    {/* {task.imagePath && (
                      <View className="mr-3">
                        <Image
                          source={task.imagePath}
                          style={{
                            width: 25,
                            height: 25,
                            borderRadius: 5,
                            backgroundColor: "#0553",
                          }}
                          placeholder={task.blurhash ? task.blurhash : null}
                          contentFit="cover"
                          transition={1000}
                        />
                      </View>
                    )} */}
                    <Text
                      className="text-3xl font-semibold text-black flex-1 max-w-[65%]"
                      numberOfLines={1}
                    >
                      {task.name}
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row pt-4 overflow-hidden">
                  {[...Array(50)].map((_, i) => (
                    <View
                      key={i}
                      style={{
                        width: 4,
                        height: 2,
                        backgroundColor: "#e5e5e5",
                        marginRight: 4,
                      }}
                    />
                  ))}
                </View>
              </View>
            </Pressable>
          </Link>
        );
      })}
    </View>
  );
};

export default TaskList;
