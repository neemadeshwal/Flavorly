import { useGetFavouriteList } from "@/Query/recipe";

import React from "react";
import { FlatList, View } from "react-native";
import { Spinner } from "../ui/spinner";
import { Text } from "../ui/text";
import FavouriteCard from "./favouriteCard";

const Myfavourite = () => {
  const { data, isLoading, error } = useGetFavouriteList();

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !data?.success) {
    return (
      <View>
        <Text> Oops! an error occured.</Text>
      </View>
    );
  }

  if (!data.recipes?.length) {
    return (
      <View>
        <Text className="text-gray-500 text-[18px]">
          No favourite recipe. Try adding one.
        </Text>
      </View>
    );
  }
  return (
    <View className="mb-40">
      <View className="justify-between mb-4 items-center flex-row">
        <Text
          style={{ fontFamily: "PoppinsSemiBold" }}
          className=" text-[22px] capitalize "
        >
          My favorites
        </Text>
      </View>
      <View>
        <FlatList
          data={data.recipes}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 16 }}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <FavouriteCard item={item} />}
        />
      </View>
    </View>
  );
};

export default Myfavourite;
