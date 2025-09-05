import { Icon } from "@/components/ui/icon";
import { SunIcon } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

const GreetComponent = () => {
  return (
    <View className="">
      <View className="flex gap-2 items-center flex-row">
        <Icon as={SunIcon} className="w-7 h-7" />
        <Text className="text-[19px]">Good Morning</Text>
      </View>
      <View>
        <Text className="font-bold text-[30px] capitalize">Alex Dunphy</Text>
      </View>
    </View>
  );
};

export default GreetComponent;
