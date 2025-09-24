import Category from "@/components/tabs/home/Category";
import Featured from "@/components/tabs/home/Featured";
import GreetComponent from "@/components/tabs/home/GreetComponent";
import PopularRecipes from "@/components/tabs/home/PopularRecipes";
import React from "react";
import { ScrollView, View } from "react-native";
const Home = () => {
  return (
    <View className="px-6 py-20  pb-0  pt-20 flex flex-col gap-[24px]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="gap-10 flex-col flex"
      >
        <GreetComponent />
        <View className="flex flex-col gap-12">
          <Featured />
          <Category />
          <PopularRecipes />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
