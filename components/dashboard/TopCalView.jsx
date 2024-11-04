import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import formatMonth from "@/utils/date/formatMonth";
import getWeekDates from "@/utils/date/getWeekDates";
import isToday from "@/utils/date/isToday";
import { days } from "@/utils/date/days";

const TopCalView = ({ selectedDate, setSelectedDate }) => {
  const weekDates = getWeekDates();

  return (
    <View className="w-full px-4 pt-2">
      <View className="flex flex-row justify-around w-full items-center mt-6">
        {weekDates.map((date, i) => {
          const isSelected =
            selectedDate.getDate() === date.getDate() &&
            selectedDate.getMonth() === date.getMonth();
          const _isToday = isToday(date);

          return (
            <TouchableWithoutFeedback
              key={i}
              onPress={() => setSelectedDate(date)}
            >
              <View
                className={`flex items-center px-3 py-2 rounded-xl ${
                  isSelected ? "border border-neutral-300" : ""
                } ${_isToday ? "bg-black" : ""}`}
              >
                <Text
                  className={`text-3xl ${
                    isSelected || _isToday ? "text-black" : "text-stone-400/80"
                  } ${_isToday ? "text-white" : ""} font-semibold`}
                >
                  {date.getDate()}
                </Text>
                <Text
                  className={`font-semibold ${
                    isSelected ? "text-[#FF5104]" : "text-stone-600"
                  } ${_isToday ? "text-white" : ""} text-sm`}
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
