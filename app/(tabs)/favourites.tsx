import Myfavourite from "@/components/tabs/Myfavourite";
import React from "react";
import { View } from "react-native";

const Favourites = () => {
  return (
    <View className="px-6 py-20  pb-0  pt-20 flex flex-col gap-[24px]">
      <Myfavourite />
    </View>
  );
};

export default Favourites;
