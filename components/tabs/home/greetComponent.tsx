import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useAuthStore } from "@/stores/useUserStore";
import { timeOfTheDay } from "@/utils/getTime";
import { MoonIcon, SunIcon } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

const GreetComponent = () => {
  const time = timeOfTheDay();
  const userName = useAuthStore.getState().userName;

  return (
    <View className="">
      <View className="flex gap-2 items-center flex-row">
        <Icon as={time == "evening" ? MoonIcon : SunIcon} className="w-7 h-7" />
        <Text className="text-[19px]">Good {time}</Text>
      </View>
      <View>
        <Text
          style={{ fontFamily: "PoppinsBold" }}
          className=" text-[30px] capitalize"
        >
          {userName}
        </Text>
      </View>
    </View>
  );
};

export default GreetComponent;
