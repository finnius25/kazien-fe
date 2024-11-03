import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";

const TopCalView = () => {
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const dates = [5, 6, 7, 8, 9, 10, 11];

  const [selectedDate, setSelectedDate] = React.useState(dates[0]);

  return (
    <View className="w-full px-10 pt-2">
      <View className="flex flex-row justify-around w-full items-center mt-6">
        {dates.map((date, i) => {
          const isSelected = selectedDate === date;

          return (
            <TouchableWithoutFeedback
              key={i}
              onPress={() => {
                setSelectedDate(date);
              }}
              className={``}
            >
              <View
                className={`flex items-center px-3 py-2 rounded-xl ${
                  isSelected ? "border border-neutral-300" : ""
                }`}
              >
                <Text
                  className={`text-3xl ${
                    isSelected ? "text-black" : "text-stone-400/80"
                  } font-semibold`}
                >
                  {dates[i]}
                </Text>
                <Text
                  className={`font-semibold ${
                    isSelected ? "text-red-500" : "text-stone-600"
                  } text-sm`}
                >
                  {days[i]}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
};

export default TopCalView;
