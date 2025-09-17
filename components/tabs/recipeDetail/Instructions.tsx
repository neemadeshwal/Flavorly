import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { instruction } from "@/types";
import { Clock } from "lucide-react-native";
import React from "react";
import { ScrollView, View } from "react-native";

const Instructions = ({
  instructions,
  timeTaken,
}: {
  instructions: instruction[];
  timeTaken: string;
}) => {
  return (
    <View className="pt-8">
      <View className="flex flex-row justify-between items-center">
        <Text style={{ fontFamily: "PoppinsBold" }} className="text-[22px]">
          Instructions
        </Text>
        <View className="flex flex-row gap-2 justify-center items-center">
          <Icon className="text-gray-700 " as={Clock} />
          <Text className="text-gray-700 dark:text-gray-400 mt-1 text-[16px]">
            {timeTaken}
          </Text>
        </View>
      </View>

      <ScrollView style={{ gap: "10" }} className="flex flex-col gap-10 py-6">
        <View className="flex flex-col gap-10">
          {instructions.map((item, index) => (
            <View key={item.text} className="flex flex-row items-start gap-4">
              <View className="w-10 h-10 rounded-full bg-card dark:bg-button justify-center items-center">
                <Text
                  style={{ fontFamily: "PoppinsSemiBold" }}
                  className="text-white text-[18px] mt-1"
                >
                  {item.stepNumber}
                </Text>
              </View>
              <View className="flex-1 flex-col gap-1 justify-center ">
                <Text
                  style={{ fontFamily: "PoppinsSemiBold" }}
                  className="text-[18px] capitalize"
                >
                  {item.title}
                </Text>
                <Text className="text-gray-800 dark:text-gray-400 text-[17px]">
                  {item.text}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Instructions;
